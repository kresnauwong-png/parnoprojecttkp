import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RobotBackgroundProps {
  triggerZoom?: boolean;
  onZoomComplete?: () => void;
  isIntroMode?: boolean;
}

const RobotBackground: React.FC<RobotBackgroundProps> = ({ 
  triggerZoom = false, 
  onZoomComplete,
  isIntroMode = true 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const eagleRef = useRef<THREE.Group | null>(null);
  const leftWingRef = useRef<THREE.Mesh | null>(null);
  const rightWingRef = useRef<THREE.Mesh | null>(null);
  const isZoomingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // --- 1. Scene & Camera Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 6); // Kamera fokus menatap elang
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 2. Lighting ---
    const ambient = new THREE.AmbientLight(0x0f172a, 2.5);
    scene.add(ambient);
    const cyanLight = new THREE.PointLight(0x06b6d4, 6, 50);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    // --- 3. Batang Pohon Tegak (Mirip Referensi Foto) ---
    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.3, 5, 10);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(0, -2.2, 0); // Berdiri tegak di bawah elang
    scene.add(trunk);

    // --- 4. Objek 3D Elang Cyber Gahar ---
    const eagle = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.15 });
    const neonMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 }); // Mata Menyala Cyan

    // Badan Elang
    const bodyGeo = new THREE.ConeGeometry(0.4, 1.3, 5);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.x = Math.PI / 6;
    eagle.add(body);

    // Kepala Elang
    const headGeo = new THREE.SphereGeometry(0.3, 10, 10);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.position.set(0, 0.6, 0.3);
    eagle.add(head);

    // Mata Elang (Titik Target Zooming)
    const eyeGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const leftEye = new THREE.Mesh(eyeGeo, neonMat);
    leftEye.position.set(-0.13, 0.68, 0.52);
    const rightEye = new THREE.Mesh(eyeGeo, neonMat);
    rightEye.position.set(0.13, 0.68, 0.52);
    eagle.add(leftEye);
    eagle.add(rightEye);

    // Sayap Kiri Lebar
    const wingGeo = new THREE.BoxGeometry(1.6, 0.04, 0.7);
    const leftWing = new THREE.Mesh(wingGeo, bodyMat);
    // Pindahkan pivot ke ujung sayap agar engsel kepakan natural
    leftWing.geometry.translate(-0.8, 0, 0);
    leftWing.position.set(-0.3, 0.4, 0);
    eagle.add(leftWing);
    leftWingRef.current = leftWing;

    // Sayap Kanan Lebar
    const rightWing = new THREE.Mesh(wingGeo, bodyMat);
    rightWing.geometry.translate(0.8, 0, 0);
    rightWing.position.set(0.3, 0.4, 0);
    eagle.add(rightWing);
    rightWingRef.current = rightWing;

    // Posisikan elang pas hinggap di atas ujung batang pohon
    eagle.position.set(0, 0.3, 0);
    scene.add(eagle);
    eagleRef.current = eagle;

    // --- 5. Loop Animasi ---
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.03;

      if (isIntroMode || triggerZoom) {
        // Mode Awal/Intro: Elang hinggap tegak sambil terus mengepakkan sayapnya lebar-lebar dengan gagah
        if (leftWing && rightWing) {
          leftWing.rotation.z = Math.sin(time * 5) * 0.35;
          rightWing.rotation.z = -Math.sin(time * 5) * 0.35;
        }
        // Efek napas naik turun halus di batang pohon
        eagle.position.y = 0.3 + Math.sin(time * 2) * 0.03;
      } else {
        // Mode saat halaman terbuka: Sayap melipat tenang, elang bernapas rileks
        if (leftWing && rightWing) {
          leftWing.rotation.z += (0.1 - leftWing.rotation.z) * 0.05;
          rightWing.rotation.z += (-0.1 - rightWing.rotation.z) * 0.05;
        }
        eagle.position.y = 0.3 + Math.sin(time * 1) * 0.01;
      }

      // Aksi Zoom Menembus Mata Kanan Elang pas dipicu
      if (isZoomingRef.current && camera) {
        camera.position.x += (0.13 - camera.position.x) * 0.1;
        camera.position.y += (0.98 - camera.position.y) * 0.1;
        camera.position.z += (0.7 - camera.position.z) * 0.1;
        
        // Jika kamera sudah menembus/sangat dekat dengan kornea mata
        if (camera.position.z <= 0.9) {
          isZoomingRef.current = false;
          if (onZoomComplete) onZoomComplete();
        }
      }

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
  }, [onZoomComplete, isIntroMode, triggerZoom]);

  useEffect(() => {
    if (triggerZoom) {
      isZoomingRef.current = true;
    }
  }, [triggerZoom]);

  return <div ref={containerRef} className="fixed inset-0 z-0 bg-[#020617] pointer-events-none" />;
};

export default RobotBackground;

    // Sayap Kiri
    const wingGeo = new THREE.BoxGeometry(1.5, 0.05, 0.6);
    const leftWing = new THREE.Mesh(wingGeo, bodyMat);
    leftWing.position.set(-0.8, 0.3, 0);
    eagle.add(leftWing);
    leftWingRef.current = leftWing;

    // Sayap Kanan
    const rightWing = new THREE.Mesh(wingGeo, bodyMat);
    rightWing.position.set(0.8, 0.3, 0);
    eagle.add(rightWing);
    rightWingRef.current = rightWing;

    // Set posisi awal elang di langit (terbang)
    eagle.position.set(-3, 4, -2);
    scene.add(eagle);
    eagleRef.current = eagle;

    // --- 5. Animasi Loop ---
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.02;

      // Logika Transisi Terbang -> Mendarat di Ranting
      if (eagle.position.y > -0.3) {
        // Efek turun mendarat perlahan
        eagle.position.x += (0 - eagle.position.x) * 0.02;
        eagle.position.y += (-0.3 - eagle.position.y) * 0.02;
        eagle.position.z += (0.5 - eagle.position.z) * 0.02;

        // Mengepakkan sayap cepat saat terbang bebas
        if (leftWing && rightWing) {
          leftWing.rotation.z = Math.sin(time * 10) * 0.4;
          rightWing.rotation.z = -Math.sin(time * 10) * 0.4;
        }
      } else {
        // Sudah mendarat di ranting: Elang sedikit bernapas tenang
        eagle.position.y = -0.3 + Math.sin(time * 2) * 0.02;
        
        // Sayap melipat santai
        if (leftWing && rightWing) {
          leftWing.rotation.z += (0.2 - leftWing.rotation.z) * 0.05;
          rightWing.rotation.z += (-0.2 - rightWing.rotation.z) * 0.05;
        }
      }

      // Jalankan Efek Zoom ke Mata Kanan Elang jika dipicu tombol Beranda
      if (isZoomingRef.current && camera) {
        camera.position.x += (0.15 - camera.position.x) * 0.08;
        camera.position.y += (0.5 - camera.position.y) * 0.08;
        camera.position.z += (1.4 - camera.position.z) * 0.08;
        
        // Cek jika jarak kamera sudah sangat dekat ke mata
        if (camera.position.z <= 1.5) {
          isZoomingRef.current = false;
          if (onZoomComplete) onZoomComplete();
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Responsive window
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
  }, [onZoomComplete]);

  // Pantau perubahan triggerZoom dari komponen luar
  useEffect(() => {
    if (triggerZoom) {
      isZoomingRef.current = true;
    } else if (cameraRef.current) {
      // Kembalikan posisi kamera normal jika tidak sedang di-zoom
      cameraRef.current.position.set(0, 2, 7);
    }
  }, [triggerZoom]);

  return <div ref={containerRef} className="fixed inset-0 z-0 bg-[#020617] pointer-events-none" />;
};

export default RobotBackground;
