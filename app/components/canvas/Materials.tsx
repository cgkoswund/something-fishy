import { useTexture } from '@react-three/drei';
import usePlayerStore from '~/stores/usePlayerStore';
import { useEffect } from 'react';
import * as THREE from 'three';

const Materials = () => {
  // concrete
  const concreteDiffuse = useTexture(
    '/tex/BareConcrete02/BareConcrete02_Albedo8_512.png'
  );
  const concreteNormal = useTexture(
    '/tex/BareConcrete02/BareConcrete02_Normal8_512.png'
  );
  const concreteRoughness = useTexture(
    '/tex/BareConcrete02/BareConcrete02_Rough8_512.png'
  );

  concreteDiffuse.colorSpace = THREE.SRGBColorSpace;
  concreteNormal.colorSpace = THREE.LinearSRGBColorSpace;
  concreteRoughness.colorSpace = THREE.LinearSRGBColorSpace;

  concreteDiffuse.flipY = false;
  concreteNormal.flipY = false;
  concreteRoughness.flipY = false;

  concreteDiffuse.wrapS = THREE.RepeatWrapping;
  concreteDiffuse.wrapT = THREE.RepeatWrapping;
  concreteNormal.wrapS = THREE.RepeatWrapping;
  concreteNormal.wrapT = THREE.RepeatWrapping;
  concreteRoughness.wrapS = THREE.RepeatWrapping;
  concreteRoughness.wrapT = THREE.RepeatWrapping;

  concreteDiffuse.repeat.set(8, 8);
  concreteNormal.repeat.set(8, 8);
  concreteRoughness.repeat.set(8, 8);

  const concreteMaterial = new THREE.MeshStandardMaterial({
    // side: THREE.DoubleSide,
    normalMap: concreteNormal,
    normalScale: new THREE.Vector2(1.5, 1.5),
    roughnessMap: concreteRoughness,
    roughness: 0.9,
    map: concreteDiffuse,
    name: 'stone',
  });

  //stone
  const stoneDiffuse = useTexture(
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_Albedo8_1K.png'
  );
  const stoneNormal = useTexture(
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_Normal8_1K.png'
  );
  const stoneRoughness = useTexture(
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_Rough8_1K.png'
  );
  const stoneAO = useTexture(
    '/tex/CobblestoneWall03/CobblestoneWall03Bottom_AO8_1K.png'
  );

  stoneDiffuse.colorSpace = THREE.SRGBColorSpace;
  stoneNormal.colorSpace = THREE.LinearSRGBColorSpace;
  stoneRoughness.colorSpace = THREE.LinearSRGBColorSpace;
  stoneAO.colorSpace = THREE.LinearSRGBColorSpace;

  stoneDiffuse.flipY = false;
  stoneNormal.flipY = false;
  stoneRoughness.flipY = false;
  stoneAO.flipY = false;

  stoneDiffuse.wrapS = THREE.RepeatWrapping;
  stoneDiffuse.wrapT = THREE.RepeatWrapping;
  stoneNormal.wrapS = THREE.RepeatWrapping;
  stoneNormal.wrapT = THREE.RepeatWrapping;
  stoneRoughness.wrapS = THREE.RepeatWrapping;
  stoneRoughness.wrapT = THREE.RepeatWrapping;
  stoneAO.wrapS = THREE.RepeatWrapping;
  stoneAO.wrapT = THREE.RepeatWrapping;

  const stoneMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    aoMap: stoneAO,
    aoMapIntensity: 1.5,
    normalMap: stoneNormal,
    normalScale: new THREE.Vector2(0.7, 0.7),
    roughnessMap: stoneRoughness,
    roughness: 0.9,
    map: stoneDiffuse,
    name: 'stone',
  });
  //gravel
  // const gravelDiffuse = useTexture('/tex/Gravel01/Gravel01_Diffuse8_1K.png');
  // const gravelNormal = useTexture('/tex/Gravel01/Gravel01_Normal8_512.png');
  // const gravelRoughness = useTexture('/tex/Gravel01/Gravel01_Rough8_512.png');
  // const gravelAO = useTexture('/tex/Gravel01/Gravel01_AO8_512.png');

  //rubble
  // const rubbleDiffuse = useTexture('/tex/Rubble01/Rubble01_Albedo8_512.png');
  // const rubbleNormal = useTexture('/tex/Rubble01/Rubble01_Normal8_512.png');
  // const rubbleRoughness = useTexture('/tex/Rubble01/Rubble01_Rough8_512.png');
  // const rubbleAO = useTexture('/tex/Rubble01/Rubble01_AO8_512.png');

  //ceiling
  const sidewalkDiffuse = useTexture('/tex/sidewalk/Sidewalk02_Albedo8_1K.png');
  const sidewalkNormal = useTexture('/tex/sidewalk/Sidewalk02_Normal8_1K.png');
  const sidewalkRoughness = useTexture(
    '/tex/sidewalk/Sidewalk02_Rough8_1K.png'
  );
  const sidewalkAO = useTexture('/tex/sidewalk/Sidewalk02_AO8_1K.png');

  sidewalkDiffuse.colorSpace = THREE.SRGBColorSpace;
  sidewalkNormal.colorSpace = THREE.LinearSRGBColorSpace;
  sidewalkRoughness.colorSpace = THREE.LinearSRGBColorSpace;
  sidewalkAO.colorSpace = THREE.LinearSRGBColorSpace;

  sidewalkDiffuse.flipY = false;
  sidewalkNormal.flipY = false;
  sidewalkRoughness.flipY = false;
  sidewalkAO.flipY = false;

  sidewalkDiffuse.wrapS = THREE.RepeatWrapping;
  sidewalkDiffuse.wrapT = THREE.RepeatWrapping;
  sidewalkNormal.wrapS = THREE.RepeatWrapping;
  sidewalkNormal.wrapT = THREE.RepeatWrapping;
  sidewalkRoughness.wrapS = THREE.RepeatWrapping;
  sidewalkRoughness.wrapT = THREE.RepeatWrapping;
  sidewalkAO.wrapS = THREE.RepeatWrapping;
  sidewalkAO.wrapT = THREE.RepeatWrapping;

  const sidewalkMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    aoMap: sidewalkAO,
    aoMapIntensity: 1.5,
    normalMap: sidewalkNormal,
    normalScale: new THREE.Vector2(1, 1),
    roughnessMap: sidewalkRoughness,
    roughness: 0.35,
    map: sidewalkDiffuse,
    name: 'sidewalk',
  });

  //wood
  const woodDiffuse = useTexture(
    '/tex/WoodPlanks02/WoodPlanks02_Albedo8_2K.png'
  );
  const woodNormal = useTexture(
    '/tex/WoodPlanks02/WoodPlanks02_Normal8_1K.png'
  );
  const woodRoughness = useTexture(
    '/tex/WoodPlanks02/WoodPlanks02_Rough8_1K.png'
  );
  const woodAO = useTexture('/tex/WoodPlanks02/WoodPlanks02_AO8_1K.png');

  const woodMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    aoMap: woodAO,
    aoMapIntensity: 2,
    normalMap: woodNormal,
    normalScale: new THREE.Vector2(1.5, 1.5),
    roughnessMap: woodRoughness,
    roughness: 1,
    map: woodDiffuse,
    name: 'wood',
  });

  woodDiffuse.colorSpace = THREE.SRGBColorSpace;
  woodNormal.colorSpace = THREE.LinearSRGBColorSpace;
  woodRoughness.colorSpace = THREE.LinearSRGBColorSpace;
  woodAO.colorSpace = THREE.LinearSRGBColorSpace;

  woodDiffuse.flipY = false;
  woodNormal.flipY = false;
  woodRoughness.flipY = false;
  woodAO.flipY = false;

  woodDiffuse.wrapS = THREE.RepeatWrapping;
  woodDiffuse.wrapT = THREE.RepeatWrapping;
  woodNormal.wrapS = THREE.RepeatWrapping;
  woodNormal.wrapT = THREE.RepeatWrapping;
  woodRoughness.wrapS = THREE.RepeatWrapping;
  woodRoughness.wrapT = THREE.RepeatWrapping;
  woodAO.wrapS = THREE.RepeatWrapping;
  woodAO.wrapT = THREE.RepeatWrapping;

  const materialsMap = {
    // concrete: <meshStandardMaterial color="rgb(60,75,100)" />,
    stone: stoneMaterial,
    // gravel: <meshStandardMaterial color="rgb(60,75,100)" />,
    // rubble: <meshStandardMaterial color="rgb(60,75,100)" />,
    // ceiling: <meshStandardMaterial color="rgb(60,75,100)" />,
    floor: woodMaterial,
    roof: sidewalkMaterial,
    concrete: concreteMaterial,
  };

  return materialsMap;
};

export default Materials;
