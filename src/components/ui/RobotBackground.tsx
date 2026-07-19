import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RobotBackgroundProps {
  triggerZoom: boolean;
  onZoomComplete: () => void;
  isIntroMode: boolean;
}

const RobotBackground: React.FC<RobotBackgroundProps> = ({ triggerZoom, onZoomComplete, isIntroMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const triggerZoomRef = useRef(triggerZoom);
  const isIntroModeRef = useRef(isIntroMode);

  useEffect(() => { triggerZoomRef.current = triggerZoom; }, [triggerZoom]);
  useEffect(() => { isIntroModeRef.current = isIntroMode; }, [isIntroMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#020617');
    scene.fog = new THREE.FogExp2('#020617', 0.02);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 4, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Cyber Lighting System ---
    scene.add(new THREE.AmbientLight('#1e293b', 1.5));
    const cyanLight = new THREE.PointLight('#00f0ff', 4, 30);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight('#bd00ff', 4, 30);
    purpleLight.position.set(-5, 3, 5);
    scene.add(purpleLight);

    // --- Cyber Grid Floor ---
    const grid = new THREE.GridHelper(100, 40, '#00f0ff', '#1e293b');
    grid.position.y = -6;
    scene.add(grid);

    // --- ROBOTIC CYBER EAGLE STRUCTURE ---
    const eagle = new THREE.Group();

    // Material Chrome Logam & Neon Wireframe
    const metalMaterial = new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.1, metalness: 0.9 });
    const neonCyanMat = new THREE.MeshBasicMaterial({ color: '#00f0ff', wireframe: true });
    const neonPurpleMat = new THREE.MeshBasicMaterial({ color: '#bd00ff', wireframe: true });

    // 1. Badan Elang (Polygonal Futuristic Capsule)
    const bodyGeom = new THREE.CylinderGeometry(0.8, 1.4, 3.5, 5);
    const body = new THREE.Mesh(bodyGeom, metalMaterial);
    const bodyWire = new THREE.Mesh(bodyGeom, neonPurpleMat);
    bodyWire.scale.setScalar(1.02);
    body.add(bodyWire);
    eagle.add(body);

    // 2. Kepala & Paruh Tajam Elang
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 2.4, 0.3);
    
    const headGeom = new THREE.ConeGeometry(0.7, 1.2, 4);
    headGeom.rotateX(Math.PI / 2.5);
    const head = new THREE.Mesh(headGeom, metalMaterial);
    const beakGeom = new THREE.ConeGeometry(0.4, 1.0, 4);
    beakGeom.rotateX(Math.PI / 1.8);
    const beak = new THREE.Mesh(beakGeom, new THREE.MeshStandardMaterial({ color: '#00f0ff', metalness: 0.9 }));
    beak.position.set(0, -0.2, 0.8);

    // Mata Laser Bersinar
    const eyeGeom = new THREE.SphereGeometry(0.12, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: '#00f0ff' });
    const leftEye = new THREE.Mesh(eyeGeom, eyeMat); leftEye.position.set(-0.4, 0.2, 0.4);
    const rightEye = new THREE.Mesh(eyeGeom, eyeMat); rightEye.position.set(0.4, 0.2, 0.4);

    headGroup.add(head, beak, leftEye, rightEye);
    eagle.add(headGroup);

    // 3. Sistem Sayap Siber Mekanis (Mengepak Lebar)
    const leftWing = new THREE.Group(); leftWing.position.set(-1.2, 0.8, 0);
    const rightWing = new THREE.Group(); rightWing.position.set(1.2, 0.8, 0);

    const wingShape = new THREE.ConeGeometry(0.8, 6, 4);
    wingShape.rotateZ(Math.PI / 2);

    const lWingMesh = new THREE.Mesh(wingShape, metalMaterial);
    const lWingWire = new THREE.Mesh(wingShape, neonCyanMat);
    lWingWire.scale.setScalar(1.05); lWingMesh.add(lWingWire);
    lWingMesh.position.x = -2.8; leftWing.add(lWingMesh);

    const rWingMesh = new THREE.Mesh(wingShape, metalMaterial);
    const rWingWire = new THREE.Mesh(wingShape, neonCyanMat);
    rWingWire.scale.setScalar(1.05); rWingMesh.add(rWingWire);
    rWingMesh.position.x = 2.8; rightWing.add(rWingMesh);

    eagle.add(leftWing, rightWing);
    scene.add(eagle);

    // --- Game Loop Animasi ---
    let animId: number;
    let progress = 0;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const time = clock.getElapsedTime();

      // Efek Kepakan Sayap Lebar Realistis
      leftWing.rotation.z = Math.sin(time * 4) * 0.4;
      leftWing.rotation.y = Math.cos(time * 2) * 0.1;
      rightWing.rotation.z = -Math.sin(time * 4) * 0.4;
      rightWing.rotation.y = -Math.cos(time * 2) * 0.1;

      // Efek Terbang Mengambang Siber & Rotasi Standby
      eagle.position.y = Math.sin(time * 1.5) * 0.4;
      eagle.rotation.y = Math.sin(time * 0.5) * 0.15;

      // Logika Transisi Kamera Mengintai Mata Elang
      if (triggerZoomRef.current) {
        progress += 0.025;
        if (progress >= 1) {
          progress = 1;
          triggerZoomRef.current = false;
          onZoomComplete();
        }
        const ease = progress * progress;
        camera.position.x = THREE.MathUtils.lerp(0, 0, ease);
        camera.position.y = THREE.MathUtils.lerp(4, 1.2, ease);
        camera.position.z = THREE.MathUtils.lerp(18, 3.8, ease);
        camera.lookAt(0, 0.5, 0);
      } else {
        if (isIntroModeRef.current) {
          camera.position.set(0, 2, 14);
          camera.lookAt(0, 0, 0);
        } else {
          // Kamera menjauh sinematik ke atas saat di dashboard luar
          camera.position.set(0, 25, 35);
          camera.lookAt(0, 0, 0);
        }
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    const resize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [onZoomComplete]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
};

export default RobotBackground;

