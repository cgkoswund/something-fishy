import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useGraph } from '@react-three/fiber';
import { useMemo } from 'react';

const WallsGeneral = () => {
  const wallsModel = useGLTF('/models/fish_environment_1_2.glb');
  const { nodes } = useGraph(wallsModel.scene);

  // Find all mesh nodes in the model
  const wallMeshes = useMemo(() => {
    return Object.values(nodes).filter(
      (node): node is THREE.Mesh => node instanceof THREE.Mesh
    );
  }, [nodes]);

  return (
    <group>
      <RigidBody type="fixed" colliders={'trimesh'} friction={3}>
        {wallMeshes.map((mesh, index) => (
          <mesh
            key={index}
            geometry={mesh.geometry}
            position={mesh.position}
            rotation={mesh.rotation}
            scale={mesh.scale}
          >
            <meshStandardMaterial color="rgb(60,75,100)" />
          </mesh>
        ))}
      </RigidBody>
    </group>
  );
};

export default WallsGeneral;
