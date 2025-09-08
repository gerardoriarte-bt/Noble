import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, useTransform } from 'framer-motion';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import type * as THREE from 'three';

const AdvancedRockModel: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();
  const [model, setModel] = useState<THREE.Group | null>(null);
  
  // Hook para detectar scroll
  const { scrollYProgress } = useScroll();
  
  // Múltiples transformaciones para efectos parallax complejos
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -3, -8]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 3]);
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 1.5]);
  const rotationX = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [1.2, 1.0, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.8, 0.3]);

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
        // Rotación constante muy suave
        meshRef.current.rotation.y += delta * 0.02;
        meshRef.current.rotation.x += delta * 0.01;

        // Interacción con el mouse (muy sutil)
        const targetX = mouse.x * 0.05;
        const targetY = mouse.y * 0.05;

        meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.02;
        meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.02;
    }
  });

  if (!model) return null;

  return (
    <group 
      ref={meshRef} 
      position={[x.get(), y.get(), 0]}
      rotation={[rotationX.get(), rotationY.get(), 0]}
      scale={scale.get()}
    >
      <primitive object={model} />
    </group>
  );
};

export default AdvancedRockModel;
