import PlaneFish from './PlaneFish';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type FishType =
  | 'goldfish-yellow'
  | 'goldfish-red'
  | 'molly'
  | 'swordfish-striped'
  | 'swordfish-orange'
  | 'swordfish-red'
  | 'swordfish-spotted'
  | 'swordfish-yellow'
  | 'zebra-danio';

const PlaneFishGroup = () => {
  const fishes: FishType[] = [
    'goldfish-yellow',
    'goldfish-red',
    'molly',
    'swordfish-striped',
    'swordfish-orange',
    'swordfish-red',
    'swordfish-spotted',
    'swordfish-yellow',
    'zebra-danio',
  ];

  const [texture, textureAlpha] = useTexture([
    '/tex/fishPlanes/centerTank/centerFishAtlasDiffuseB2.png',
    '/tex/fishPlanes/centerTank/centerFishAtlasAlpha2.png',
  ]);

  const fishMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    alphaMap: textureAlpha,
    transparent: true,
    side: THREE.DoubleSide,
    roughness: 0.5,
    metalness: 0.5,
    depthWrite: false,
    depthTest: true,
  });

  return (
    <group>
      {fishes.map((fish, index) => {
        const fishCount = Math.random() * 4 + 1;
        //
        return (
          <>
            <group></group>
            {Array.from({ length: Math.floor(fishCount) }).map((_, i) => {
              const height = Math.random() * 1.5 + 0.4;
              const depth = Math.random() * 0.2 + 0.45;
              const rotationY = Math.random() * 360;
              const swimSpeed = Math.random() * 0.15 + 0.07;
              const wiggleAmount = Math.random() * 8 + 8;
              const oneDirectionFrames = Math.random() * 1000 + 100;
              return (
                <PlaneFish
                  key={index}
                  fishType={fish}
                  material={fishMaterial}
                  rotationY={rotationY}
                  height={height}
                  depth={depth}
                  swimSpeed={swimSpeed}
                  wiggleAmount={(wiggleAmount * Math.PI) / 180}
                  oneDirectionFrames={oneDirectionFrames}
                />
              );
            })}
          </>
        );
      })}
    </group>
  );
};

export default PlaneFishGroup;
