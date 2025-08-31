import {
  CapsuleCollider,
  CuboidCollider,
  CylinderCollider,
  RigidBody,
  RapierRigidBody,
} from '@react-three/rapier';
import { PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_DEPTH } from '~/data/constants';
import { useRef } from 'react';

const PlayerRemake = () => {
  const playerPhysicsBodyRef = useRef<RapierRigidBody>(null);
  return (
    <>
      <RigidBody
        ref={playerPhysicsBodyRef}
        type="dynamic"
        friction={0.05}
        linearDamping={10}
        angularDamping={50}
        canSleep={false}
        enabledRotations={[false, true, false]}
        position={[0, PLAYER_HEIGHT + 2, 3]}
        rotation-y={0.05}
        colliders={false}
        gravityScale={1}
      >
        {/* <CapsuleCollider
          args={[PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2 - PLAYER_WIDTH / 2]}
          friction={0.1}
          mass={1}
          restitution={0.2}
        /> */}
        <CylinderCollider args={[PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2]} />
        {/* <CuboidCollider args={[PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_DEPTH]} /> */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_DEPTH]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </RigidBody>
    </>
  );
};

export default PlayerRemake;
