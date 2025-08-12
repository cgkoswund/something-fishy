import type { Route } from "./+types/home";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas>
          <OrbitControls />
          <directionalLight position={[1, 1, 1]} />
          <directionalLight position={[-1, 1, 1]} />
          <directionalLight position={[1, -1, 1]} />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </Canvas>
      </div>
    </>
  );
}
