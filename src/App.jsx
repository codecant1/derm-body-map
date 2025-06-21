import React, { useEffect } from 'react';
import CanvasScene from './CanvasScene';

function App() {
  useEffect(() => {
    // ✅ Re-enable right-click
    const enableRightClick = (e) => e.stopPropagation();
    window.addEventListener('contextmenu', enableRightClick);

    return () => {
      window.removeEventListener('contextmenu', enableRightClick);
    };
  }, []);

  return <CanvasScene />;
}

export default App;
