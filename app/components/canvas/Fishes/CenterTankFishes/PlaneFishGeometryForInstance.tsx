import { useMemo } from 'react';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

const PlaneFishGeometryForInstance = ({
  fishType,
  material,
}: {
  fishType:
    | 'goldfish-yellow'
    | 'goldfish-red'
    | 'molly'
    | 'swordfish-striped'
    | 'swordfish-orange'
    | 'swordfish-red'
    | 'swordfish-spotted'
    | 'swordfish-yellow'
    | 'zebra-danio';
  material: THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;
}) => {
  const typeToQadrant = {
    'goldfish-yellow': [0, 2],
    'goldfish-red': [1, 2],
    molly: [2, 2],
    'swordfish-striped': [0, 1],
    'swordfish-orange': [1, 1],
    'swordfish-red': [2, 1],
    'swordfish-spotted': [0, 0],
    'swordfish-yellow': [1, 0],
    'zebra-danio': [2, 0],
  };

  const tiltAngle = 10;
  const tiltAngleRad = tiltAngle * (Math.PI / 180);

  const quadrant = typeToQadrant[fishType];

  const rowCount = 3;
  const colCount = 3;
  const offset = [quadrant[0] / colCount, quadrant[1] / rowCount];

  const geometry = useMemo(() => {
    const geomA = new THREE.PlaneGeometry(1, 1);
    const uvs = geomA.attributes.uv;

    for (let i = 0; i < uvs.count; i++) {
      uvs.setX(i, uvs.getX(i) / colCount + offset[0]);
      uvs.setY(i, uvs.getY(i) / rowCount + offset[1]);
    }
    uvs.needsUpdate = true;
    const geomB = geomA.clone();
    geomA.rotateY(tiltAngleRad);
    geomB.rotateY(-tiltAngleRad);

    const mergedGeometry = BufferGeometryUtils.mergeGeometries([geomA, geomB]);

    return mergedGeometry;
  }, []);
  return (
    <>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </>
  );
};

export default PlaneFishGeometryForInstance;
