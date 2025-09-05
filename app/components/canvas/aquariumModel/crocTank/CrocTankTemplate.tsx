import {
  Merged,
  Instance,
  Instances,
  useGLTF,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';
import { jellyTankConfig } from '~/data/constants';

const CrocTankTemplate = ({ materialsMap }: { materialsMap: any }) => {
  const { nodes: jellyDividerNodes } = useGLTF(
    '/models/templates/fish_env_1_6_croc_jelly_divider.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };
  const { nodes: lowerLipNodes } = useGLTF(
    '/models/templates/fish_env_1_6_croc_lip.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };

  jellyDividerNodes.croc_jelly_divider.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      child.material = materialsMap.concrete;
    }
  });

  console.log('lowerLipNodes', lowerLipNodes);

  lowerLipNodes.croc_lip.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      child.material = materialsMap.stone;
    }
  });

  return {
    JellyDivider: jellyDividerNodes.croc_jelly_divider,
    LowerLip: lowerLipNodes.croc_lip,
  };
};

export default CrocTankTemplate;
