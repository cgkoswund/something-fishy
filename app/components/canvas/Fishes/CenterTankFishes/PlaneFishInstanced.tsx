import { Instance } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const PlaneFish = () => {
  const ref = useRef<THREE.Group>(null);

  return (
    <>
      <Instance ref={ref} />
    </>
  );
};

export default PlaneFish;
