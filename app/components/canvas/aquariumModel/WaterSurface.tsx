import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const WaterSurface = () => {
  const waterSurface = useGLTF(
    '/models/fish_environment_1_4_water_surface_only.glb'
  );

  //traverse the scene and set the material to aquamarine
  waterSurface.scene.traverse((node) => {
    if (node instanceof THREE.Mesh) {
      node.material = new THREE.MeshStandardMaterial({
        color: 'aquamarine',
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
    }
  });

  return (
    <group>
      <primitive object={waterSurface.scene} visible={false} />
    </group>
  );
};

export default WaterSurface;
