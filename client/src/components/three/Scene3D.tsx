import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with performance optimizations
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Disable antialiasing for better performance
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    mountRef.current.appendChild(renderer.domElement);

    // Create simplified geometric shapes with basic materials for better performance
    const geometry1 = new THREE.OctahedronGeometry(0.6);
    const geometry2 = new THREE.TetrahedronGeometry(0.4);

    // Use simpler MeshLambertMaterial instead of MeshPhysicalMaterial
    const material1 = new THREE.MeshLambertMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.7,
    });

    const material2 = new THREE.MeshLambertMaterial({
      color: 0x06B6D4,
      transparent: true,
      opacity: 0.6,
    });

    const mesh1 = new THREE.Mesh(geometry1, material1);
    const mesh2 = new THREE.Mesh(geometry2, material2);

    // Position meshes (reduced to 2 objects)
    mesh1.position.set(-2, 1, 0);
    mesh2.position.set(2, -1, 0);

    scene.add(mesh1, mesh2);

    // Simplified lighting - just ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    camera.position.z = 5;

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Optimized animation loop with reduced calculations
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Simpler rotation animations
      mesh1.rotation.x += 0.005;
      mesh1.rotation.y += 0.005;
      
      mesh2.rotation.x -= 0.004;
      mesh2.rotation.z += 0.006;

      // Simpler floating animation with less calculations
      const time = Date.now() * 0.001;
      mesh1.position.y = 1 + Math.sin(time) * 0.3;
      mesh2.position.y = -1 + Math.cos(time * 0.8) * 0.3;

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