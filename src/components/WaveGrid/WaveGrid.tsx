import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { LineSegments } from 'three';

const GRID_SIZE = 120;
const GRID_DIST = 1;

function GridLines() {
  const mesh = useRef<LineSegments>(null);

  // Construction des segments de la grille : lignes horizontales et verticales
  const positions = useMemo(() => {
    const arr = [];
    // Lignes horizontales
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE - 1; x++) {
        arr.push(
          (x - GRID_SIZE / 2) * GRID_DIST,
          (y - GRID_SIZE / 2) * GRID_DIST,
          0,
          (x + 1 - GRID_SIZE / 2) * GRID_DIST,
          (y - GRID_SIZE / 2) * GRID_DIST,
          0
        );
      }
    }
    // Lignes verticales
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE - 1; y++) {
        arr.push(
          (x - GRID_SIZE / 2) * GRID_DIST,
          (y - GRID_SIZE / 2) * GRID_DIST,
          0,
          (x - GRID_SIZE / 2) * GRID_DIST,
          (y + 1 - GRID_SIZE / 2) * GRID_DIST,
          0
        );
      }
    }
    return new Float32Array(arr);
  }, []);

  // Animation des ondes sur Z
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i += 2) {
      for (let j = 0; j < 2; j++) {
        const x = pos.getX(i + j);
        const y = pos.getY(i + j);
        const z =
          Math.sin((x + clock.elapsedTime) * 1.5) +
          Math.cos((y + clock.elapsedTime) * 1.5);
        pos.setZ(i + j, z * 0.4);
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <lineSegments ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color='#53A1FF' />
    </lineSegments>
  );
}

export default function GridLinesDemo() {
  return (
    <Canvas
      camera={{ position: [0, -15, 20], fov: 60 }}
      // camera={{ position: [0, -28, 12], fov: 50 }} // plus rasant
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    >
      <ambientLight intensity={0.5} />
      <GridLines />
    </Canvas>
  );
}
