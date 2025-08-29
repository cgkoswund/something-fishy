import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
let waterSurfaceTexture: THREE.Texture | null = null;
const WaterSurface = () => {
  const waterSurface = useGLTF(
    '/models/fish_environment_1_5_water_surface_only2.glb'
  );

  //traverse the scene and scroll the texture at a given speed
  const scrollSpeed = 0.01 * 1000;
  waterSurface.scene.traverse((node) => {
    if (node instanceof THREE.Mesh) {
      waterSurfaceTexture = node.material.map;
    }
  });

  useFrame(() => {
    if (waterSurfaceTexture) {
      waterSurfaceTexture.offset.x += scrollSpeed;
    }
  });

  return (
    <group>
      <primitive object={waterSurface.scene} /*visible={false} */ />
    </group>
  );
};

export default WaterSurface;
