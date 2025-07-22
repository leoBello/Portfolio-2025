import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GRID_SIZE = 250; // Nombre de points sur chaque axe
const GRID_DIST = 0.5; // Espacement des points

// Composant qui dessine et anime la grille de points
function WaveGrid() {
  const mesh = useRef<THREE.Points>(null);

  // Construction initiale des positions de la grille
  const positions = useMemo(() => {
    const arr = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        arr.push(
          (x - GRID_SIZE / 2) * GRID_DIST, // X
          (y - GRID_SIZE / 2) * GRID_DIST, // Y
          0 // Z (sera animé)
        );
      }
    }
    return new Float32Array(arr);
  }, []);

  // Animation "onde" sur Z (vague)
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Calcul d'une vague sinusoïdale
      const z =
        Math.sin((x + clock.elapsedTime) * 1.5) +
        Math.cos((y + clock.elapsedTime) * 1.5);
      pos.setZ(i, z * 0.4); // Amplitude de la vague
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          args={[positions, 3]} // 3 = itemSize (x, y, z)
        />
      </bufferGeometry>
      <pointsMaterial color='#53A1FF' size={0.16} />
    </points>
  );
}

// Intégration dans l’application
export default function WaveGridDemo() {
  return (
    <Canvas
      camera={{ position: [0, -15, 20], fov: 60 }}
      style={{
        position: 'fixed', // ou 'absolute', selon le cas
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // envoie en arrière-plan si besoin, au-dessus du body
      }}
    >
      <ambientLight intensity={0.5} />
      <WaveGrid />
    </Canvas>
  );
}
