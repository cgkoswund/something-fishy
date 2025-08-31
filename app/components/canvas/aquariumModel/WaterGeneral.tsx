import { useGLTF } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useGraph } from '@react-three/fiber';
import { useMemo, useEffect, useRef, useLayoutEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const configGeneral = {
  meshPhysicalMaterial: false,
  transmissionSampler: false,
  backside: false,
  samples: 4,
  resolution: 512,
  transmission: 1,
  roughness: 0.01,
  thickness: 3.5,
  ior: 3 + 0.000001,
  chromaticAberration: 0.01,
  anisotropy: 0.0,
  distortion: 0.1,
  distortionScale: 0.3,
  temporalDistortion: 0.9,

  attenuationDistance: 50,
  attenuationColor: '#ddffff',
  color: '#b9bfd1',
  environmentMapIntensity: 0.03,

  transmissionBleeding: 0.01,
  envMapIntensity: 0,
  reflectivity: 0.05,
};

const centerTankConfig = {
  ...configGeneral,
  ior: 1.33333633,
  transmission: 1,
  attenuationDistance: 5.5,
  thickness: 2,
  attenuationColor: '#eef8ff',
  color: '#99afb1',
  distortion: 0.2,
  distortionScale: 3,
  resolution: 1024,
};

const jellyTankConfig = {
  ...configGeneral,
  ior: 1.75,
  attenuationColor: '#eef8ff',
  color: '#99afb1',
  attenuationDistance: 1.5,
  distortion: 0.2,
  distortionScale: 3,
  thickness: 6,
};

const crocTankConfig = {
  ...configGeneral,
  ior: 1.7,
  attenuationColor: '#d0d8df',
  color: '#aabfc1',
  attenuationDistance: 3,
  distortion: 0.1,
  distortionScale: 3 * 2,
  temporalDistortion: 0.5,
  chromaticAberration: 0.001,
  thickness: 6,
};

const sharkTankConfig = {
  ...configGeneral,
  ior: 1.33333,
  attenuationColor: '#66aacc',
  // color: '#99afb1',
  color: '#fdfdfd',
  attenuationDistance: 20.5,
  transmissionSampler: true,
  resolution: 128,

  distortion: 0.00000000000000000001,
  distortionScale: 10000000000000,
  temporalDistortion: 0.0,
  thickness: 20,
  transmissionBleeding: 0.01,
  //fade color to black
};

const WaterGeneral = () => {
  const centerTankModel = useGLTF(
    '/models/waterModels/fish_environment_1_5_water_center_tank.glb'
  );

  const jellyTankModel = useGLTF(
    '/models/waterModels/fish_environment_1_5_water_jelly_tank.glb'
  );
  const crocTankModel = useGLTF(
    '/models/waterModels/fish_environment_1_5_water_croc_tank.glb'
  );
  const outerTankModel = useGLTF(
    '/models/waterModels/fish_environment_1_5_water_shark_tank.glb'
  );

  const centerTankMeshes = [] as THREE.Mesh[];
  centerTankModel.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      //set position to be the global position of the child
      child.position.setFromMatrixPosition(child.matrixWorld);
      child.scale.setFromMatrixScale(child.matrixWorld);
      child.rotation.setFromRotationMatrix(child.matrixWorld);
      centerTankMeshes.push(child);
    }
  });

  const jellyTankMeshes = [] as THREE.Mesh[];
  jellyTankModel.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      //set position to be the global position of the child
      child.position.setFromMatrixPosition(child.matrixWorld);
      child.scale.setFromMatrixScale(child.matrixWorld);
      child.rotation.setFromRotationMatrix(child.matrixWorld);
      jellyTankMeshes.push(child);
    }
  });

  const crocTankMeshes = [] as THREE.Mesh[];
  crocTankModel.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      //set position to be the global position of the child
      child.position.setFromMatrixPosition(child.matrixWorld);
      child.scale.setFromMatrixScale(child.matrixWorld);
      child.rotation.setFromRotationMatrix(child.matrixWorld);
      crocTankMeshes.push(child);
    }
  });

  const outerTankMeshes = [] as THREE.Mesh[];
  outerTankModel.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      //set position to be the global position of the child
      child.position.setFromMatrixPosition(child.matrixWorld);
      child.scale.setFromMatrixScale(child.matrixWorld);
      child.rotation.setFromRotationMatrix(child.matrixWorld);
      outerTankMeshes.push(child);
    }
  });

  const CenterWaterMaterial = (
    <MeshTransmissionMaterial {...centerTankConfig} />
  );

  const JellyWaterMaterial = <MeshTransmissionMaterial {...jellyTankConfig} />;

  const CrocWaterMaterial = <MeshTransmissionMaterial {...crocTankConfig} />;

  const OuterWaterMaterial = <MeshTransmissionMaterial {...sharkTankConfig} />;

  return (
    <group>
      {centerTankMeshes.map((mesh, index) => (
        <mesh
          key={index}
          position={mesh.position.toArray()}
          geometry={mesh.geometry}
        >
          {CenterWaterMaterial}
        </mesh>
      ))}

      {jellyTankMeshes.map((mesh, index) => (
        <mesh
          key={index}
          position={mesh.position.toArray()}
          geometry={mesh.geometry}
        >
          {JellyWaterMaterial}
        </mesh>
      ))}

      {crocTankMeshes.map((mesh, index) => (
        <mesh
          key={index}
          position={mesh.position.toArray()}
          geometry={mesh.geometry}
        >
          {CrocWaterMaterial}
        </mesh>
      ))}

      {outerTankMeshes.map((mesh, index) => (
        <mesh
          key={index}
          position={mesh.position.toArray()}
          geometry={mesh.geometry}
        >
          {OuterWaterMaterial}
        </mesh>
      ))}
    </group>
  );
};

export default WaterGeneral;
