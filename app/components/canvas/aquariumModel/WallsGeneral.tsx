import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useGraph } from '@react-three/fiber';
import { useMemo } from 'react';
import { CylinderCollider } from '@react-three/rapier';

const WallsGeneral = () => {
  const wallsModel = useGLTF('/models/fish_environment_1_4.glb');
  const wallColliders = useGLTF(
    '/models/fish_environment_1_4_colliders_only.glb'
  );
  const { nodes } = useGraph(wallsModel.scene);

  // Find all mesh nodes in the model
  const wallMeshes = useMemo(() => {
    return Object.values(nodes).filter(
      (node): node is THREE.Mesh => node instanceof THREE.Mesh
    );
  }, [nodes]);

  console.log('wallColliders.scene', wallColliders.scene);

  return (
    <group>
      {/** Walls Physics */}
      <RigidBody type="fixed" colliders={false}>
        <CylinderCollider args={[2.5 / 2, 0.75]} friction={3} />
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders={'trimesh'}
        friction={3}
        includeInvisible={true}
      >
        <CylinderCollider args={[2.5 / 2, 0.75]} friction={3} />
        <primitive object={wallColliders.scene} visible={false} />
      </RigidBody>
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
    </group>
  );
};

export default WallsGeneral;
