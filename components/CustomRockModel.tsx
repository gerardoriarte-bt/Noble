import React, { useRef } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { useOBJ } from '@react-three/drei';
import type * as THREE from 'three';

const CustomRockModel: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();
  
  // Cargar el modelo OBJ
  const obj = useOBJ('/models/rock-model.obj');

  useFrame((state, delta) => {
    if (meshRef.current) {
        // Slow constant rotation
        meshRef.current.rotation.y += delta * 0.1;
        meshRef.current.rotation.x += delta * 0.05;

        // Mouse move interaction (smoothed)
        const targetX = mouse.x * 0.2;
        const targetY = mouse.y * 0.2;

        meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
        meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={meshRef} scale={1.2}>
      <primitive object={obj} />
    </group>
  );
};

export default CustomRockModel;


