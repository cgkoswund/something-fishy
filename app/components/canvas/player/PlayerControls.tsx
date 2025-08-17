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

  const rotationTargetRef = useRef<number>(0);
  const cameraWorldPositionRef = useRef<Vector3>(new Vector3());
  const cameraLookAtRef = useRef<Vector3>(new Vector3());
  const cameraLookAtWorldPositionRef = useRef<Vector3>(new Vector3());

  // Separate refs for spring joint
  const cameraColliderRef = useRef<RapierRigidBody>(null);

  // Mouse drag refs (no re-renders)
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseXRef = useRef<number>(0);
  const containerRotationYRef = useRef<number>(Math.PI / 4);

  // Mouse event handlers
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseXRef.current = event.clientX;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - lastMouseXRef.current;
      const rotationSensitivity = 0.1; // Adjust this value to control sensitivity

      // containerRotationYRef.current -= deltaX * rotationSensitivity;

      // Apply rotation directly to the container
      if (playerPhysicsBodyRef.current) {
        const torqueStrength = deltaX * -0.001; // Adjust sensitivity
        playerPhysicsBodyRef.current.applyTorqueImpulse(
          { x: 0, y: torqueStrength, z: 0 },
          true
        );
      }

      lastMouseXRef.current = event.clientX;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Add event listeners to the document
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup
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
    //log quaternion
    const { forward, backward, left, right, jump, run } = getKeys();
    // const impulseStrength = 55.2*delta;
    const jumpStrength = 55.2 * delta * 60;
    const walkSpeed = (5 / 100) * delta * 60 * 1.5;
    const runSpeed = (25 / 100) * delta * 60 * 1.5;
    // const impulseStrength = 5.2;
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
    // dirVec.x = dirVec3.x;
    // dirVec.z = dirVec3.z;

    let speed = run ? runSpeed : walkSpeed;
    impulse.x = dirVec3.x * speed;
    impulse.z = dirVec3.z * speed;
    // console.log('dirVec', dirVec);
    if (playerPhysicsBodyRef.current) {
      playerPhysicsBodyRef.current.applyImpulse(impulse, true);
      setDirVec(dirVec);
    }
  });

  useFrame(({ camera }, delta) => {
    cameraPositionRef.current?.getWorldPosition(cameraWorldPositionRef.current);
    camera.position.lerp(cameraWorldPositionRef.current, 0.1);

    if (cameraTargetRef.current) {
      cameraTargetRef.current.getWorldPosition(
        cameraLookAtWorldPositionRef.current
      );
      cameraLookAtRef.current.lerp(cameraLookAtWorldPositionRef.current, 0.1);
      camera.lookAt(cameraLookAtRef.current);
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
        rotation-y={0}
        colliders={false}
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
    //not necessary since atan2 already detects, but let us be responsible
    rotationY = 0;
  } else {
    //sub 90 degrees because I'm already facing th "y-axis"
    rotationY = Math.atan2(-dirVec.z, dirVec.x) - Math.PI / 2;

    //force into 0 - 360 range
    rotationY += 2 * Math.PI;
    rotationY %= 2 * Math.PI;
    rotationY += 2 * Math.PI;
    rotationY %= 2 * Math.PI;
  }
  const eulerAngle = new THREE.Euler(0, rotationY, 0);
  const quat = new THREE.Quaternion().setFromEuler(eulerAngle); //{ w: 1, x: 0, y: 0, z: 0 };

  return quat;
}
/*****************************/
export default PlayerControls;
