import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
let waterSurfaceTexture: THREE.Texture | null = null;

const WaterSurface = () => {
  const waterSurface = useGLTF(
    '/models/fish_environment_1_5_water_surface_only3.glb'
  );
  const waterSurfaceTex = useTexture(
    '/tex/water_surface_smlss_txtr128_dark.png'
  );
  waterSurfaceTex.wrapS = THREE.RepeatWrapping;
  waterSurfaceTex.wrapT = THREE.RepeatWrapping;
  waterSurfaceTexture = waterSurfaceTex;
  const waterSurfaceMaterial = new THREE.MeshBasicMaterial({
    map: waterSurfaceTex,
  });
  //traverse the scene and scroll the texture at a given speed
  const scrollSpeed = 0.003;
  waterSurface.scene.traverse((node) => {
    if (node instanceof THREE.Mesh) {
      node.material = waterSurfaceMaterial;
    }
  });
  let count = 0;
  useFrame(() => {
    if (waterSurfaceTexture) {
      count++;
      if (count % 5 === 0) {
        waterSurfaceTexture.offset.set(
          waterSurfaceTexture.offset.x + scrollSpeed * 3,
          waterSurfaceTexture.offset.y + scrollSpeed * 3
        );
        waterSurfaceTexture.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      <primitive object={waterSurface.scene} /*visible={false} */ />
    </group>
  );
};

export default WaterSurface;
