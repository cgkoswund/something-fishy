import NileCroc from './NileCroc';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const CrocTankFishes = () => {
  const crocGroupRef = useRef<THREE.Group>(null);

  useFrame(({ camera }, delta) => {
    if (crocGroupRef.current) {
      if (camera.position.z < 0) {
        /*Tank 1*/
        crocGroupRef.current.position.z = -40;
      } else {
        /*Tank 2*/
        crocGroupRef.current.position.z = 0;
      }
    }
  });

  return (
    <group ref={crocGroupRef}>
      <NileCroc
        height={0.7 * 2.5}
        xOffset={2.5}
        swimSpeed={1.0 * 1.2}
        wiggleAmount={0.1 * 20}
      />
      <NileCroc
        height={0.7 * 1.5}
        xOffset={2.5}
        swimSpeed={1.0 * 0.8}
        wiggleAmount={0.1 * 20}
      />
      <NileCroc
        height={0.7 * 2}
        xOffset={-2.5}
        swimSpeed={1.0}
        wiggleAmount={0.1 * 20}
      />

      <NileCroc
        height={0.7 * 3}
        xOffset={2.5}
        swimSpeed={1.0 * 1.2}
        wiggleAmount={0.1 * 20}
      />
      <NileCroc
        height={0.7 * 1.1}
        xOffset={-2.5}
        swimSpeed={1.0 * 0.8}
        wiggleAmount={0.1 * 20}
      />
      {/* <group position={[0, 0, -40]}>
      </group> */}
    </group>
  );
};

export default CrocTankFishes;
