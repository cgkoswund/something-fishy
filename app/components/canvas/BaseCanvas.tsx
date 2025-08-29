import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import { KeyboardControls } from '@react-three/drei';

import Aquarium from './aquariumModel';
import CameraStuff from './cameraStuff';
import Lights from './Lights';
import Player from './player/Player';
import PostEffects from './PostEffects';

const BaseCanvas = () => {
  return (
    <>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
          { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
          { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
          { name: 'right', keys: ['ArrowRight', 'KeyD'] },
          { name: 'lookLeft', keys: ['KeyQ'] },
          { name: 'lookRight', keys: ['KeyE'] },
          { name: 'noseDown', keys: ['KeyF'] },
          { name: 'noseUp', keys: ['KeyR'] },
          { name: 'jump', keys: ['Space'] },
          { name: 'run', keys: ['Shift'] },
        ]}
      >
        <Canvas
          shadows
          style={{ width: '100vw', height: '100vh' }}
          camera={{ fov: 30 }}
        >
          <Perf position={'top-left'} />
          <Lights />
          <CameraStuff />
          <Physics>
            <Suspense fallback={null}>
              <Player />
              <Aquarium />
            </Suspense>
          </Physics>
          {/* <PostEffects /> */}
        </Canvas>
      </KeyboardControls>
    </>
  );
};

export default BaseCanvas;
