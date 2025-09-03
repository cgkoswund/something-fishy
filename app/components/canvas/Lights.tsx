import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const Lights = () => {
  return (
    <>
      <directionalLight
        color={'rgb(128, 200, 255)'}
        castShadow
        position={[0, 3, 0]}
        intensity={3}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        shadow-normalBias={0.04}
      >
        <orthographicCamera
          attach="shadow-camera"
          left={-50}
          right={50}
          top={50}
          bottom={-50}
          near={0.005}
          far={5}
        />
      </directionalLight>
      <directionalLight position={[-1, 1, 1]} intensity={1} />
      <directionalLight position={[1, 0, 1]} intensity={1.5} />
      <directionalLight position={[-1, 1, -1]} intensity={0.3} />
      <directionalLight position={[1, 0.5, -1]} intensity={0.5} />
      <ambientLight intensity={0.3} color={'rgb(255, 200, 0)'} />

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
