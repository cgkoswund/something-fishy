import {
  Merged,
  Instances,
  Instance,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';
import CrocTankTemplate from './CrocTankTemplate';
import { crocTankConfig } from '~/data/constants';

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
  nodes.CrocGlass.geometry.boundingSphere = customBoundingSphere;
  nodes.CrocArch.geometry.boundingSphere = customBoundingSphere;
  nodes.CrocArchConcrete.geometry.boundingSphere = customBoundingSphere;
  nodes.ParallelWallConcrete.geometry.boundingSphere = customBoundingSphere;

  return (
    <>
      {/*  <primitive object={nodes.ParallelWallConcrete} />  */}
      <Merged
        meshes={nodes}
        scale={[1, 1, 1]}
        boundingSphere={customBoundingSphere}
      >
        {({
          JellyDivider,
          LowerLip,
          CrocArch,
          CrocArchConcrete,
          ParallelWallConcrete,
        }) => (
          <>
            <group position={[0, 0, 0]}>
              <JellyDivider scale={[1, 1, 1]} position={[0, 0, 0]} />
              <JellyDivider scale={[-1, -1, 1]} position={[0, 0, 0]} />
              <JellyDivider scale={[1, -1, -1]} position={[0, 0, 0]} />
              <JellyDivider scale={[-1, 1, -1]} position={[0, 0, 0]} />
            </group>
            <group position={[0, nodes.LowerLip.position.y + 0.01, 0]}>
              <LowerLip scale={[1, 1.05, 1.002]} position={[0, 0, 0]} />
              <LowerLip scale={[-1, 1.05, -1.002]} position={[0, 0, 0]} />
            </group>
            <group position={[0, nodes.CrocArch.position.y, 0]}>
              <CrocArch scale={[0.995, 0.995, 0.996]} position={[0, 0, 0]} />
              <CrocArch
                scale={[0.99, 0.99, 1]}
                position={[0, 0, -20 * (1 / 3)]}
              />
              <CrocArch
                scale={[0.99, 0.99, 1.0]}
                position={[0, 0, -20 * (2 / 3)]}
              />
              <CrocArch
                scale={[0.99, 0.99, 1.0]}
                position={[0, 0, -20 * (3 / 3)]}
              />
            </group>
            <group
              position={[0, nodes.CrocArch.position.y, 0]}
              rotation={[0, Math.PI, 0]}
            >
              <CrocArch scale={[0.995, 0.995, 0.996]} position={[0, 0, 0]} />
              <CrocArch
                scale={[0.99, 0.99, 1]}
                position={[0, 0, -20 * (1 / 3)]}
              />
              <CrocArch
                scale={[0.99, 0.99, 1.0]}
                position={[0, 0, -20 * (2 / 3)]}
              />
              <CrocArch
                scale={[0.99, 0.99, 1.0]}
                position={[0, 0, -20 * (3 / 3)]}
              />
            </group>
            <group position={[0, nodes.CrocArchConcrete.position.y, 0]}>
              <CrocArchConcrete position={[0, 0, 0]} />
              <CrocArchConcrete
                position={[0, 0, 0]}
                rotation={[0, Math.PI, 0]}
              />
            </group>
            <group position={[0, nodes.ParallelWallConcrete.position.y, 0]}>
              <ParallelWallConcrete position={[0, 0, 0]} />
              <ParallelWallConcrete
                position={[0, 0, 0]}
                rotation={[0, Math.PI, 0]}
              />
            </group>
          </>
        )}
      </Merged>
      <Instances count={4}>
        <primitive object={nodes.CrocGlass.geometry} attach="geometry" />
        <MeshTransmissionMaterial {...crocTankConfig} />
        <Instance scale={[1, 1, 1]} position={[0, 0, 0]} />
        <Instance scale={[-1, 1, -1]} position={[0, 0, 0]} />
      </Instances>
    </>
  );
};

export default CrocTank;
