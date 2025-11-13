import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import type * as THREE from 'three';

const StaticRockModel: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();

    // Cargar materiales primero
    mtlLoader.load('/models/rock-model.mtl', (materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
      
      // Luego cargar el modelo OBJ
      objLoader.load('/models/rock-model.obj', (object) => {
        setModel(object);
      });
    });
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
        // Rotación constante suave
        meshRef.current.rotation.y += delta * 0.1;
        meshRef.current.rotation.x += delta * 0.05;

        // Interacción con el mouse (sutil)
        const targetX = mouse.x * 0.1;
        const targetY = mouse.y * 0.1;

        meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
        meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
    }
  });

  if (!model) return null;

  return (
    <group 
      ref={meshRef} 
      scale={0.6}
    >
      <primitive object={model} />
    </group>
  );
};

export default StaticRockModel;


