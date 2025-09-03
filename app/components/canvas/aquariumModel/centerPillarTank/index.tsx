import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody, CylinderCollider } from '@react-three/rapier';
import { centerTankConfig } from '~/data/constants';
import CenterTankTemplate from './CenterTankTemplate';

const CenterPillarTank = ({ materialsMap }: { materialsMap: any }) => {
  const { ...nodes } = CenterTankTemplate(materialsMap);

  return (
    <>
      <primitive
        object={nodes.CenterTankLip}
        position={[0, -0.00005, 0]}
        // scale={[1, 0.982, 1]}
        scale={[1, 0.9879, 1]}
      />

      <mesh position={nodes.CenterTankGlass.position.toArray()}>
        <primitive object={nodes.CenterTankGlass.geometry} attach="geometry" />
        <MeshTransmissionMaterial {...centerTankConfig} />
      </mesh>

      <group position={[0, 1.25, 0]}>
        <RigidBody type="fixed" colliders={false}>
          <CylinderCollider args={[2.5 / 2, 0.75]} friction={3} />
        </RigidBody>
        {/* <mesh>
          <cylinderGeometry args={[0.75, 0.75, 2.5, 32, 1, true]} />
          <MeshTransmissionMaterial
            side={THREE.DoubleSide}
            // background={new THREE.Color('rgb(0,128,255)')}
            {...centerTankConfig}
          />
        </mesh> */}
      </group>
    </>
  );
};

export default CenterPillarTank;
