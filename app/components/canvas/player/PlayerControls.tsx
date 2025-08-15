import { useFrame } from '@react-three/fiber';
import { useKeyboardControls, OrbitControls } from '@react-three/drei';
import {
  RigidBody,
  CapsuleCollider,
  RapierRigidBody,
} from '@react-three/rapier';
import { useRef } from 'react';

import type { Group } from 'three';

import { PLAYER_HEIGHT, PLAYER_WIDTH } from '~/data/constants';

const PlayerControls = ({
  children,
  controlsRef,
}: {
  children: React.ReactNode;
  controlsRef: React.RefObject<Group | null>;
}) => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const playerPhysicsBodyRef = useRef<RapierRigidBody>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { forward, backward, left, right, jump, run } = getKeys();
    // const impulseStrength = 55.2*delta;
    const jumpStrength = 55.2 * delta * 60;
    const walkStrength = (5 / 1000) * delta * 60;
    const runStrength = (15 / 1000) * delta * 60;
    // const impulseStrength = 5.2;
    const torqueStrength = 0.005;
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };
    const dirVec = { x: 0, z: 0 };

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
    if (run) {
      impulse.x = dirVec.x * runStrength;
      impulse.z = dirVec.z * runStrength;
    } else {
      impulse.x = dirVec.x * walkStrength;
      impulse.z = dirVec.z * walkStrength;
    }
    // console.log('dirVec', dirVec);
    if (playerPhysicsBodyRef.current) {
      playerPhysicsBodyRef.current.applyImpulse(impulse, true);
    }
  });

  return (
    <>
      <OrbitControls />
      <RigidBody
        ref={playerPhysicsBodyRef}
        type="dynamic"
        friction={0.05}
        linearDamping={10}
        angularDamping={0.5}
        canSleep={false}
        enabledRotations={[false, false, false]}
        position={[0, PLAYER_HEIGHT / 2, 3]}
      >
        <CapsuleCollider
          args={[PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2 - PLAYER_WIDTH / 2]}
          friction={0}
        />
        {children}
      </RigidBody>
    </>
  );
};

export default PlayerControls;
