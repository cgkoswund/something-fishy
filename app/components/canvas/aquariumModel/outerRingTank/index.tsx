import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const OuterRingTank = () => {
  const config = {
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: 10,
    resolution: 2048,
    transmission: 1,
    roughness: 0.0,
    thickness: 3.5,
    ior: 1.5,
    chromaticAberration: 0.06,
    anisotropy: 0.1,
    distortion: 0.0,
    distortionScale: 0.3,
    temporalDistortion: 0.5,
    clearcoat: 1,
    attenuationDistance: 0.5,
    attenuationColor: "#ffffff",
    color: "#c9ffa1",
    bg: "#839681",
  };
  return (
    <>
      <group scale={[1, 1, 0.85]}>
        <group position={[0, 1.4, 0]}>
          <mesh>
            <cylinderGeometry args={[10, 10, 2.8]} />
            <MeshTransmissionMaterial
              background={new THREE.Color("rgb(0,128,255)")}
              {...config}
              side={THREE.BackSide}
            />
          </mesh>
          <mesh>
            <cylinderGeometry args={[30, 30, 2.8]} />
            <meshStandardMaterial
              color="rgb(0,128,255)"
              side={THREE.BackSide}
            />
            {/* <MeshTransmissionMaterial
            background={new THREE.Color("rgb(0,128,255)")}
            {...config}
            side={THREE.BackSide}
          /> */}
          </mesh>
        </group>
        {/**Temp ceiling */}
        <mesh position={[0, 2.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[10, 30, 32, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        {/**Temp floor */}
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[10, 30, 32, 3]} />
          <meshStandardMaterial color="pink" />
        </mesh>
      </group>
    </>
  );
};

export default OuterRingTank;
