import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { LineSegments, Vector3, Raycaster, Plane, Vector2 } from 'three';

interface WaveGridProps {
  gravity: number;
}

// Taille de la grille (nombre de lignes/colonnes)
const GRID_SIZE = 120;
// Espacement entre les points de la grille
const GRID_DIST = 1;

// Props du composant GridLines : coordonnées du hover ou null
type GridLinesProps = { hover: [number, number] | null; gravity: number };

// Composant qui dessine et anime la grille avec effet de puits localisé
const GridLines: React.FC<GridLinesProps> = ({ hover, gravity }) => {
  // Ref sur l'objet Three.js manipulé pour accéder directement à la géométrie
  const mesh = useRef<LineSegments>(null);

  // Calcul des sommets des segments de la grille (positions initiales X, Y, Z=0)
  // useMemo pour ne calculer qu'une fois à l'initialisation
  const positions = useMemo(() => {
    const arr: number[] = [];
    // Génération des segments horizontaux
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
    // Génération des segments verticaux
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

  // Boucle d'animation exécutée à chaque frame (rafraîchissement de la scène)
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    // Récupère le tableau des positions des points de la grille
    const pos = mesh.current.geometry.attributes.position;
    // Parcours tous les sommets pour appliquer l'animation de vague et de puits
    for (let i = 0; i < pos.count; i += 2) {
      for (let j = 0; j < 2; j++) {
        // Coordonnées X/Y du sommet à animer
        const x = pos.getX(i + j);
        const y = pos.getY(i + j);

        // Calcul de la hauteur "vague" (superposition sinusoïdale animée dans le temps)
        const waveZ =
          Math.sin((x + clock.elapsedTime) * 1.5) +
          Math.cos((y + clock.elapsedTime) * 1.5);

        // Déformation locale de type "puits gravitationnel" centrée sur le pointeur souris
        let deformZ = 0;
        if (hover) {
          const dx = x - hover[0];
          const dy = y - hover[1];
          const distSq = dx * dx + dy * dy;
          // Profil en cloche gaussienne : effet maximal au centre, qui décroit rapidement
          deformZ = gravity * Math.exp(-distSq / (2 * 12 * 12));
        }

        // Application de la hauteur finale : onde globale + éventuelle déformation locale
        pos.setZ(i + j, waveZ * 0.4 + deformZ);
      }
    }
    // Indique à Three.js de mettre à jour la géométrie
    pos.needsUpdate = true;
  });

  // Rendu des lignes de la grille : segments, géométrie, et matériau
  return (
    <lineSegments ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color='#53A1FF' />
    </lineSegments>
  );
};

// Composant qui détecte la position sous la souris et convertit en coordonnées scène
const MouseTracker: React.FC<{
  setHover: (pt: [number, number] | null) => void;
}> = ({ setHover }) => {
  // Accès à la caméra et au canvas WebGL
  const { camera, gl } = useThree();

  useEffect(() => {
    // Raycaster pour projeter la souris sur le plan Z=0 (celui de la grille)
    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 0, 1), 0); // Plan Z=0

    // Handler appelé à chaque déplacement de la souris
    const handler = (event: PointerEvent) => {
      // Récupère la position du curseur relative au canvas
      const bounds = gl.domElement.getBoundingClientRect();
      // Conversion en coordonnées NDC (normalized device coordinates) pour WebGL
      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      // Crée un rayon depuis la caméra qui passe par le point de la souris dans la scène
      raycaster.setFromCamera(new Vector2(x, y), camera);
      const intersect = new Vector3();
      // Intersecte ce rayon avec le plan de la grille (Z=0)
      raycaster.ray.intersectPlane(plane, intersect);

      // Transmet la position de l'intersection (X, Y) à GridLines pour l'effet local
      setHover([intersect.x, intersect.y]);
    };

    // Reset le hover quand la souris quitte le canvas
    const clearHover = () => setHover(null);

    // Ajoute les listeners sur le canvas WebGL natif
    gl.domElement.addEventListener('pointermove', handler);
    gl.domElement.addEventListener('pointerout', clearHover);

    // Nettoyage des listeners à la destruction du composant
    return () => {
      gl.domElement.removeEventListener('pointermove', handler);
      gl.domElement.removeEventListener('pointerout', clearHover);
    };
  }, [camera, gl, setHover]);

  // Ce composant n'a pas de rendu visuel
  return null;
};

// Composant principal qui intègre la scène Canvas, la lumière et la grille interactive
const WaveGrid: React.FC<WaveGridProps> = ({ gravity }) => {
  // État : coordonnées courantes du hover souris dans la scène, ou null
  const [hover, setHover] = useState<[number, number] | null>(null);

  return (
    <Canvas
      camera={{ position: [0, -15, 20], fov: 60 }} // Caméra positionnée pour voir la grille en perspective
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
    >
      {/* Lumière d'ambiance douce pour éclairer la scène */}
      <ambientLight intensity={0.5} />
      {/* Composant utilitaire pour suivre le hover souris */}
      <MouseTracker setHover={setHover} />
      {/* Grille animée avec l'effet de puits interactif */}
      <GridLines hover={hover} gravity={gravity} />
    </Canvas>
  );
};

export default WaveGrid;
