import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { initScene } from './scene/setup';
import { UserPanel } from './components/UserPanel';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    initScene(containerRef.current);
  }, []);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Box ref={containerRef} sx={{ flex: '0 0 80%' }} />
      <Box sx={{ flex: '0 0 20%', overflow: 'auto', height: '100%' }}>
        <UserPanel />
      </Box>
    </Box>
  );
}

export default App;
