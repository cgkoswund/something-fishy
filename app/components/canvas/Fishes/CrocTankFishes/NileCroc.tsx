import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import { Group, AnimationMixer, AnimationClip, AnimationAction } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const NileCroc = ({
  height = 1.2,
  xOffset = 2.5,
  swimSpeed = 1.0,
  wiggleAmount = 0.1,
}: {
  height: number;
  xOffset?: number;
  swimSpeed?: number;
  wiggleAmount?: number;
}) => {
  // Load the model once
  const { scene, animations } = useGLTF(
    '/models/fishModels/nile_crocodile_swimming.glb'
  );

  // Create a unique instance of the model for this component using SkeletonUtils.clone()
  const model = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Create a ref for the group
  const crocRef = useRef<Group>(null);

  // Create a mixer for this specific instance
  const mixer = useMemo(() => new THREE.AnimationMixer(model), [model]);

  // Set up the animation
  useEffect(() => {
    if (animations && animations.length > 0) {
      // Get the first animation (assuming it's the swimming animation)
      const swimAction = mixer.clipAction(animations[0]);

      // Configure the animation based on props
      swimAction.timeScale = swimSpeed;
      swimAction.play();

      // Apply wiggle effect if needed
      if (wiggleAmount > 0) {
        // You could modify the animation influence or add additional animations here
        // For example, you might want to add a second animation for wiggling
        // Or modify the existing animation parameters
      }

      return () => {
        // Clean up animations when component unmounts
        swimAction.stop();
        mixer.stopAllAction();
      };
    }
  }, [animations, mixer, swimSpeed, wiggleAmount]);

  // Update the animation on each frame
  let count = 0;
  let swimDirection = 1;
  useFrame((state, delta) => {
    mixer.update(delta);
    if (crocRef.current) {
      count++;
      if (count % 1000 === 0) {
        swimDirection = Math.random() > 0.5 ? 1 : -1;
        model.rotation.y = swimDirection * Math.PI;
      }

      const extraZ = delta * swimSpeed * 5 * 0.1 * swimDirection;
      // Calculate the current z position relative to the minimum value (14)
      let relativeZ = crocRef.current.position.z - 14;

      // The range we want is 0 to 12 (which is 26-14)
      const zRange = 12;

      // Add the movement and handle wrapping within our range
      relativeZ = (relativeZ + extraZ) % zRange;

      // If we go negative, wrap around to the other side of the range
      if (relativeZ < 0) {
        relativeZ += zRange;
      }

      // Convert back to absolute position (14 to 26)
      crocRef.current.position.z = 14 + relativeZ;
    }
  });

  return (
    <group ref={crocRef} position={[xOffset, height, 14]} rotation={[0, 0, 0]}>
      <group position={[2.5 / 5, 0, 0]}>
        <primitive object={model} scale={0.25} rotation={[0, 0, 0]} />
      </group>
    </group>
  );
};

export default NileCroc;
