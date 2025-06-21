import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useState, useEffect, useRef } from 'react';
import Model from './Model';
import ClickHandler from './components/ClickHandler';
import Pin from './components/Pin';
import { getAnatomicalLabel } from './utils/anatomyMap';

export default function CanvasScene() {
  const [pins, setPins] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState('');
  const canvasRef = useRef();

  useEffect(() => {
    const canvasEl = canvasRef.current?.querySelector('canvas');
    if (canvasEl) {
      canvasEl.oncontextmenu = (e) => {
        // ✅ Allow default behavior
        return true;
      };
    }
  }, []);
  

  const handleSceneClick = (point) => {
    console.log('Clicked coordinates:', point);
    const label = getAnatomicalLabel(point);
    setPins([point]);
    setSelectedLabel(label);
  };

  return (
    <div ref={canvasRef} style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 50 }}
        style={{ width: '100%', height: '100%', background: '#ffffff' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2.5, 2, 0.5]} intensity={1.6} />
        <directionalLight position={[-2.5, 2, 0.5]} intensity={0.6} />
        <directionalLight position={[0, 1.5, -2]} intensity={0.3} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrbitControls enablePan={true} />

        <ClickHandler onClick={handleSceneClick} />
        {pins.map((pos, i) => (
          <Pin key={i} position={pos} />
        ))}
      </Canvas>

      {/* Floating label */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
          padding: '0.75rem 1rem',
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '8px',
          fontSize: '1.2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {selectedLabel ? `Anatomical Region: ${selectedLabel}` : 'Click the head to label'}
      </div>
    </div>
  );
}
