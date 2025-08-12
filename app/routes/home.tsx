import type { Route } from "./+types/home";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BaseCanvas from "../components/canvas/BaseCanvas";

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
        <BaseCanvas />
      </div>
    </>
  );
}
