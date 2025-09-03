import { Instances } from '@react-three/drei';
import PlaneFishGeometryForInstance from './PlaneFishGeometryForInstance';
import PlaneFishSingleInstance from './PlaneFishSingleInstance';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

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

const PlaneFishInstances = () => {
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

  const fishMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    alphaMap: textureAlpha,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    depthTest: true,
  });
  // const fishMaterial = new THREE.MeshStandardMaterial({
  //   map: texture,
  //   alphaMap: textureAlpha,
  //   transparent: true,
  //   side: THREE.DoubleSide,
  //   roughness: 0.5,
  //   metalness: 0.5,
  //   depthWrite: false,
  //   depthTest: true,
  // });

  return (
    <>
      {fishes.map((fish, index) => {
        const fishCount = Math.random() * 12 + 1;
        return (
          <Instances key={index} frustumCulled={false}>
            <PlaneFishGeometryForInstance
              fishType={fish}
              material={fishMaterial}
            />
            <>
              {Array.from({ length: fishCount }).map((_, i) => {
                /************* */
                //test variables
                const height = Math.random() * 1.5 + 0.4;
                const depth = Math.random() * 0.2 + 0.45;
                const rotationY = Math.random() * 360;
                const swimSpeed = Math.random() * 0.15 + 0.07;
                const wiggleAmount = Math.random() * 8 + 8;
                const oneDirectionFrames = Math.random() * 1000 + 100;

                /************** */
                return (
                  <PlaneFishSingleInstance
                    key={i}
                    depth={depth}
                    rotationY={rotationY}
                    height={height}
                    swimSpeed={swimSpeed}
                    wiggleAmount={(wiggleAmount * Math.PI) / 180}
                    oneDirectionFrames={oneDirectionFrames}
                  />
                );
              })}
            </>
          </Instances>
        );
      })}
    </>
  );
};

export default PlaneFishInstances;
