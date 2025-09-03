import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Floor = ({ materialsMap }: { materialsMap: any }) => {
  const { nodes: floorNodes } = useGLTF(
    '/models/templates/fish_env_1_6_main_floor.glb'
  );
  const { nodes: roofNodes } = useGLTF(
    '/models/templates/fish_env_1_6_main_roof.glb'
  );

  floorNodes.main_floor.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = materialsMap.floor;
    }
  });

  roofNodes.main_roof.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = materialsMap.roof;
    }
  });

  const floorMaterial = materialsMap.floor;
  const roofMaterial = materialsMap.roof;

  return (
    <>
      <primitive
        object={floorNodes.main_floor}
        position={floorNodes.main_floor.position.toArray()}
        material={floorMaterial}
      />
      <primitive
        object={roofNodes.main_roof}
        position={roofNodes.main_roof.position.toArray()}
        material={roofMaterial}
      />
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[100, 0.01, 100]} friction={0} />
      </RigidBody>
    </>
  );
};

export default Floor;
