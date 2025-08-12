import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const CenterPillarTank = () => {
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
      <group position={[0, 1.25, 0]}>
        <mesh>
          <cylinderGeometry args={[0.75, 0.75, 2.5]} />
          <MeshTransmissionMaterial
            background={new THREE.Color("rgb(0,128,255)")}
            {...config}
          />
        </mesh>
      </group>
    </>
  );
};

export default CenterPillarTank;
