import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

type HeroCanvasProps = {
  scrollProgress: number | MotionValue<number>;
  isMobile: boolean;
  theme: "light" | "dark";
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function RoundedPlaneGeometry({ args }: { args: [number, number, number] }) {
  const [w, h, r] = args;
  const shape = useMemo(() => {
    const x = -w / 2;
    const y = -h / 2;
    const s = new THREE.Shape();
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }, [w, h, r]);

  const geometry = useMemo(() => {
    const g = new THREE.ShapeGeometry(shape, 24);
    g.computeVertexNormals();
    return g;
  }, [shape]);

  return <primitive object={geometry} attach="geometry" />;
}

function Scene({ scrollProgress, isMobile, theme }: HeroCanvasProps) {
  const isLight = theme === "light";
  const rootRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const nodeMeshRef = useRef<THREE.InstancedMesh>(null);
  const pulsePointsRef = useRef<THREE.Points>(null);
  const particlesNearRef = useRef<THREE.Points>(null);
  const particlesFarRef = useRef<THREE.Points>(null);
  const { viewport, pointer, camera } = useThree();

  const dims = useMemo(() => {
    return {
      w: viewport.width,
      h: viewport.height,
      zNear: -1.9,
      zFar: 0.6,
    };
  }, [viewport.width, viewport.height]);

  const nodeData = useMemo(() => {
    const nodeCount = isMobile ? 26 : 54;
    const maxDist = Math.max(0.85, dims.w * 0.34);
    const positions: THREE.Vector3[] = [];
    const seeds: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const r1 = Math.random();
      const r2 = Math.random();
      const r3 = Math.random();
      const x = THREE.MathUtils.lerp(-dims.w * 0.05, dims.w * 0.7, Math.pow(r1, 0.75));
      const y = THREE.MathUtils.lerp(-dims.h * 0.42, dims.h * 0.42, r2);
      const z = THREE.MathUtils.lerp(dims.zNear, dims.zFar, r3);
      positions.push(new THREE.Vector3(x, y, z));
      seeds.push(Math.random() * 1000);
    }

    const edges: Array<[number, number]> = [];
    for (let i = 0; i < nodeCount; i++) {
      const di: Array<{ j: number; d: number }> = [];
      for (let j = 0; j < nodeCount; j++) {
        if (i === j) continue;
        const d = positions[i].distanceTo(positions[j]);
        if (d < maxDist) di.push({ j, d });
      }
      di.sort((a, b) => a.d - b.d);
      for (let k = 0; k < Math.min(2, di.length); k++) {
        const j = di[k].j;
        const a = Math.min(i, j);
        const b = Math.max(i, j);
        edges.push([a, b]);
      }
    }

    const dedup = new Set<string>();
    const uniqueEdges: Array<[number, number]> = [];
    for (const [a, b] of edges) {
      const key = `${a}-${b}`;
      if (dedup.has(key)) continue;
      dedup.add(key);
      uniqueEdges.push([a, b]);
    }

    const linePositions = new Float32Array(uniqueEdges.length * 2 * 3);
    uniqueEdges.forEach(([a, b], idx) => {
      const pa = positions[a];
      const pb = positions[b];
      const o = idx * 6;
      linePositions[o + 0] = pa.x;
      linePositions[o + 1] = pa.y;
      linePositions[o + 2] = pa.z;
      linePositions[o + 3] = pb.x;
      linePositions[o + 4] = pb.y;
      linePositions[o + 5] = pb.z;
    });

    const pulseCount = isMobile ? 6 : 12;
    const pulseEdges = new Array(pulseCount).fill(0).map(() => {
      const edgeIndex = Math.floor(Math.random() * Math.max(1, uniqueEdges.length));
      return {
        edgeIndex,
        phase: Math.random(),
        speed: THREE.MathUtils.lerp(0.06, 0.14, Math.random()),
      };
    });

    const pulsePositions = new Float32Array(pulseEdges.length * 3);

    return {
      nodeCount,
      positions,
      seeds,
      edges: uniqueEdges,
      linePositions,
      pulseEdges,
      pulsePositions,
    };
  }, [dims.h, dims.w, dims.zFar, dims.zNear, isMobile]);

  const particlesNear = useMemo(() => {
    const count = isMobile ? 90 : 180;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const o = i * 3;
      pos[o + 0] = THREE.MathUtils.lerp(-dims.w * 0.65, dims.w * 0.75, Math.random());
      pos[o + 1] = THREE.MathUtils.lerp(-dims.h * 0.55, dims.h * 0.55, Math.random());
      pos[o + 2] = THREE.MathUtils.lerp(-0.9, 0.7, Math.random());
      seed[i] = Math.random() * 1000;
    }
    return { count, pos, seed };
  }, [dims.h, dims.w, isMobile]);

  const particlesFar = useMemo(() => {
    const count = isMobile ? 120 : 260;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const o = i * 3;
      pos[o + 0] = THREE.MathUtils.lerp(-dims.w * 0.8, dims.w * 0.85, Math.random());
      pos[o + 1] = THREE.MathUtils.lerp(-dims.h * 0.7, dims.h * 0.7, Math.random());
      pos[o + 2] = THREE.MathUtils.lerp(-2.2, -0.9, Math.random());
      seed[i] = Math.random() * 1000;
    }
    return { count, pos, seed };
  }, [dims.h, dims.w, isMobile]);

  const nodeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(isLight ? "#4F46E5" : "#A5B4FC"),
      emissive: new THREE.Color(isLight ? "#4F46E5" : "#A5B4FC"),
      emissiveIntensity: isLight ? 0.55 : 1.25,
      roughness: 0.2,
      metalness: 0,
      transparent: true,
      opacity: isLight ? 0.75 : 0.95,
    });
  }, [isLight]);

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(isLight ? "#4F46E5" : "#6D7CFF"),
      transparent: true,
      opacity: isLight ? 0.12 : 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [isLight]);

  const pulseMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: isMobile ? 0.06 : 0.08,
      color: new THREE.Color(isLight ? "#06B6D4" : "#67E8F9"),
      transparent: true,
      opacity: isLight ? 0.7 : 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, [isLight, isMobile]);

  const cardMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0B1220"),
      roughness: 0.25,
      metalness: 0.12,
      transmission: 0.75,
      thickness: 0.22,
      ior: 1.5,
      transparent: true,
      opacity: 0.55,
      clearcoat: 1,
      clearcoatRoughness: 0.25,
    });
  }, []);

  const emissiveMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0B1220"),
      emissive: new THREE.Color(isLight ? "#4F46E5" : "#6366F1"),
      emissiveIntensity: isLight ? 0.55 : 1.05,
      transparent: true,
      opacity: 0.22,
    });
  }, [isLight]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const pop = Math.min(t / 1.35, 1);
    const popEased = easeOutCubic(pop);
    const floatY = Math.sin(t * 0.6) * 0.04;
    const sp = typeof scrollProgress === "number" ? scrollProgress : scrollProgress.get();

    if (rootRef.current) {
      const targetRotX = pointer.y * 0.08;
      const targetRotY = pointer.x * 0.12;
      rootRef.current.rotation.x = THREE.MathUtils.damp(rootRef.current.rotation.x, targetRotX, 6, delta);
      rootRef.current.rotation.y = THREE.MathUtils.damp(rootRef.current.rotation.y, targetRotY, 6, delta);
      rootRef.current.position.y = THREE.MathUtils.damp(rootRef.current.position.y, floatY - sp * (isMobile ? 0.38 : 0.62), 6, delta);
      const baseScale = THREE.MathUtils.lerp(1.1, 1.0, popEased);
      rootRef.current.scale.set(baseScale, baseScale, 1);
    }

    if (lightRef.current) {
      const lx = pointer.x * viewport.width * 0.35;
      const ly = pointer.y * viewport.height * 0.25;
      lightRef.current.position.x = THREE.MathUtils.damp(lightRef.current.position.x, lx, 8, delta);
      lightRef.current.position.y = THREE.MathUtils.damp(lightRef.current.position.y, ly + 1.2, 8, delta);
    }

    const targetCamX = pointer.x * 0.18 + Math.sin(t * 0.12) * 0.08;
    const targetCamY = pointer.y * 0.12 + Math.sin(t * 0.1) * 0.05 + sp * 0.14;
    const targetCamZ = 3.6 + sp * 0.9;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 3.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 3.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 3.5, delta);
    camera.lookAt(0.2, 0, 0);

    const baseLineOpacity = isLight ? 0.1 : 0.14;
    const peakLineOpacity = isLight ? 0.32 : 0.38;
    lineMaterial.opacity = THREE.MathUtils.damp(lineMaterial.opacity, THREE.MathUtils.lerp(baseLineOpacity, peakLineOpacity, sp), 6, delta);
    const basePulseOpacity = isLight ? 0.65 : 0.9;
    pulseMaterial.opacity = THREE.MathUtils.damp(pulseMaterial.opacity, THREE.MathUtils.lerp(basePulseOpacity, basePulseOpacity + 0.18, sp), 6, delta);

    if (nodeMeshRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < nodeData.nodeCount; i++) {
        const p = nodeData.positions[i];
        const s = nodeData.seeds[i];
        const breathe = 1 + Math.sin(t * 0.8 + s) * 0.08;
        dummy.position.set(p.x, p.y, p.z);
        const scale = (isMobile ? 0.032 : 0.042) * breathe;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        nodeMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      nodeMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (pulsePointsRef.current) {
      const geom = pulsePointsRef.current.geometry as THREE.BufferGeometry;
      const attr = geom.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < nodeData.pulseEdges.length; i++) {
        const pulse = nodeData.pulseEdges[i];
        const base = pulse.edgeIndex * 6;
        const ax = nodeData.linePositions[base + 0];
        const ay = nodeData.linePositions[base + 1];
        const az = nodeData.linePositions[base + 2];
        const bx = nodeData.linePositions[base + 3];
        const by = nodeData.linePositions[base + 4];
        const bz = nodeData.linePositions[base + 5];
        const tt = (t * pulse.speed + pulse.phase) % 1;
        attr.setXYZ(i, THREE.MathUtils.lerp(ax, bx, tt), THREE.MathUtils.lerp(ay, by, tt), THREE.MathUtils.lerp(az, bz, tt));
      }
      attr.needsUpdate = true;
    }

    const updateParticles = (
      pts: THREE.Points | null,
      data: { count: number; pos: Float32Array; seed: Float32Array },
      amp: number,
      speed: number,
      scrollAmp: number,
    ) => {
      if (!pts) return;
      const geom = pts.geometry as THREE.BufferGeometry;
      const attr = geom.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < data.count; i++) {
        const o = i * 3;
        const baseX = data.pos[o + 0];
        const baseY = data.pos[o + 1];
        const baseZ = data.pos[o + 2];
        const s = data.seed[i];
        const dy = Math.sin(t * speed + s) * amp;
        const dx = Math.cos(t * (speed * 0.7) + s) * (amp * 0.6);
        attr.setXYZ(i, baseX + dx, baseY + dy - sp * scrollAmp, baseZ);
      }
      attr.needsUpdate = true;
    };

    updateParticles(particlesNearRef.current, particlesNear, 0.04, 0.22, isMobile ? 0.18 : 0.28);
    updateParticles(particlesFarRef.current, particlesFar, 0.07, 0.12, isMobile ? 0.12 : 0.22);
  });

  return (
    <>
      <color attach="background" args={[isLight ? "#F7F8FF" : "#050712"]} />
      <fog attach="fog" args={[isLight ? "#F7F8FF" : "#050712", 3.0, 8.0]} />

      <ambientLight intensity={isLight ? 0.9 : 0.6} />
      <pointLight ref={lightRef} position={[0, 1.8, 2]} intensity={isLight ? 7 : 14} color={isLight ? "#4F46E5" : "#67E8F9"} />
      <pointLight position={[2.2, 0.8, 3.2]} intensity={isLight ? 5 : 9} color={isLight ? "#06B6D4" : "#818CF8"} />
      <pointLight position={[-1.6, -1.2, 2.8]} intensity={isLight ? 4 : 7} color={isLight ? "#10B981" : "#A7F3D0"} />

      <group ref={rootRef} position={[0, 0, 0]}>
        <points ref={particlesFarRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={particlesFar.count} array={particlesFar.pos} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.012 : 0.016}
            color={isLight ? "#4F46E5" : "#A5B4FC"}
            transparent
            opacity={isLight ? 0.12 : 0.22}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        <points ref={particlesNearRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={particlesNear.count} array={particlesNear.pos} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.016 : 0.02}
            color={isLight ? "#06B6D4" : "#67E8F9"}
            transparent
            opacity={isLight ? 0.1 : 0.16}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        <lineSegments frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={nodeData.linePositions.length / 3} array={nodeData.linePositions} itemSize={3} />
          </bufferGeometry>
          <primitive object={lineMaterial} attach="material" />
        </lineSegments>

        <instancedMesh ref={nodeMeshRef} args={[undefined, undefined, nodeData.nodeCount]} frustumCulled={false}>
          <sphereGeometry args={[1, 18, 18]} />
          <primitive object={nodeMaterial} attach="material" />
        </instancedMesh>

        <points ref={pulsePointsRef} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={nodeData.pulseEdges.length} array={nodeData.pulsePositions} itemSize={3} />
          </bufferGeometry>
          <primitive object={pulseMaterial} attach="material" />
        </points>

        <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.22}>
          <mesh material={cardMaterial} position={[0.85, 0.25, 0.4]} rotation={[0, -0.45, 0.05]}>
            <RoundedPlaneGeometry args={[1.9, 1.2, 0.12]} />
          </mesh>
          <mesh material={emissiveMaterial} position={[0.85, 0.25, 0.41]} rotation={[0, -0.45, 0.05]}>
            <RoundedPlaneGeometry args={[1.92, 1.22, 0.13]} />
          </mesh>
        </Float>

        {!isMobile && (
          <Float speed={0.9} rotationIntensity={0.14} floatIntensity={0.2}>
            <mesh material={cardMaterial} position={[-0.95, -0.1, 0.15]} rotation={[0, 0.5, -0.04]}>
              <RoundedPlaneGeometry args={[1.6, 1.05, 0.12]} />
            </mesh>
            <mesh material={emissiveMaterial} position={[-0.95, -0.1, 0.16]} rotation={[0, 0.5, -0.04]}>
              <RoundedPlaneGeometry args={[1.62, 1.07, 0.13]} />
            </mesh>
          </Float>
        )}

        <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.18}>
          <mesh material={cardMaterial} position={[0.05, -0.65, 0.05]} rotation={[0, -0.15, 0.02]}>
            <RoundedPlaneGeometry args={[2.1, 0.85, 0.12]} />
          </mesh>
        </Float>
      </group>
    </>
  );
}

export const HeroCanvas = ({ scrollProgress, isMobile, theme }: HeroCanvasProps) => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 3.6], fov: 45 }}
    >
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} isMobile={isMobile} theme={theme} />
      </Suspense>
    </Canvas>
  );
};
