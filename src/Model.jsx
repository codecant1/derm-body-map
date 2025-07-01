// Model.jsx

import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Box3, Vector3 } from 'three';

export default function Model({ modelPath, ...props }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      const box = new Box3().setFromObject(modelRef.current);
      const center = new Vector3();
      box.getCenter(center);
      modelRef.current.position.sub(center); // center the model
      console.log('Model centered to:', center);
    }
  }, [scene]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={8}
      {...props}
    />
  );
}
