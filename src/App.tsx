import { useEffect, useRef } from 'react';
import { initScene } from './scene/setup';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    initScene(containerRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}

export default App;
