import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import usePlayerStore from '~/stores/usePlayerStore';

const CenterTankTemplate = (materialsMap: any) => {
  const { nodes: tankLipNodes } = useGLTF(
    '/models/templates/fish_env_1_6_center_lip.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };
  const { nodes: tankGlassNodes } = useGLTF(
    '/models/templates/fish_env_1_6_center_glass.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };

  tankLipNodes.center_lip.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      child.material = materialsMap.stone;
    }
  });
  return {
    CenterTankLip: tankLipNodes.center_lip,
    CenterTankGlass: tankGlassNodes.center_tank_glass,
  };
};

export default CenterTankTemplate;
