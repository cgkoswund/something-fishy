import { Environment } from '@react-three/drei';

const Lights = () => {
  return (
    <>
      <directionalLight castShadow position={[1, 1, 1]} intensity={3} />
      <directionalLight position={[-1, 1, 1]} intensity={1} />
      <directionalLight position={[1, -1, 1]} intensity={1} />
      <ambientLight intensity={0.5} />

      {/**center tank light */}
      {/* <spotLight position={[0.4, 2.3, 0.4]} intensity={2} />
      <spotLight position={[0.4, 2.3, -0.4]} intensity={2} />
      <spotLight position={[-0.4, 2.3, 0.4]} intensity={2} />
      <spotLight position={[-0.4, 2.3, -0.4]} intensity={2} />

      {/**jelly tank light */}
      {/* <spotLight position={[10, 2.3, 10]} intensity={2} />
      <spotLight position={[10, 2.3, -10]} intensity={2} />
      <spotLight position={[-10, 2.3, 10]} intensity={2} />
      <spotLight position={[-10, 2.3, -10]} intensity={2} /> */}

      {/**croc tank light */}
      {/* <spotLight position={[1.5, 2.3, 20]} intensity={2} />
      <spotLight position={[1.5, 2.3, -20]} intensity={2} />
      <spotLight position={[-1.5, 2.3, 20]} intensity={2} />
      <spotLight position={[-1.5, 2.3, -20]} intensity={2} /> */}

      {/**shark tank light */}
      {/* <spotLight position={[80, 2.3, 80]} intensity={2} />
      <spotLight position={[80, 2.3, -80]} intensity={2} />
      <spotLight position={[-80, 2.3, 80]} intensity={2} />
      <spotLight position={[-80, 2.3, -80]} intensity={2} /> */}

      <Environment
        preset="apartment"
        background={false}
        environmentIntensity={0.25}
      />
    </>
  );
};

export default Lights;
