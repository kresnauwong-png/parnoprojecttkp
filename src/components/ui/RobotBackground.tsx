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

  // Sinkronisasi ref agar tidak memicu re-render useEffect Three.js secara agresif
  useEffect(() => {
    triggerZoomRef.current = triggerZoom;
  }, [triggerZoom]);

  useEffect(() => {
    isIntroModeRef.current = isIntroMode;
  }, [isIntroMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#020617');
    scene.fog = new THREE.FogExp2('#020617', 0.015);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 25);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight('#22d3ee', 2.5);
    mainLight.position.set(10, 20, 15);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight('#a855f7', 1.5);
    fillLight.position.set(-10, -5, -10);
    scene.add(fillLight);

    // 5. Grid Floor
    const gridHelper = new THREE.GridHelper(200, 50, '#334155', '#1e293b');
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // 6. Cyber Eagle Model Assembly
    const eagleGroup = new THREE.Group();

    // Body
    const bodyGeo = new THREE.ConeGeometry(2, 6, 4);
    bodyGeo.rotateX(Math.PI / 2);
    const bodyMat = new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.2, metalness: 0.8, flatShading: true });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    eagleGroup.add(body);

    // Cyber Eye
    const eyeGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: '#06b6d4' });
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(0, 0.5, 3);
    eagleGroup.add(eye);

    // Wings Container
    const leftWingGroup = new THREE.Group();
    leftWingGroup.position.set(-1.8, 0, 0);
    const rightWingGroup = new THREE.Group();
    rightWingGroup.position.set(1.8, 0, 0);

    const wingGeo = new THREE.BoxGeometry(6, 0.1, 2);
    const wingMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.3, metalness: 0.7, wireframe: true });

    const leftWingMesh = new THREE.Mesh(wingGeo, wingMat);
    leftWingMesh.position.x = -3;
    leftWingGroup.add(leftWingMesh);

    const rightWingMesh = new THREE.Mesh(wingGeo, wingMat);
    rightWingMesh.position.x = 3;
    rightWingGroup.add(rightWingMesh);

    eagleGroup.add(leftWingGroup);
    eagleGroup.add(rightWingGroup);

    // Perch
    const logGeo = new THREE.CylinderGeometry(0.8, 0.8, 10, 8);
    logGeo.rotateZ(Math.PI / 2);
    const logMat = new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.9 });
    const logMesh = new THREE.Mesh(logGeo, logMat);
    logMesh.position.set(0, -3.5, 0);
    scene.add(logMesh);

    scene.add(eagleGroup);

    // 7. Animation & Zoom Math Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let zoomProgress = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Flapping wing animation
      const wingFlap = Math.sin(elapsedTime * 3) * 0.15;
      leftWingMesh.rotation.z = wingFlap;
      rightWingMesh.rotation.z = -wingFlap;
      eagleGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.2;

      // Hyper-Zoom Transition Logic
      if (triggerZoomRef.current) {
        zoomProgress += 0.025;

        if (zoomProgress >= 1) {
          zoomProgress = 1;
          triggerZoomRef.current = false;
          onZoomComplete();
        }

        const easeT = zoomProgress * zoomProgress * zoomProgress;
        camera.position.x = THREE.MathUtils.lerp(0, 0, easeT);
        camera.position.y = THREE.MathUtils.lerp(5, 0.5, easeT);
        camera.position.z = THREE.MathUtils.lerp(25, 3.5, easeT);
        camera.lookAt(0, 0.5, 3);
      } else {
        if (isIntroModeRef.current) {
          camera.position.set(0, 5, 25);
          camera.lookAt(0, 0, 0);
        } else {
          camera.position.set(0, 40, 50);
          camera.lookAt(0, 0, 0);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onZoomComplete]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
};

export default RobotBackground;
