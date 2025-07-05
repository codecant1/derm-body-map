import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import ClickHandler from './components/ClickHandler';
import Pin from './components/Pin';
import { getAnatomicalLabel } from './utils/anatomyMap';
import { getFemaleAnatomicalLabel } from './utils/femaleAnatomyMap';

function App() {
  const [modelPath, setModelPath] = useState('/models/MaleHead.glb');
  const [activeModel, setActiveModel] = useState('male');
  const [pinRetention, setPinRetention] = useState(true);
  const [lastLabel, setLastLabel] = useState('');

  const [pinScale, setPinScale] = useState(0.3);  // always resets on refresh

  const [malePins, setMalePins] = useState([]);
  const [femalePins, setFemalePins] = useState([]);

  useEffect(() => {
    if (modelPath.includes('Male')) {
      setActiveModel('male');
    } else {
      setActiveModel('female');
    }
  }, [modelPath]);

  useEffect(() => {
    const enableRightClick = (e) => e.stopPropagation();
    window.addEventListener('contextmenu', enableRightClick);
    return () => window.removeEventListener('contextmenu', enableRightClick);
  }, []);

  const handleModelClick = (position) => {
    let label = 'Unknown Region';
    if (activeModel === 'male') {
      label = getAnatomicalLabel(position);
      if (pinRetention) {
        setMalePins((prev) => [...prev, { position, label }]);
      } else {
        setMalePins([{ position, label }]);
      }
    } else {
      label = getFemaleAnatomicalLabel(position);
      if (pinRetention) {
        setFemalePins((prev) => [...prev, { position, label }]);
      } else {
        setFemalePins([{ position, label }]);
      }
    }
    setLastLabel(label);
    console.log(`Pin added on ${activeModel}:`, label, position);
  };

  const displayedPins = activeModel === 'male' ? malePins : femalePins;

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* controls */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <button onClick={() => setModelPath('/models/MaleHead.glb')}>Male</button>
        <button onClick={() => setModelPath('/models/FemaleHead.glb')}>Female</button>
        <button
          onClick={() => setPinRetention((prev) => !prev)}
          style={{ marginLeft: '10px' }}
        >
          Pin Retention: {pinRetention ? 'ON' : 'OFF'}
        </button>
        <div
          style={{
            marginLeft: '10px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'black',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px'
          }}
        >
          <label htmlFor="pin-size">Pin Size</label>
          <input
            id="pin-size"
            type="range"
            min="0.1"
            max="2"
            step="0.05"
            value={pinScale}
            onChange={(e) => {
              const next = parseFloat(e.target.value);
              setPinScale(next);
            }}
          />
          <span>{pinScale.toFixed(2)}</span>
        </div>
      </div>

      {/* anatomical label bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          zIndex: 10,
          fontSize: '14px'
        }}
      >
        {lastLabel || 'Click on a region to see label'}
      </div>

      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={1.0} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight
          position={[-5, 2, 5]}
          intensity={2}
        />
        <directionalLight
          position={[0, 5, -5]}
          intensity={2}
        />

        <Model modelPath={modelPath} />

        {displayedPins.map((pin, index) => (
          <Pin key={index} position={pin.position} label={pin.label} scale={pinScale} />
        ))}

        <ClickHandler onClick={handleModelClick} />

        <OrbitControls enablePan={true} enableZoom={true} />
      </Canvas>
    </div>
  );
}

export default App;
