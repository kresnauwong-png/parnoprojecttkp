import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const RobotBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x111111, 2);
    scene.add(ambient);
    const frontLight = new THREE.DirectionalLight(0xffffff, 4);
    frontLight.position.set(0, 4, 5);
    scene.add(frontLight);

    const botGroup = new THREE.Group();
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0x0f0f12, metalness: 0.95, roughness: 0.08 });
    const neonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const coreGeo = new THREE.SphereGeometry(1.4, 32, 32);
    const coreMesh = new THREE.Mesh(coreGeo, chromeMat);
    botGroup.add(coreMesh);

    const visorGeo = new THREE.TorusGeometry(1.41, 0.08, 8, 40, Math.PI / 2);
    const visorMesh = new THREE.Mesh(visorGeo, neonMat);
    visorMesh.rotation.x = Math.PI / 2;
    visorMesh.rotation.z = -Math.PI / 4;
    botGroup.add(visorMesh);

    const ringGeo = new THREE.TorusGeometry(2.3, 0.04, 8, 60);
    const ringMesh = new THREE.Mesh(ringGeo, chromeMat);
    ringMesh.rotation.x = Math.PI / 3;
    botGroup.add(ringMesh);
    scene.add(botGroup);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      botGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.08;
      ringMesh.rotation.z += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 bg-[#050505] pointer-events-none" />;
};
export default RobotBackground;
