// import jellyTank from ".";
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import usePlayerStore from '~/stores/usePlayerStore';

const JellyTankTemplate = ({ materialsMap }: { materialsMap: any }) => {
  /******  Tank Lip *******/
  const { nodes: tankLipNodes } = useGLTF(
    '/models/templates/fish_env_1_6_jelly_lip.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };

  tankLipNodes.short_lip002.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      child.material = materialsMap.stone;
    }
  });
  /*****************************/

  /**  Tank Glass  */
  const { nodes: tankGlassNodes } = useGLTF(
    '/models/templates/fish_env_1_6_jelly_glass.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };

  tankGlassNodes.jelly_tank_glass.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  /*************************************/

  return {
    JellyTankLip: tankLipNodes.short_lip002,
    JellyTankGlass: tankGlassNodes.jelly_tank_glass,
  };
};
//
export default JellyTankTemplate;
