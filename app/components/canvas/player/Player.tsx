import { useRef } from 'react';
import type { Group } from 'three';

import { PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_DEPTH } from '~/data/constants';
import PlayerControls from './PlayerControls';

const Player = () => {
  const playerRef = useRef<Group | null>(null);
  return (
    <>
      <PlayerControls controlsRef={playerRef}>
        {/* <group ref={playerRef}>
  
          <mesh position={[0, PLAYER_HEIGHT / 2, 0]}>
            <boxGeometry args={[0.03, 0.03, 0.03]} />
            <meshStandardMaterial color="yellow" opacity={1} />
          </mesh>
         
        </group> */}
      </PlayerControls>
    </>
  );
};

export default Player;
