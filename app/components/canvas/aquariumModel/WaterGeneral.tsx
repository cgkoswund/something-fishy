import { useGLTF } from '@react-three/drei';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useGraph } from '@react-three/fiber';
import { useMemo, useEffect, useRef, useLayoutEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import {
  centerTankConfig,
  jellyTankConfig,
  crocTankConfig,
  sharkTankConfig,
} from '~/data/constants';

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

      {/* {jellyTankMeshes.map((mesh, index) => (
        <mesh
          key={index}
          position={mesh.position.toArray()}
          geometry={mesh.geometry}
        >
          {JellyWaterMaterial}
        </mesh>
      ))} */}

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
