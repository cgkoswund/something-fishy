import { Instance } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const PlaneFishSingleInstance = ({
  height = 1.2,
  rotationY = 0,
  swimSpeed = 1.0,
  wiggleAmount = 0.1,
  depth = 0.3,
  oneDirectionFrames = 100,
}: {
  height?: number;
  rotationY?: number;
  swimSpeed?: number;
  wiggleAmount?: number;
  depth?: number;
  oneDirectionFrames?: number;
}) => {
  const geometryPlaceHolders = {
    fishRef: new THREE.Group(),
    fishMeshRef: new THREE.Group(),
    fishWiggleRef: new THREE.Group(),
  };

  /**
   * pseudo nested jsx
   */
  geometryPlaceHolders.fishRef.rotation.y = rotationY * (Math.PI / 180);

  geometryPlaceHolders.fishMeshRef.rotation.y = Math.PI;
  geometryPlaceHolders.fishMeshRef.position.y = height;
  geometryPlaceHolders.fishMeshRef.position.z = depth;
  /***************** */

  const instanceRef = useRef<THREE.Group>(null);

  const { position, rotation } = computeDynamicRotPos(
    geometryPlaceHolders.fishRef,
    geometryPlaceHolders.fishMeshRef,
    geometryPlaceHolders.fishWiggleRef
  );

  let count = 0;
  let swimDirection = 1;

  useFrame(({ camera }, delta) => {
    const { fishRef, fishMeshRef, fishWiggleRef } = geometryPlaceHolders;

    if (fishRef && fishMeshRef && instanceRef.current) {
      if (count % oneDirectionFrames === 0) {
        swimDirection = Math.random() > 0.5 ? 1 : -1;
        fishMeshRef.rotation.y = Math.PI / 2 + (swimDirection * Math.PI) / 2;
      }

      fishRef.rotation.y += delta * swimSpeed * swimDirection;
      if (fishWiggleRef) {
        const time = performance.now() * 0.001; // Convert to seconds
        const frequency = 50 * swimSpeed; // Adjust for desired wiggle speed
        const wiggleZ = Math.sin(time * frequency);
        const wiggleY = Math.sin(time * frequency * 2); // Slightly different frequency for variety
        // fishWiggleRef.current.rotation.z = (wiggleZ * wiggleAmount) / 20;
        fishWiggleRef.rotation.y = (wiggleY * wiggleAmount) / 3; // Added x-axis wiggle
        fishWiggleRef.position.z = wiggleZ / 100; // Reduced amplitude for subtle movement
      }
      const { position: dynamicPosition, rotation: dynamicRotation } =
        computeDynamicRotPos(fishRef, fishMeshRef, fishWiggleRef);
      instanceRef.current.position.set(...dynamicPosition);
      instanceRef.current.rotation.set(...dynamicRotation);
    }
    count++;
  });

  return (
    <>
      <Instance
        scale={0.3}
        ref={instanceRef}
        position={position}
        rotation={rotation}
      />
    </>
  );
};

export default PlaneFishSingleInstance;
/**
 * Psedo groups
 */
const reusableGroups = {
  outer: new THREE.Group(),
  arm: new THREE.Group(),
  wiggle: new THREE.Group(),
};

// Inside the function, use the reusable groups
function computeDynamicRotPos(
  fishRef: THREE.Group,
  fishMeshRef: THREE.Group,
  fishWiggleRef: THREE.Group
) {
  const {
    outer: outerGroup,
    arm: armGroup,
    wiggle: wiggleGroup,
  } = reusableGroups;

  // outerGroup.rotation.y = rotationY * (Math.PI / 180);
  outerGroup.rotation.copy(fishRef.rotation);
  outerGroup.position.copy(fishRef.position);

  armGroup.position.copy(fishMeshRef.position);
  armGroup.rotation.copy(fishMeshRef.rotation);

  wiggleGroup.position.copy(fishWiggleRef.position);
  wiggleGroup.rotation.copy(fishWiggleRef.rotation);

  outerGroup.add(armGroup);
  armGroup.add(wiggleGroup);

  // CRITICAL:
  outerGroup.updateMatrixWorld();

  const wiggleGroupGlobalPosition = new THREE.Vector3();
  wiggleGroupGlobalPosition.setFromMatrixPosition(wiggleGroup.matrixWorld);

  const wiggleGroupGlobalRotation = new THREE.Euler();
  wiggleGroupGlobalRotation.setFromRotationMatrix(wiggleGroup.matrixWorld);

  return {
    position: wiggleGroupGlobalPosition.toArray(),
    rotation: wiggleGroupGlobalRotation.toArray(),
  };
}
