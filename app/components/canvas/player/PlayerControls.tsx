import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import {
  RigidBody,
  CapsuleCollider,
  CylinderCollider,
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
  PLAYER_DEPTH,
} from '~/data/constants';
import usePlayerStore from '~/stores/usePlayerStore';

const PlayerControls = () => {
  const setDirVec = usePlayerStore((state: any) => state.setDirVec);
  const setNewQuat = usePlayerStore((state: any) => state.setNewQuat);

  const [, getKeys] = useKeyboardControls();
  const playerPhysicsBodyRef = useRef<RapierRigidBody>(null);

  const playerRef = useRef<Group>(null);

  useFrame(({ clock, camera }, delta) => {
    const t = clock.getElapsedTime();

    const cameraQuat = camera.quaternion;
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
    dirVec3.applyQuaternion(cameraQuat || new THREE.Quaternion());
    let speed = run ? runSpeed : walkSpeed;
    impulse.x = dirVec3.x * speed;
    impulse.z = dirVec3.z * speed;
    if (playerPhysicsBodyRef.current) {
      playerPhysicsBodyRef.current.applyImpulse(impulse, true);
      setDirVec(dirVec);
    }
    //copy player position to camera position
    if (playerPhysicsBodyRef.current) {
      const translation = playerPhysicsBodyRef.current.translation();
      camera.position.set(
        translation.x,
        translation.y + PLAYER_HEIGHT / 2,
        translation.z
      );
    }
  });

  return (
    <>
      {/* Main player rigid body */}
      <RigidBody
        ref={playerPhysicsBodyRef}
        type="dynamic"
        friction={0.15}
        linearDamping={10}
        angularDamping={50}
        canSleep={false}
        enabledRotations={[false, true, false]}
        position={[0, PLAYER_HEIGHT + 2, 3]}
        rotation-y={0.05}
        colliders={false}
        gravityScale={1}
      >
        {/**player collider */}
        {/* <CapsuleCollider
          args={[PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2 - PLAYER_WIDTH / 2]}
          friction={0.1}
          mass={1}
          restitution={0.2}
        /> */}
        <CylinderCollider args={[PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2]} />
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_DEPTH]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </RigidBody>
    </>
  );
};

export default PlayerControls;
