import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import { Group, AnimationMixer, AnimationClip, AnimationAction } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const Guppie = ({
  height = 1.2,
  rotationY = 0,
  swimSpeed = 1.0,
  wiggleAmount = 0.1,
}: {
  height: number;
  rotationY: number;
  swimSpeed?: number;
  wiggleAmount?: number;
}) => {
  // Load the model once
  const { scene, animations } = useGLTF(
    '/models/fishModels/guppie_animated.glb'
  );

  // Create a unique instance of the model for this component using SkeletonUtils.clone()
  const model = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Create a ref for the group
  const bettaRef = useRef<Group>(null);

  // Create a mixer for this specific instance
  const mixer = useMemo(() => new THREE.AnimationMixer(model), [model]);

  // Set up the animation
  useEffect(() => {
    if (animations && animations.length > 0) {
      // Get the first animation (assuming it's the swimming animation)
      const swimAction = mixer.clipAction(animations[0]);

      // Configure the animation based on props
      swimAction.timeScale = swimSpeed / 25;
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
    if (bettaRef.current) {
      count++;
      if (count % 1000 === 0) {
        swimDirection = Math.random() > 0.5 ? 1 : -1;
        model.rotation.y = -Math.PI / 2 + (swimDirection * Math.PI) / 2;
      }

      bettaRef.current.rotation.y += delta * swimSpeed * 0.003 * swimDirection;
    }
  });

  const depth = Math.random() * 0.3 + 0.378;

  return (
    <group ref={bettaRef} rotation={[0, (rotationY * Math.PI) / 180, 0]}>
      <group position={[0, height, depth]}>
        <primitive object={model} scale={0.00175} rotation={[0, 0, 0]} />
      </group>
    </group>
  );
};

export default Guppie;
