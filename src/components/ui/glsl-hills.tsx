"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface GLSLHillsProps {
  width?: string;
  height?: string;
  cameraZ?: number;
  planeSize?: number;
  speed?: number;
}

// vPosition is scaled (xz * 0.35) before passing to the fragment shader so that
// length(vPosition) stays within the opacity formula's visible range (<96 units).
// The fragment shader itself is kept exactly as specified.
const vertexShader = `
precision highp float;
#define GLSLIFY 1

uniform float time;
uniform float speed;
varying vec3 vPosition;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

void main() {
  vec3 pos = position;
  float t = time * speed;

  float hill = fbm(vec2(pos.x * 0.014 + t * 0.25, pos.z * 0.014 + t * 0.18)) * 38.0;
  hill += sin(pos.x * 0.018 + t * 0.4) * 7.0;
  hill += cos(pos.z * 0.022 + t * 0.28) * 5.0;

  pos.y = hill - 8.0;

  // Scale xz so length(vPosition) stays within the fragment shader's opacity range
  vPosition = vec3(pos.x * 0.35, pos.y, pos.z * 0.35);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
precision highp float;
#define GLSLIFY 1
varying vec3 vPosition;

void main(void) {
  float opacity = (96.0 - length(vPosition)) / 256.0 * 0.45;

  float heightFactor = clamp(vPosition.y / 40.0, 0.0, 1.0);

  vec3 baseColor = vec3(0.169, 0.102, 0.180);
  vec3 midColor  = vec3(0.122, 0.180, 0.153);
  vec3 peakColor = vec3(0.78,  0.631, 0.353);

  vec3 color = mix(baseColor, midColor, smoothstep(0.0, 0.5, heightFactor));
  color = mix(color, peakColor, smoothstep(0.5, 1.0, heightFactor));

  gl_FragColor = vec4(color, opacity);
}
`;

export default function GLSLHills({
  width = "100%",
  height = "100%",
  cameraZ = 140,
  planeSize = 256,
  speed = 0.3,
}: GLSLHillsProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId: number;
    let renderer: THREE.WebGLRenderer;

    const init = (w: number, h: number) => {
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 2000);
      camera.position.set(0, 45, cameraZ);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0x0e0e10, 0);

      // Make canvas fill the container
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      container.appendChild(renderer.domElement);

      const segments = 160;
      const geometry = new THREE.PlaneGeometry(planeSize, planeSize, segments, segments);
      geometry.rotateX(-Math.PI / 2);

      const uniforms = {
        time:  { value: 0 },
        speed: { value: speed },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const clock = new THREE.Clock();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        uniforms.time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
      };
      animate();

      // Resize observer — reliable sizing after layout
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: rw, height: rh } = entry.contentRect;
          if (rw > 0 && rh > 0) {
            camera.aspect = rw / rh;
            camera.updateProjectionMatrix();
            renderer.setSize(rw, rh);
          }
        }
      });
      ro.observe(container);

      return () => {
        ro.disconnect();
        cancelAnimationFrame(animId);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    // Defer init until the container has real dimensions
    let cleanup: (() => void) | undefined;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          ro.disconnect();
          cleanup = init(w, h);
        }
      }
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      cleanup?.();
    };
  }, [cameraZ, planeSize, speed]);

  return (
    <div
      ref={mountRef}
      style={{ width, height, position: "relative" }}
      className="pointer-events-none"
    />
  );
}
