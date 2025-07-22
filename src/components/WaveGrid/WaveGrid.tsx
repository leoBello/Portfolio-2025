import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { LineSegments, Vector3, Raycaster, Plane, Vector2 } from 'three';

const GRID_SIZE = 120;
const GRID_DIST = 1;
const GRAVITY = 25;

// Grille avec déformation locale précise sous la souris
type GridLinesProps = { hover: [number, number] | null };

const GridLines: React.FC<GridLinesProps> = ({ hover }) => {
  const mesh = useRef<LineSegments>(null);

  const positions = useMemo(() => {
    const arr: number[] = [];
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

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i += 2) {
      for (let j = 0; j < 2; j++) {
        const x = pos.getX(i + j);
        const y = pos.getY(i + j);

        const waveZ =
          Math.sin((x + clock.elapsedTime) * 1.5) +
          Math.cos((y + clock.elapsedTime) * 1.5);

        let deformZ = 0;
        if (hover) {
          const dx = x - hover[0];
          const dy = y - hover[1];
          const distSq = dx * dx + dy * dy;
          deformZ = GRAVITY * Math.exp(-distSq / (2 * 12 * 12));
        }

        pos.setZ(i + j, waveZ * 0.4 + deformZ);
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
};

// MouseTracker : projection précise du rayon souris sur le plan de la grille (Z=0)
const MouseTracker: React.FC<{
  setHover: (pt: [number, number] | null) => void;
}> = ({ setHover }) => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 0, 1), 0); // Plan Z=0

    const handler = (event: PointerEvent) => {
      const bounds = gl.domElement.getBoundingClientRect();

      // Coordonnées NDC sur le canvas
      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      // Construction du rayon souris dans la scène
      raycaster.setFromCamera(new Vector2(x, y), camera);
      const intersect = new Vector3();
      raycaster.ray.intersectPlane(plane, intersect);

      setHover([intersect.x, intersect.y]);
    };

    const clearHover = () => setHover(null);

    gl.domElement.addEventListener('pointermove', handler);
    gl.domElement.addEventListener('pointerout', clearHover);

    return () => {
      gl.domElement.removeEventListener('pointermove', handler);
      gl.domElement.removeEventListener('pointerout', clearHover);
    };
  }, [camera, gl, setHover]);

  return null;
};

const GridLinesDemo: React.FC = () => {
  const [hover, setHover] = useState<[number, number] | null>(null);

  return (
    <Canvas
      camera={{ position: [0, -15, 20], fov: 60 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
    >
      <ambientLight intensity={0.5} />
      <MouseTracker setHover={setHover} />
      <GridLines hover={hover} />
    </Canvas>
  );
};

export default GridLinesDemo;
