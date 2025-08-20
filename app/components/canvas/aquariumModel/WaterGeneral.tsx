import { useGLTF } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useGraph } from '@react-three/fiber';
import { useMemo } from 'react';

const config = {
  meshPhysicalMaterial: false,
  transmissionSampler: false,
  backside: false,
  samples: 10,
  resolution: 2048,
  transmission: 1,
  roughness: 0.0,
  thickness: 3.5,
  ior: 1.33333333333333333,
  chromaticAberration: 0.12,
  anisotropy: 0.1,
  distortion: 0.3,
  distortionScale: 0.5,
  temporalDistortion: 0.5,
  clearcoat: 0.3,
  attenuationDistance: 15,
  attenuationColor: '#3399aa',
  color: '#398fa1',
  bg: '#839681',
};

const WaterGeneral = () => {
  const waterModel = useGLTF('/models/fish_environment_1_2_water_only.glb');
  const { nodes } = useGraph(waterModel.scene);

  // Find all mesh nodes in the model
  const waterMeshes = useMemo(() => {
    return Object.values(nodes).filter(
      (node): node is THREE.Mesh => node instanceof THREE.Mesh
    );
  }, [nodes]);

  return (
    <group>
      <RigidBody type="fixed" colliders={'trimesh'} friction={3}>
        {waterMeshes.map((mesh, index) => (
          <mesh
            key={index}
            geometry={mesh.geometry}
            position={mesh.position}
            rotation={mesh.rotation}
            scale={mesh.scale}
          >
            <MeshTransmissionMaterial {...config} />
          </mesh>
        ))}
      </RigidBody>
    </group>
  );
};

export default WaterGeneral;
