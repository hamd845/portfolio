import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// WebGL optimized Three.js scene with vanilla implementation
class WebGLScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private models: THREE.Mesh[] = [];
  private animationId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
    this.camera.position.set(0, 0, 6);

    // Renderer setup with optimizations
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(canvas.width, canvas.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.setupLighting();
    this.createModels();
    this.animate();
  }

  private setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);

    // Point light
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = true;
    this.scene.add(pointLight);

    // Spot light
    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(-10, -10, -10);
    spotLight.angle = Math.PI / 8;
    spotLight.penumbra = 1;
    this.scene.add(spotLight);
  }

  private createModels() {
    const geometries = [
      new THREE.BoxGeometry(1.5, 1.5, 1.5),
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.ConeGeometry(1, 2, 8)
    ];

    const colors = [0x2563eb, 0x7c3aed, 0x06b6d4];
    const positions = [[-2, 0, 0], [0, 0, 0], [2, 0, 0]];

    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: colors[index],
        metalness: 0.7,
        roughness: 0.2
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(positions[index][0], positions[index][1], positions[index][2]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      this.models.push(mesh);
      this.scene.add(mesh);
    });
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    // Rotate models
    this.models.forEach(model => {
      model.rotation.y += 0.01;
      model.rotation.x += 0.005;
    });

    this.renderer.render(this.scene, this.camera);
  };

  public resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer.dispose();
    this.models.forEach(model => {
      model.geometry.dispose();
      if (model.material instanceof THREE.Material) {
        model.material.dispose();
      }
    });
  }
}

// Main 3D Scene Component with vanilla Three.js and WebGL optimization
export default function Scene3D({ visible = true }: { visible?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<WebGLScene | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check WebGL support
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglSupported(false);
      setIsLoading(false);
      return;
    }

    if (!visible || !canvasRef.current) return;

    try {
      // Initialize Three.js scene
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      sceneRef.current = new WebGLScene(canvas);
      setIsLoading(false);

      // Handle resize
      const handleResize = () => {
        if (sceneRef.current && canvas) {
          const rect = canvas.getBoundingClientRect();
          canvas.width = rect.width * window.devicePixelRatio;
          canvas.height = rect.height * window.devicePixelRatio;
          sceneRef.current.resize(canvas.width, canvas.height);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        if (sceneRef.current) {
          sceneRef.current.dispose();
        }
      };
    } catch (error) {
      console.warn('WebGL initialization failed:', error);
      setWebglSupported(false);
      setIsLoading(false);
    }
  }, [visible]);

  if (!visible || !webglSupported) {
    return (
      <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
        <div className="text-white/40 dark:text-gray-500 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-primary/40 rounded"></div>
          </div>
          <p className="text-sm">3D Preview</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full h-64 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 relative"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/60 dark:text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </motion.div>
  );
}