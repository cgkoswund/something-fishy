import { Environment } from "@react-three/drei";

const Lights = () => {
  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      <directionalLight position={[-1, 1, 1]} />
      <directionalLight position={[1, -1, 1]} />
      <Environment preset="apartment" />
    </>
  );
};

export default Lights;
