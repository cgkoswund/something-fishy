import { Merged } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';
import CrocTankTemplate from './CrocTankTemplate';

const CrocTank = ({ materialsMap }: { materialsMap: any }) => {
  const { ...nodes } = CrocTankTemplate({ materialsMap });

  const customBoundingSphere = useMemo(() => {
    // Calculate center and radius that encompasses all your tank positions
    const center = new THREE.Vector3(0, 0, 0); // Adjust based on your layout
    const radius = 36; // Adjust based on how spread out your tanks are
    return new THREE.Sphere(center, radius);
  }, []);

  nodes.JellyDivider.geometry.boundingSphere = customBoundingSphere;
  nodes.LowerLip.geometry.boundingSphere = customBoundingSphere;

  return (
    <>
      {/*   <primitive object={nodes.JellyDivider} /> */}
      <Merged
        meshes={nodes}
        scale={[1, 1, 1]}
        boundingSphere={customBoundingSphere}
      >
        {({ JellyDivider, LowerLip }) => (
          <>
            <group position={[0, 0, 0]}>
              <JellyDivider scale={[1, -1, 1]} position={[0, 0, 0]} />
              <JellyDivider scale={[-1, 1, 1]} position={[0, 0, 0]} />
              <JellyDivider scale={[1, -1, -1]} position={[0, 0, 0]} />
              <JellyDivider scale={[-1, 1, -1]} position={[0, 0, 0]} />
            </group>
            <group position={[0, nodes.LowerLip.position.y, 0]}>
              <LowerLip scale={[1, 1, 1]} position={[0, 0, 0]} />
              <LowerLip scale={[-1, 1, -1]} position={[0, 0, 0]} />
            </group>
          </>
        )}
      </Merged>
    </>
  );
};

export default CrocTank;
