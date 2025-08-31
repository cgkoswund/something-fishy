import { MeshTransmissionMaterial, Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const GlassTowerTest = () => {
  const materialRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { gl, scene, camera, invalidate } = useThree();
  
  // Force complete remount key
  const [remountKey, setRemountKey] = useState(0);
  const [debugInfo, setDebugInfo] = useState('');
  const [lastAction, setLastAction] = useState('Initial load');
  
  // Capture material state for debugging
  const captureState = () => {
    if (!materialRef.current) return null;
    
    const material = materialRef.current;
    return {
      transmission: material.transmission,
      ior: material.ior,
      needsUpdate: material.needsUpdate,
      buffer: !!material.buffer,
      target: !!material.target,
      transmissionSampler: material.transmissionSampler,
      sceneBackground: !!scene.background,
      sceneEnvironment: !!scene.environment,
    };
  };
  
  // TEST 1: Simulate HMR by completely destroying and recreating
  const simulateHMR = () => {
    console.log('🔥 TEST 1: Simulating HMR (complete remount)...');
    setLastAction('HMR Simulation');
    
    // Force complete remount (most similar to HMR)
    setRemountKey(prev => prev + 1);
    
    // Force re-render after remount
    setTimeout(() => {
      invalidate();
      console.log('Material state after HMR sim:', captureState());
    }, 16);
  };
  
  // TEST 2: Force material recreation without component remount
  const recreateMaterial = () => {
    console.log('🔄 TEST 2: Recreating material only...');
    setLastAction('Material Recreation');
    
    if (materialRef.current) {
      // Dispose old material resources
      materialRef.current.dispose();
      if (materialRef.current.buffer) materialRef.current.buffer.dispose();
      if (materialRef.current.target) materialRef.current.target.dispose();
    }
    
    // Force new material instance
    setRemountKey(prev => prev + 1);
    invalidate();
    
    setTimeout(() => {
      console.log('Material state after recreation:', captureState());
    }, 16);
  };
  
  // TEST 3: Force WebGL state reset + multiple invalidations
  const nuclearReset = () => {
    console.log('☢️ TEST 3: Nuclear reset (WebGL + multiple frames)...');
    setLastAction('Nuclear Reset');
    
    // Reset WebGL state
    gl.state.reset();
    
    // Dispose material
    if (materialRef.current) {
      materialRef.current.dispose();
    }
    
    // Complete remount
    setRemountKey(prev => prev + 1);
    
    // Force multiple frame updates
    let frameCount = 0;
    const forceUpdate = () => {
      if (frameCount < 5) {
        frameCount++;
        invalidate();
        requestAnimationFrame(forceUpdate);
      } else {
        console.log('Material state after nuclear reset:', captureState());
      }
    };
    forceUpdate();
  };
  
  // TEST 4: Just log current state
  const logState = () => {
    console.log('📊 Current material state:', captureState());
    setLastAction('State Logged');
  };
  
  // Update debug info display
  useEffect(() => {
    if (materialRef.current) {
      const state = captureState();
      const info = `
Remount Key: ${remountKey}
Last Action: ${lastAction}
Has Buffer: ${state?.buffer}
Has Target: ${state?.target}
Scene BG: ${state?.sceneBackground}
Scene Env: ${state?.sceneEnvironment}
Needs Update: ${state?.needsUpdate}
      `;
      setDebugInfo(info);
    }
  }, [remountKey, lastAction]);
  
  // Log when component mounts/unmounts
  useEffect(() => {
    console.log(`🏗️ GlassTower mounted with key: ${remountKey}`);
    return () => {
      console.log(`🧹 GlassTower unmounted with key: ${remountKey}`);
    };
  }, [remountKey]);

  return (
    <group key={`glass-tower-${remountKey}`}>
      {/* The glass cylinder with click handlers */}
      <mesh 
        ref={meshRef}
        position-y={1.4}
        onClick={(e) => { e.stopPropagation(); simulateHMR(); }}
        onContextMenu={(e) => { e.preventDefault(); recreateMaterial(); }}
        onDoubleClick={(e) => { e.stopPropagation(); nuclearReset(); }}
        onPointerDown={(e) => { 
          if (e.button === 1) { // Middle mouse button
            e.stopPropagation(); 
            logState(); 
          }
        }}
      >
        <cylinderGeometry args={[1.6 / 2, 1.6 / 2, 2.8, 32, 1, true]} />
        <MeshTransmissionMaterial
          ref={materialRef}
          transmissionSampler={true}
          backside={false}
          samples={7}
          resolution={1048}
          transmission={1}
          roughness={0.01}
          thickness={3.5}
          ior={2.3}
          chromaticAberration={0.01}
          anisotropy={0.0}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.9}
          attenuationDistance={50}
          attenuationColor={'#33bbdd'}
          color={'#b9bfd1'}
          background={new THREE.Color('#55ffff')}
          envMapIntensity={0}
          reflectivity={0}
        />
      </mesh>
      
      {/* UI Instructions - visible in the scene */}
      <Html position={[0, 3.5, 0]} center>
        <div style={{
          background: 'rgba(0,0,0,0.9)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'monospace',
          textAlign: 'center',
          border: '2px solid #333',
          minWidth: '300px'
        }}>
          <div style={{ marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            🧪 TRANSMISSION MATERIAL TESTS
          </div>
          <div style={{ marginBottom: '5px' }}>🖱️ <strong>LEFT CLICK</strong>: Simulate HMR</div>
          <div style={{ marginBottom: '5px' }}>🖱️ <strong>RIGHT CLICK</strong>: Recreate Material</div>
          <div style={{ marginBottom: '5px' }}>🖱️ <strong>DOUBLE CLICK</strong>: Nuclear Reset</div>
          <div style={{ marginBottom: '10px' }}>🖱️ <strong>MIDDLE CLICK</strong>: Log State</div>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '8px', 
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'pre-line',
            textAlign: 'left'
          }}>
            {debugInfo}
          </div>
        </div>
      </Html>
      
      {/* Button alternatives for easier testing */}
      <Html position={[-2, 1, 2]} center>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={simulateHMR}
            style={{ padding: '8px 12px', background: '#ff6b6b', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
          >
            🔥 HMR Test
          </button>
          <button 
            onClick={recreateMaterial}
            style={{ padding: '8px 12px', background: '#4ecdc4', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
          >
            🔄 Material Test
          </button>
          <button 
            onClick={nuclearReset}
            style={{ padding: '8px 12px', background: '#45b7d1', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
          >
            ☢️ Nuclear Test
          </button>
          <button 
            onClick={logState}
            style={{ padding: '8px 12px', background: '#96ceb4', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
          >
            📊 Log State
          </button>
        </div>
      </Html>
    </group>
  );
};

export default GlassTowerTest;