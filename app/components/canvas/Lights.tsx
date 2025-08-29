import { Environment } from '@react-three/drei';

const Lights = () => {
  return (
    <>
      <directionalLight castShadow position={[1, 1, 1]} />
      <directionalLight position={[-1, 1, 1]} />
      <directionalLight position={[1, -1, 1]} />
      <Environment
        preset="apartment"
        background={false}
        environmentIntensity={0.25}
      />
    </>
  );
};

export default Lights;
