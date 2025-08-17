import type { Route } from './+types/home';
import BaseCanvas from '../components/canvas/BaseCanvas';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Something Fishy' },
    { name: 'description', content: 'In aquarium walk-in Aquarium' },
  ];
}

export default function Home() {
  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <BaseCanvas />
      </div>
    </>
  );
}
