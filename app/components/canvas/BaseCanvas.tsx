import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import PlayerControls from "./PlayerControls";
import Aquarium from "./aquariumModel";

const BaseCanvas = () => {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <PlayerControls />
      <Lights />
      <Aquarium />
    </Canvas>
  );
};

export default BaseCanvas;
