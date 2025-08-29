import { Grid } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

const Floor = () => {
  const gridConfig = {
    gridSize: [10.5, 10.5],
    cellSize: 0.5,
    cellThickness: 1,
    cellColor: '#6f6f6f',
    sectionSize: 2,
    sectionThickness: 1.5,
    sectionColor: '#9d4b4b',
    fadeDistance: 100,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };
  return (
    <>
      {/* <Grid
        position={[0, 2.4 - 0.01, 0]}
        rotation={[Math.PI, 0, 0]}
        scale={0.5}
        {...gridConfig}
      /> */}
      {/* <Grid position={[0, 0.07, 0]} scale={0.5} {...gridConfig} /> */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[100, 0.01, 100]} friction={0} />
        {/* <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="black" />
        </mesh> */}
      </RigidBody>
      {/**Temp ceiling */}
      {/* <mesh position={[0, 2.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="black" />
      </mesh> */}
    </>
  );
};

export default Floor;
