import { useGLTF } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useGraph } from '@react-three/fiber';
import { useMemo } from 'react';

const config = {
  meshPhysicalMaterial: false,
  transmissionSampler: true,
  backside: false,
  samples: 7,
  resolution: 1048,
  transmission: 1,
  roughness: 0.01,
  thickness: 3.5,
  ior: 1.33333333333333333,
  chromaticAberration: 0.01,
  anisotropy: 0.0,
  distortion: 0.1,
  distortionScale: 0.3,
  temporalDistortion: 0.9,

  attenuationDistance: 50,
  attenuationColor: '#33bbdd',
  // color: '#ffffff',
  color: '#39afd1',
  // bg: '#ffffff',
  bg: '#55ffff',
  environmentMapIntensity: 0.03,

  transmissionBleeding: 0.01,
  envMapIntensity: 0,
  reflectivity: 0,
};

const WaterGeneral = () => {
  const waterModel = useGLTF('/models/fish_environment_1_4_water_only.glb');
  const { nodes } = useGraph(waterModel.scene);

  // Find all mesh nodes in the model
  const waterMeshes = useMemo(() => {
    return Object.values(nodes).filter(
      (node): node is THREE.Mesh => node instanceof THREE.Mesh
    );
  }, [nodes]);

  return (
    <group>
      {/* <RigidBody type="fixed" colliders={'trimesh'} friction={3}> */}
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
      {/* </RigidBody> */}
    </group>
  );
};

export default WaterGeneral;
