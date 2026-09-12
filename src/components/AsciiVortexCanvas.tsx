import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface AsciiVortexCanvasProps {
  scrollProgress?: number;
  className?: string;
  intensity?: number;
  videoOverlay?: boolean;
}

const CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ':', '/', '\\', '+', '-', '*', '#', '%'];

export const AsciiVortexCanvas: React.FC<AsciiVortexCanvasProps> = ({
  scrollProgress = 0,
  className = '',
  videoOverlay = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particleMode, setParticleMode] = useState<'standard' | 'high' | 'eco'>('standard');
  const [interactive, setInteractive] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  const scrollRef = useRef<number>(0);
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const createCharTextureAtlas = useCallback(() => {
    const atlasSize = 512;
    const canvas = document.createElement('canvas');
    canvas.width = atlasSize;
    canvas.height = atlasSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, atlasSize, atlasSize);

    const cols = 5;
    const rows = 4;
    const cellW = atlasSize / cols;
    const cellH = atlasSize / rows;

    ctx.font = 'bold 64px "IBM Plex Mono", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';

    CHARS.forEach((char, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * cellW + cellW / 2;
      const y = row * cellH + cellH / 2;
      ctx.fillText(char, x, y);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return { texture, cols, rows };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Determine particle count based on screen width and mode
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    
    let count = 4000;
    if (particleMode === 'eco' || width < 640) {
      count = 1200;
    } else if (particleMode === 'high' && width > 1200) {
      count = 7200;
    } else {
      count = width < 1024 ? 2200 : 4200;
    }

    if (isReducedMotion) {
      count = Math.min(count, 800);
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0018);

    const camera = new THREE.PerspectiveCamera(65, width / height, 1, 3000);
    camera.position.z = 800;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, videoOverlay ? 0.3 : 1);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const atlasData = createCharTextureAtlas();
    if (!atlasData) return;

    // Create BufferGeometry for instanced vortex particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const charIndices = new Float32Array(count);
    const scales = new Float32Array(count);
    const angles = new Float32Array(count);
    const radiuses = new Float32Array(count);
    const speeds = new Float32Array(count);
    const opacities = new Float32Array(count);

    const vortexLength = 2200;
    const baseRadius = 240;

    for (let i = 0; i < count; i++) {
      // Cylindrical/funnel distribution
      const zProgress = Math.random(); // 0 (near camera) to 1 (deep in vortex)
      const z = -zProgress * vortexLength + 600;

      // Logarithmic funnel: tight in the center, flared at entry
      const funnelFactor = Math.pow(zProgress, 1.4);
      const radius = baseRadius * (0.15 + funnelFactor * 2.8) + (Math.random() - 0.5) * 80;
      const angle = Math.random() * Math.PI * 2;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      angles[i] = angle;
      radiuses[i] = radius;
      // Closer to center = rotates faster (conservation of angular momentum)
      speeds[i] = (0.2 + 0.8 / (radius * 0.005 + 1)) * (Math.random() * 0.4 + 0.8);

      charIndices[i] = Math.floor(Math.random() * CHARS.length);
      scales[i] = 16 + Math.random() * 16;
      opacities[i] = 0.2 + Math.random() * 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aCharIndex', new THREE.BufferAttribute(charIndices, 1));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

    // Custom Shader Material to sample Atlas
    const vertexShader = `
      attribute float aCharIndex;
      attribute float aScale;
      attribute float aOpacity;
      varying float vCharIndex;
      varying float vOpacity;
      varying float vDist;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScroll;

      void main() {
        vCharIndex = aCharIndex;
        vOpacity = aOpacity;

        vec3 pos = position;

        // Subtle mouse deflection
        vec2 dir = pos.xy - uMouse * 450.0;
        float dist = length(dir);
        if (dist < 320.0 && dist > 1.0) {
          float force = (1.0 - dist / 320.0) * 45.0;
          pos.xy += (dir / dist) * force;
        }

        // Scroll compression effect
        pos.xy *= 1.0 - (uScroll * 0.35);
        pos.z += uScroll * 400.0;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Distance attenuation
        gl_PointSize = aScale * (650.0 / -mvPosition.z);
        gl_PointSize = clamp(gl_PointSize, 4.0, 48.0);
        vDist = -mvPosition.z;
      }
    `;

    const fragmentShader = `
      uniform sampler2D uAtlas;
      uniform float uCols;
      uniform float uRows;
      varying float vCharIndex;
      varying float vOpacity;
      varying float vDist;

      void main() {
        // Compute UV offset for the character tile
        float idx = floor(vCharIndex);
        float col = mod(idx, uCols);
        float row = floor(idx / uCols);

        vec2 uv = gl_PointCoord;
        vec2 atlasUV = vec2(
          (col + uv.x) / uCols,
          1.0 - ((row + (1.0 - uv.y)) / uRows)
        );

        vec4 texColor = texture2D(uAtlas, atlasUV);
        if (texColor.r < 0.1) discard;

        // Distance fog fade
        float depthAlpha = smoothstep(2200.0, 300.0, vDist);
        
        // Crisp high-tech monochrome with slight glow
        vec3 finalColor = vec3(1.0, 1.0, 1.0);
        gl_FragColor = vec4(finalColor, texColor.r * vOpacity * depthAlpha);
      }
    `;

    const uniforms = {
      uAtlas: { value: atlasData.texture },
      uCols: { value: atlasData.cols },
      uRows: { value: atlasData.rows },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Smooth mouse inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      uniforms.uTime.value = time;
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      uniforms.uScroll.value = scrollRef.current;

      const posArray = geometry.attributes.position.array as Float32Array;

      const speedMultiplier = isReducedMotion ? 0.2 : 1.0;
      const scrollSpeedBoost = 1.0 + scrollRef.current * 2.5;

      for (let i = 0; i < count; i++) {
        // Vortex rotational animation
        let angle = angles[i];
        const spd = speeds[i] * delta * 0.6 * speedMultiplier * scrollSpeedBoost;
        angle += spd;
        angles[i] = angle;

        // Flow towards camera along Z
        let z = posArray[i * 3 + 2];
        const forwardSpeed = (120 + speeds[i] * 60) * delta * speedMultiplier * scrollSpeedBoost;
        z += forwardSpeed;

        // If particle passes camera, recycle to the deep back of vortex
        if (z > 700) {
          z = -vortexLength + 400 + Math.random() * 200;
          angles[i] = Math.random() * Math.PI * 2;
        }
        posArray[i * 3 + 2] = z;

        // Update radius based on updated z position
        const currentProgress = THREE.MathUtils.clamp((600 - z) / vortexLength, 0, 1);
        const funnel = Math.pow(currentProgress, 1.3);
        const r = baseRadius * (0.18 + funnel * 2.6);

        posArray[i * 3] = Math.cos(angle) * r;
        posArray[i * 3 + 1] = Math.sin(angle) * r;
      }

      geometry.attributes.position.needsUpdate = true;

      // Subtle camera pan following mouse
      camera.position.x += (mouseRef.current.x * 60 - camera.position.x) * 0.04;
      camera.position.y += (mouseRef.current.y * 60 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, -400);

      // Camera slight roll with scroll
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, scrollRef.current * 0.35, 0.05);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      atlasData.texture.dispose();
      renderer.dispose();
    };
  }, [particleMode, interactive, isReducedMotion, createCharTextureAtlas, videoOverlay]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div ref={containerRef} className="w-full h-full cursor-crosshair" />

      {/* Subtle UI Telemetry indicator at bottom left */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 text-[10px] font-mono-tech tracking-widest text-neutral-500 uppercase pointer-events-auto select-none bg-black/70 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-sm">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ASCII VORTEX // GL_PARTICLES
        </span>
        <span className="text-white/20">|</span>
        <div className="flex items-center gap-1 text-[9px]">
          <button
            type="button"
            onClick={() => setParticleMode('eco')}
            className={`px-1.5 py-0.5 rounded-xs transition-colors ${
              particleMode === 'eco' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            ECO
          </button>
          <button
            type="button"
            onClick={() => setParticleMode('standard')}
            className={`px-1.5 py-0.5 rounded-xs transition-colors ${
              particleMode === 'standard' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            STD
          </button>
          <button
            type="button"
            onClick={() => setParticleMode('high')}
            className={`px-1.5 py-0.5 rounded-xs transition-colors ${
              particleMode === 'high' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            MAX
          </button>
        </div>
        <span className="text-white/20">|</span>
        <button
          type="button"
          onClick={() => setInteractive(!interactive)}
          className={`text-[9px] hover:underline ${interactive ? 'text-white' : 'text-neutral-500 line-through'}`}
          title="Toggle cursor repulsion"
        >
          {interactive ? 'INERTIA ON' : 'INERTIA OFF'}
        </button>
      </div>
    </div>
  );
};
