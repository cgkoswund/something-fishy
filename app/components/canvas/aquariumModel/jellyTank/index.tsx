import {
  Merged,
  Instance,
  Instances,
  useGLTF,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import JellyTankTemplate from './JellyTankTemplate';
import * as THREE from 'three';
import { useMemo } from 'react';
import { jellyTankConfig } from '~/data/constants';

const JellyTank = ({ materialsMap }: { materialsMap: any }) => {
  const { ...nodes } = JellyTankTemplate({ materialsMap });

  const customBoundingSphere = useMemo(() => {
    // Calculate center and radius that encompasses all your tank positions
    const center = new THREE.Vector3(0, 0, 0); // Adjust based on your layout
    const radius = 20; // Adjust based on how spread out your tanks are
    return new THREE.Sphere(center, radius);
  }, []);

  nodes.JellyTankGlass.geometry.boundingSphere = customBoundingSphere;
  nodes.JellyTankLip.geometry.boundingSphere = customBoundingSphere;

  return (
    <>
      <Merged
        meshes={nodes}
        scale={[1, 1, 1]}
        boundingSphere={customBoundingSphere}
      >
        {({ JellyTankLip }) => (
          <>
            <group position={nodes.JellyTankLip.position.toArray()}>
              <JellyTankLip scale={[1, 1, 1]} position={[0, 0, 0]} />
              <JellyTankLip scale={[-1, -1, 1]} position={[0, 0, 0]} />
              <JellyTankLip scale={[1, -1, -1]} position={[0, 0, 0]} />
              <JellyTankLip scale={[-1, 1, -1]} position={[0, 0, 0]} />
            </group>
          </>
        )}
      </Merged>
      {/* glass uses raw instances for convenience of jsx version */}
      <Instances count={4}>
        <primitive object={nodes.JellyTankGlass.geometry} attach="geometry" />
        <MeshTransmissionMaterial {...jellyTankConfig} />
        <Instance scale={[1, 1, 1]} position={[0, 0, 0]} />
        <Instance
          scale={[-1, -1, 1]} //y flip to show back side
          position={[0, 2 * nodes.JellyTankLip.position.y, 0]}
        />
        <Instance
          scale={[1, -1, -1]} //y flip to show back side
          position={[0, 2 * nodes.JellyTankLip.position.y, 0]}
        />
        <Instance scale={[-1, 1, -1]} position={[0, 0, 0]} />
      </Instances>
    </>
  );
};

export default JellyTank;
