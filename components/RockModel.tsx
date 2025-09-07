import React, { useRef } from 'react';
// FIX: Explicitly extend R3F to register THREE elements as JSX components.
// This resolves TypeScript errors for R3F primitives like <meshStandardMaterial />.
import { useFrame, useThree, extend } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import type * as THREE from 'three';
import { MeshStandardMaterial } from 'three';

extend({ MeshStandardMaterial });

const RockModel: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { mouse } = useThree();

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
      <Icosahedron args={[1, 6]} ref={meshRef} scale={1.2}>
        <meshStandardMaterial
            color="#b9a695" 
            roughness={0.1} 
            metalness={0.9}
        />
      </Icosahedron>
  );
};

export default RockModel;