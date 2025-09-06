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
  const { nodes: crocGlassNodes } = useGLTF(
    '/models/templates/fish_env_1_6_croc_glass.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };
  const { nodes: crocArchNodes } = useGLTF(
    '/models/templates/fish_env_1_6_croc_tunnel_arch.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };
  const { nodes: crocArchConcreteNodes } = useGLTF(
    '/models/templates/fish_env_1_6_croc_tunnel_concrete.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };
  const { nodes: parallelWallConcreteNodes } = useGLTF(
    '/models/templates/fish_env_1_6_parallel_wall_concrete.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };

  jellyDividerNodes.croc_jelly_divider.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      child.material = materialsMap.concrete;
    }
  });

  lowerLipNodes.croc_lip.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      child.material = materialsMap.stone;
    }
  });

  crocGlassNodes.tunnel_glass.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  crocArchNodes.croc_tunnel_arch.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      child.material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        metalness: 0.9,
        roughness: 0.1,
        color: 'rgb(60,75,100)',
      });
    }
  });

  crocArchConcreteNodes.croc_tunnel_concrete.traverse(
    (child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = materialsMap.concrete;
      }
    }
  );

  parallelWallConcreteNodes.parallel_wall_concrete.traverse(
    (child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = materialsMap.concrete;
      }
    }
  );

  return {
    JellyDivider: jellyDividerNodes.croc_jelly_divider,
    LowerLip: lowerLipNodes.croc_lip,
    CrocGlass: crocGlassNodes.tunnel_glass,
    CrocArch: crocArchNodes.croc_tunnel_arch,
    CrocArchConcrete: crocArchConcreteNodes.croc_tunnel_concrete,
    ParallelWallConcrete: parallelWallConcreteNodes.parallel_wall_concrete,
  };
};

export default CrocTankTemplate;
