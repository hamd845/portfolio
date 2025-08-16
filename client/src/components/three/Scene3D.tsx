import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const geometry1 = new THREE.OctahedronGeometry(0.8);
    const geometry2 = new THREE.TetrahedronGeometry(0.6);
    const geometry3 = new THREE.IcosahedronGeometry(0.5);

    const material1 = new THREE.MeshPhysicalMaterial({
      color: 0x8B5CF6,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
    });

    const material2 = new THREE.MeshPhysicalMaterial({
      color: 0x06B6D4,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.7,
    });

    const material3 = new THREE.MeshPhysicalMaterial({
      color: 0x10B981,
      metalness: 0.7,
      roughness: 0.3,
      transparent: true,
      opacity: 0.6,
    });

    const mesh1 = new THREE.Mesh(geometry1, material1);
    const mesh2 = new THREE.Mesh(geometry2, material2);
    const mesh3 = new THREE.Mesh(geometry3, material3);

    // Position meshes
    mesh1.position.set(-2, 1, 0);
    mesh2.position.set(2, -1, 0);
    mesh3.position.set(0, 2, -1);

    scene.add(mesh1, mesh2, mesh3);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    const pointLight1 = new THREE.PointLight(0x8B5CF6, 1, 100);
    const pointLight2 = new THREE.PointLight(0x06B6D4, 1, 100);
    
    pointLight1.position.set(10, 10, 10);
    pointLight2.position.set(-10, -10, 10);
    
    scene.add(ambientLight, pointLight1, pointLight2);

    camera.position.z = 5;

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      mesh1.rotation.x += 0.01;
      mesh1.rotation.y += 0.01;
      
      mesh2.rotation.x -= 0.008;
      mesh2.rotation.z += 0.012;
      
      mesh3.rotation.y += 0.015;
      mesh3.rotation.z -= 0.005;

      // Floating animation
      mesh1.position.y = 1 + Math.sin(Date.now() * 0.001) * 0.5;
      mesh2.position.y = -1 + Math.cos(Date.now() * 0.0012) * 0.4;
      mesh3.position.x = Math.sin(Date.now() * 0.0008) * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.3;
      camera.lookAt(scene.position);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}