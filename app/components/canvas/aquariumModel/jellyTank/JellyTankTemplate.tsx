// import jellyTank from ".";
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const JellyTankTemplate = () => {
  /******  Tank Lip *******/
  const { nodes: tankLipNodes } = useGLTF(
    '/models/templates/fish_env_1_6_jelly_lip.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };

  const [AOMap, NormalMap, RoughnessMap, AlbedoMap] = useTexture([
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_AO8_1K.png',
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_Normal8_1K.png',
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_Rough8_1K.png',
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_Albedo8_1K.png',
  ]);

  AlbedoMap.colorSpace = THREE.SRGBColorSpace;
  NormalMap.colorSpace = THREE.LinearSRGBColorSpace;
  RoughnessMap.colorSpace = THREE.LinearSRGBColorSpace;
  AOMap.colorSpace = THREE.LinearSRGBColorSpace;

  AlbedoMap.flipY = false;
  NormalMap.flipY = false;
  RoughnessMap.flipY = false;
  AOMap.flipY = false;

  AlbedoMap.wrapS = THREE.RepeatWrapping;
  AlbedoMap.wrapT = THREE.RepeatWrapping;
  NormalMap.wrapS = THREE.RepeatWrapping;
  NormalMap.wrapT = THREE.RepeatWrapping;
  RoughnessMap.wrapS = THREE.RepeatWrapping;
  RoughnessMap.wrapT = THREE.RepeatWrapping;
  AOMap.wrapS = THREE.RepeatWrapping;
  AOMap.wrapT = THREE.RepeatWrapping;

  tankLipNodes.short_lip002.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      child.material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        aoMap: AOMap,
        aoMapIntensity: 1.5,
        normalMap: NormalMap,
        normalScale: new THREE.Vector2(2, 2),
        roughnessMap: RoughnessMap,
        roughness: 2,
        map: AlbedoMap,
      });
    }
  });
  /*****************************/

  /**  Tank Glass  */
  const { nodes: tankGlassNodes } = useGLTF(
    '/models/templates/fish_env_1_6_jelly_glass.glb'
  ) as unknown as { nodes: Record<string, THREE.Mesh> };

  const jellyGlassMaterial = (
    <meshTransmissionMaterial color="red" side={THREE.DoubleSide} />
  );
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
