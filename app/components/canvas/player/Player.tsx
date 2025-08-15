import { useRef } from 'react';
import type { Group } from 'three';

import { PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_DEPTH } from '~/data/constants';
import PlayerControls from './PlayerControls';

const Player = () => {
  const playerRef = useRef<Group | null>(null);
  return (
    <>
      <PlayerControls controlsRef={playerRef}>
        <group ref={playerRef}>
          <mesh>
            <boxGeometry args={[PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_DEPTH]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </group>
      </PlayerControls>
    </>
  );
};

export default Player;
