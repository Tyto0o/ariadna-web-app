import { useEffect, useRef } from 'react';
import { Container, Typography, Box } from '@mui/material';
import * as THREE from 'three';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = 500;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasWidth / canvasHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(canvasWidth, canvasHeight);
    camera.position.z = 5;

    // Create a simple cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Ariadna Web App
        </Typography>
        <Typography variant="body1" gutterBottom>
          React + Material-UI + Three.js
        </Typography>
      </Box>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '500px' }}
      />
    </Container>
  );
}

export default App;
