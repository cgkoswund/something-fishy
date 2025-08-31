import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import {
  RigidBody,
  CapsuleCollider,
  RapierRigidBody,
} from '@react-three/rapier';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

import * as THREE from 'three';
import { Group, Vector3 } from 'three';

import {
  ROTATION_SPEED,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  CAMERA_FOLLOW_DISTANCE,
  CAMERA_VERTICAL_OFFSET,
} from '~/data/constants';
import usePlayerStore from '~/stores/usePlayerStore';

const PlayerControls = ({
  children,
  controlsRef,
}: {
  children: React.ReactNode;
  controlsRef: React.RefObject<Group | null>;
}) => {
  const setDirVec = usePlayerStore((state: any) => state.setDirVec);
  const setNewQuat = usePlayerStore((state: any) => state.setNewQuat);

  const [, getKeys] = useKeyboardControls();
  const playerPhysicsBodyRef = useRef<RapierRigidBody>(null);

  const containerRef = useRef<Group>(null);
  const playerRef = useRef<Group>(null);
  const cameraTargetRef = useRef<Group>(null);
  const cameraPositionRef = useRef<Group>(null);
  const cameraArmRef = useRef<Group>(null);
  const cameraArmRef2 = useRef<Group>(null);

  // To this:
  const cameraArmLookAtRef = useRef<THREE.Group>(
    null!
  ) as React.MutableRefObject<THREE.Group>;

  const rotationTargetRef = useRef<number>(0);
  const cameraWorldPositionRef = useRef<Vector3>(new Vector3());
  const cameraLookAtRef = useRef<Vector3>(new Vector3());
  const cameraLookAtWorldPositionRef = useRef<Vector3>(new Vector3());

  // Separate refs for spring joint
  const cameraColliderRef = useRef<RapierRigidBody>(null);

  // Mouse drag refs (no re-renders)
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseXRef = useRef<number>(0);
  const lastMouseYRef = useRef<number>(0);

  const containerRotationYRef = useRef<number>(Math.PI / 4);
  const verticalRotationRef = useRef<number>(0);
  const verticalRotationLimitRef = useRef<{ min: number; max: number }>({
    min: -Math.PI / 4,
    max: Math.PI / 4,
  });

  useEffect(() => {
    cameraArmRef.current = new THREE.Group();
    cameraArmRef2.current = new THREE.Group();
    cameraArmLookAtRef.current = new THREE.Group();

    // Set rotation order to YXZ to handle vertical rotation properly
    cameraArmRef.current.rotation.order = 'YXZ';

    cameraArmRef.current.add(cameraArmRef2.current);
    cameraArmRef2.current.rotation.set(0, Math.PI, 0);
    cameraArmRef2.current.add(cameraArmLookAtRef.current);
    cameraArmLookAtRef.current.position.set(0, 0, 1);
  }, []);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseXRef.current = event.clientX;
      lastMouseYRef.current = event.clientY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - lastMouseXRef.current;
      const deltaY = event.clientY - lastMouseYRef.current;
      const rotationSensitivity = 0.005; // Adjust this value to control sensitivity

      if (playerPhysicsBodyRef.current) {
        const torqueStrength = deltaX * -0.001; // Adjust sensitivity
        playerPhysicsBodyRef.current.applyTorqueImpulse(
          { x: 0, y: torqueStrength, z: 0 },
          true
        );
      }

      if (cameraArmRef.current) {
        verticalRotationRef.current += deltaY * rotationSensitivity;
        verticalRotationRef.current = Math.max(
          verticalRotationLimitRef.current.min,
          Math.min(
            verticalRotationLimitRef.current.max,
            verticalRotationRef.current
          )
        );

        cameraArmRef.current.rotation.x = verticalRotationRef.current;
      }

      lastMouseXRef.current = event.clientX;
      lastMouseYRef.current = event.clientY;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const rapierQuaternion = playerPhysicsBodyRef.current?.rotation();
    const quaternion = rapierQuaternion
      ? new THREE.Quaternion(
          rapierQuaternion.x,
          rapierQuaternion.y,
          rapierQuaternion.z,
          rapierQuaternion.w
        )
      : new THREE.Quaternion();
    const { forward, backward, left, right, jump, run } = getKeys();
    const jumpStrength = 55.2 * delta * 60;
    const walkSpeed = (5 / 100) * delta * 60 * 1.5;
    const runSpeed = (25 / 100) * delta * 60 * 1.5;
    const torqueStrength = 0.005;
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };
    const dirVec = { x: 0, z: 0 };
    const dirVec3 = new Vector3();

    if (forward) {
      dirVec.z = -1;
    }
    if (backward) {
      dirVec.z = 1;
    }
    if (left) {
      dirVec.x = -1;
    }
    if (right) {
      dirVec.x = 1;
    }
    if (jump) {
      impulse.y = jumpStrength;
    }
    if (dirVec.x !== 0) {
    }

    dirVec3.set(dirVec.x, 0, dirVec.z);
    dirVec3.applyQuaternion(quaternion || new THREE.Quaternion());
    let speed = run ? runSpeed : walkSpeed;
    impulse.x = dirVec3.x * speed;
    impulse.z = dirVec3.z * speed;
    if (playerPhysicsBodyRef.current) {
      playerPhysicsBodyRef.current.applyImpulse(impulse, true);
      setDirVec(dirVec);
    }
  });

  useFrame(({ camera }, delta) => {
    cameraPositionRef.current?.getWorldPosition(cameraWorldPositionRef.current);

    cameraArmRef.current?.position.lerp(cameraWorldPositionRef.current, 0.1);

    camera.position.copy(
      cameraArmRef.current?.position || cameraWorldPositionRef.current
    );

    if (cameraTargetRef.current) {
      cameraTargetRef.current.getWorldPosition(
        cameraLookAtWorldPositionRef.current
      );
      cameraLookAtRef.current.lerp(cameraLookAtWorldPositionRef.current, 0.1);

      cameraArmRef.current?.lookAt(cameraLookAtRef.current);

      const lookAtWorldPos = new THREE.Vector3();
      cameraArmLookAtRef.current.getWorldPosition(lookAtWorldPos);

      // camera.lookAt(lookAtWorldPos);
    }
  });

  useEffect(() => {
    const unsubscribeFromDirVec = usePlayerStore.subscribe(
      (state: any) => state.dirVec,
      (dirVec: { x: number; z: number }) => {
        //do nothing if user just left keyboard
        if (dirVec.x !== 0 || dirVec.z !== 0) {
          const nextQuat = getDirectionQuaternion(dirVec);
          const playerStoreState = usePlayerStore.getState() as any;
          const currentQuat = playerStoreState.newQuat;
          // console.log("new dir vec: ", newQuat);
          const tempQuat = new THREE.Quaternion();
          //animate rotating to new position
          const factor = { value: 0 };
          gsap.to(factor, {
            value: 1,
            duration: 0.3,
            onUpdate: () => {
              tempQuat.slerpQuaternions(currentQuat, nextQuat, factor.value);
              if (playerPhysicsBodyRef.current) {
                // playerPhysicsBodyRef.current?.setRotation(tempQuat, true);
                playerRef.current?.rotation.setFromQuaternion(tempQuat);
                // usePlayerStore.setState({ fishQuat: tempQuat });
              }
            },
            onComplete: () => {
              // storeQuats(newQuat);
              setNewQuat(nextQuat);
            },
          });
        } else {
          // console.log("user only lifted fingers off keys");
        }
      }
    );

    return () => {
      unsubscribeFromDirVec();
    };
  }, []);

  return (
    <>
      {/* Main player rigid body */}
      <RigidBody
        ref={playerPhysicsBodyRef}
        type="dynamic"
        friction={0.05}
        linearDamping={10}
        angularDamping={50}
        canSleep={false}
        enabledRotations={[false, true, false]}
        position={[0, PLAYER_HEIGHT / 2, 3]}
        rotation-y={0.05}
        colliders={false}
        gravityScale={0}
      >
        {/**player collider */}
        <CapsuleCollider
          args={[PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2 - PLAYER_WIDTH / 2]}
          friction={0}
          mass={1}
        />
        {/**camera collider */}
        <CapsuleCollider
          args={[PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2 - PLAYER_WIDTH / 2]}
          position={[0, 0, CAMERA_FOLLOW_DISTANCE - PLAYER_WIDTH / 2]}
          friction={0}
          mass={0.00001}
        />

        <group ref={containerRef}>
          <group ref={cameraTargetRef} position-z={-CAMERA_FOLLOW_DISTANCE} />
          <group
            ref={cameraPositionRef}
            position-y={PLAYER_HEIGHT + CAMERA_VERTICAL_OFFSET}
            position-z={CAMERA_FOLLOW_DISTANCE}
          />
          <group ref={playerRef}>{children}</group>
        </group>
      </RigidBody>
    </>
  );
};

/********  HELPERS  **********/
function getDirectionQuaternion(dirVec: { x: number; z: number }) {
  let rotationY = 0;
  if (dirVec.x === 0 && dirVec.z === 0) {
    rotationY = 0;
  } else {
    rotationY = Math.atan2(-dirVec.z, dirVec.x) - Math.PI / 2;

    rotationY += 2 * Math.PI;
    rotationY %= 2 * Math.PI;
    rotationY += 2 * Math.PI;
    rotationY %= 2 * Math.PI;
  }
  const eulerAngle = new THREE.Euler(0, rotationY, 0);
  const quat = new THREE.Quaternion().setFromEuler(eulerAngle);

  return quat;
}
/*****************************/
export default PlayerControls;
