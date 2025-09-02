import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const PlaneFish = ({
  fishType,
  material,
  height = 1.2,
  rotationY = 0,
  swimSpeed = 1.0,
  wiggleAmount = 0.1,
  depth = 0.3,
  oneDirectionFrames = 100,
}: {
  fishType:
    | 'goldfish-yellow'
    | 'goldfish-red'
    | 'molly'
    | 'swordfish-striped'
    | 'swordfish-orange'
    | 'swordfish-red'
    | 'swordfish-spotted'
    | 'swordfish-yellow'
    | 'zebra-danio';
  material: THREE.MeshStandardMaterial;
  height?: number;
  rotationY?: number;
  swimSpeed?: number;
  wiggleAmount?: number;
  depth?: number;
  oneDirectionFrames?: number;
}) => {
  const typeToQadrant = {
    'goldfish-yellow': [0, 2],
    'goldfish-red': [1, 2],
    molly: [2, 2],
    'swordfish-striped': [0, 1],
    'swordfish-orange': [1, 1],
    'swordfish-red': [2, 1],
    'swordfish-spotted': [0, 0],
    'swordfish-yellow': [1, 0],
    'zebra-danio': [2, 0],
  };
  const fishRef = useRef<THREE.Group>(null);
  const fishMeshRef = useRef<THREE.Group>(null);
  const fishWiggleRef = useRef<THREE.Group>(null);

  const tiltAngle = 10;
  const tiltAngleRad = tiltAngle * (Math.PI / 180);

  const quadrant = typeToQadrant[fishType];

  const rowCount = 3;
  const colCount = 3;
  const offset = [quadrant[0] / colCount, quadrant[1] / rowCount];

  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(1, 1);
    const uvs = geom.attributes.uv;

    for (let i = 0; i < uvs.count; i++) {
      uvs.setX(i, uvs.getX(i) / colCount + offset[0]);
      uvs.setY(i, uvs.getY(i) / rowCount + offset[1]);
    }
    uvs.needsUpdate = true;
    return geom;
  }, []);

  let count = 0;
  let swimDirection = 1;
  useFrame(({ camera }, delta) => {
    if (fishRef.current && fishMeshRef.current) {
      if (count % oneDirectionFrames === 0) {
        swimDirection = Math.random() > 0.5 ? 1 : -1;
        fishMeshRef.current.rotation.y =
          Math.PI / 2 + (swimDirection * Math.PI) / 2;
      }
      fishRef.current.rotation.y += delta * swimSpeed * swimDirection;
      if (fishWiggleRef.current) {
        const time = performance.now() * 0.001; // Convert to seconds
        const frequency = 50 * swimSpeed; // Adjust for desired wiggle speed
        const wiggleZ = Math.sin(time * frequency);
        const wiggleY = Math.sin(time * frequency * 2); // Slightly different frequency for variety
        // fishWiggleRef.current.rotation.z = (wiggleZ * wiggleAmount) / 20;
        fishWiggleRef.current.rotation.y = (wiggleY * wiggleAmount) / 3; // Added x-axis wiggle
        fishWiggleRef.current.position.z = wiggleZ / 30; // Reduced amplitude for subtle movement
      }
    }
    count++;
  });

  return (
    <>
      <group rotation={[0, (rotationY * Math.PI) / 180, 0]} ref={fishRef}>
        <group
          ref={fishMeshRef}
          rotation={[0, Math.PI, 0]}
          scale={0.3}
          position={[0, height, depth]}
        >
          <group ref={fishWiggleRef}>
            <mesh
              rotation={[0, tiltAngleRad, 0]}
              geometry={geometry}
              material={material}
            />
            <mesh
              rotation={[0, -tiltAngleRad, 0]}
              geometry={geometry}
              material={material}
            />
          </group>
        </group>
      </group>
    </>
  );
};

export default PlaneFish;
