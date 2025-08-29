import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useGraph } from '@react-three/fiber';
import { useMemo } from 'react';
import { CylinderCollider } from '@react-three/rapier';
import React, { useRef } from 'react';

const WallsGeneral = () => {
  const wallsModel = useGLTF('/models/fish_environment_1_5_2.glb');
  const wallColliders = useGLTF(
    '/models/fish_environment_1_4_colliders_only.glb'
  );
  const { nodes: _nodes } = useGraph(wallsModel.scene);
  //cast nodes to object containing keys of mesh
  const nodes = _nodes as unknown as Record<string, THREE.Mesh>;
  // Find all mesh nodes in the model
  const wallMeshes = useMemo(() => {
    return Object.values(nodes).filter(
      (node): node is THREE.Mesh => node instanceof THREE.Mesh
    );
  }, [nodes]);

  //traverse model and cast shadows
  wallMeshes.forEach((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  return (
    <group>
      {/** Walls Physics */}
      <RigidBody type="fixed" colliders={false}>
        <CylinderCollider args={[2.5 / 2, 0.75]} friction={3} />
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders={'trimesh'}
        friction={3}
        includeInvisible={true}
      >
        <CylinderCollider args={[2.5 / 2, 0.75]} friction={3} />
        <primitive object={wallColliders.scene} visible={false} />
      </RigidBody>
      <group>
        <primitive object={wallsModel.scene} />
      </group>
      {/* {wallMeshes.map((mesh, index) => (
        <mesh
          key={index}
          geometry={mesh.geometry}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
        >
          <meshStandardMaterial color="rgb(60,75,100)" />
        </mesh>
      ))} */}
      /************************************************************************
      */
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.boundary003.geometry}
          material={nodes.boundary003.material}
          position={[0, 0.995, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1005.geometry}
          material={nodes.mesh1005.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tilapia_tank_wall009.geometry}
          material={nodes.tilapia_tank_wall009.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.short_lip001.geometry}
          material={nodes.short_lip001.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.short_lip_outer001.geometry}
          material={nodes.short_lip_outer001.material}
          rotation={[Math.PI / 2, 0, 0]}
          scale={-1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.short_lip_tube001.geometry}
          material={nodes.short_lip_tube001.material}
          position={[0, 0, 0.029]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tilapia_tankarch001.geometry}
          material={nodes.tilapia_tankarch001.material}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={-1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tunnel_arches001.geometry}
          material={nodes.tunnel_arches001.material}
          position={[0, 0, 0.029]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[-1, -1.002, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1006.geometry}
          material={nodes.mesh1006.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.the_big_fish_tank011.geometry}
          material={nodes.the_big_fish_tank011.material}
          rotation={[Math.PI / 2, 0, 0]}
          scale={-1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh1007.geometry}
          material={nodes.mesh1007.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.storage008.geometry}
          material={nodes.storage008.material}
          rotation={[Math.PI / 2, 0, 0]}
          scale={-1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.parallel_wall005.geometry}
          material={nodes.parallel_wall005.material}
          rotation={[Math.PI / 2, 0, 0]}
          scale={-1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.big_tank_divider005.geometry}
          material={nodes.big_tank_divider005.material}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.big_tank_walks003.geometry}
          material={nodes.big_tank_walks003.material}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={-1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tunnel_wall005.geometry}
          material={nodes.tunnel_wall005.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.walking_floor001.geometry}
          material={nodes.walking_floor001.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.big_pond_floor001.geometry}
          material={nodes.big_pond_floor001.material}
          position={[0, 2.741, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tilapia_tank_floor002.geometry}
          material={nodes.tilapia_tank_floor002.material}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={-1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.crocodile_tank_floor001.geometry}
          material={nodes.crocodile_tank_floor001.material}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={-1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tilapia_tank_floor003.geometry}
          material={nodes.tilapia_tank_floor003.material}
          position={[0, 2.305, 0]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={-1}
        />
      </group>
      /************************************ */
    </group>
  );
};

useGLTF.preload('/fish_environment_1_5_3.glb');

export default WallsGeneral;
