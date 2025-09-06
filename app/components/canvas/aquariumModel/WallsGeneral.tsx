import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useGraph } from '@react-three/fiber';
import { useMemo } from 'react';
import { CylinderCollider } from '@react-three/rapier';

const WallsGeneral = () => {
  const wallsModel = useGLTF('/models/fish_env_1_6_remaining_items.glb');
  const wallColliders = useGLTF(
    '/models/fish_environment_1_4_colliders_only.glb'
  );
  const { nodes: _nodes } = useGraph(wallsModel.scene);
  //cast nodes to object containing keys of mesh
  const nodes = _nodes as unknown as Record<string, THREE.Mesh>;
  // Find all mesh nodes in the model
  const wallMeshes = useMemo(() => {
    return Object.values(nodes).filter(
      (node): node is THREE.Mesh => node instanceof THREE.Mesh
    );
  }, [nodes]);

  //traverse model and cast shadows
  wallMeshes.forEach((mesh) => {
    if (mesh.name.includes('boundary')) {
      const meshMaterial = mesh.material as THREE.MeshStandardMaterial;
      meshMaterial.color.set('#000000');
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

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
      <group>
        <primitive object={wallsModel.scene} />
      </group>
      {/*  */}

      {/* ********************************************************************
    
    gltfjsx goes here
    
    *********************************** */}
    </group>
  );
};

export default WallsGeneral;
