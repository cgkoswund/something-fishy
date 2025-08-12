import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Tests() {
  return (
    <>
      <Welcome />
      <h1>Tests</h1>
      <h1>Tests</h1>
      <h1>Tests</h1>
      <h1>Tests</h1>
      <h1>Tests</h1>
      <h1>Tests</h1>
      <h1>Tests</h1>
    </>
  );
}
