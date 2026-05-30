import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

type HeroCanvasProps = {
  scrollProgress: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function Scene({ scrollProgress }: HeroCanvasProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const bgRef = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  const bgTexture = useTexture("/hero-bg.jpeg");

  const cardMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0B1220"),
      roughness: 0.2,
      metalness: 0.15,
      transmission: 0.8,
      thickness: 0.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.65,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
    });
  }, []);

  const emissiveMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1A2544"),
      emissive: new THREE.Color("#4F46E5"),
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.28,
    });
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const pop = Math.min(t / 1.35, 1);
    const popEased = easeOutCubic(pop);
    const baseScale = THREE.MathUtils.lerp(1.1, 1.0, popEased);

    if (bgRef.current) {
      const floatY = Math.sin(t * 0.6) * 0.03;
      bgRef.current.scale.set(baseScale, baseScale, 1);
      bgRef.current.position.y = floatY - scrollProgress * 0.25;
    }

    if (groupRef.current) {
      const targetRotX = pointer.y * 0.08;
      const targetRotY = pointer.x * 0.12;
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 6, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 6, delta);
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, -scrollProgress * 0.35, 6, delta);
    }

    if (lightRef.current) {
      const lx = pointer.x * viewport.width * 0.35;
      const ly = pointer.y * viewport.height * 0.25;
      lightRef.current.position.x = THREE.MathUtils.damp(lightRef.current.position.x, lx, 8, delta);
      lightRef.current.position.y = THREE.MathUtils.damp(lightRef.current.position.y, ly + 1.2, 8, delta);
    }
  });

  return (
    <>
      <color attach="background" args={["#050712"]} />

      <ambientLight intensity={0.5} />
      <pointLight ref={lightRef} position={[0, 1.5, 2]} intensity={18} color={"#A7F3D0"} />
      <pointLight position={[2, 0.5, 3]} intensity={10} color={"#818CF8"} />

      <mesh ref={bgRef} position={[0, 0, -2.4]}>
        <planeGeometry args={[viewport.width * 1.2, viewport.height * 1.2]} />
        <meshBasicMaterial map={bgTexture} toneMapped={false} opacity={0.7} transparent />
      </mesh>

      <mesh position={[0, 0, -2.3]}>
        <planeGeometry args={[viewport.width * 1.3, viewport.height * 1.3]} />
        <meshBasicMaterial color={"#000000"} transparent opacity={0.42} />
      </mesh>

      <group ref={groupRef} position={[0, 0, 0]}>
        <Sparkles
          count={Math.round(90 + (1 - scrollProgress) * 120)}
          scale={[10, 7, 10]}
          size={1.4}
          speed={0.35}
          opacity={0.55}
          color={"#A5B4FC"}
        />

        <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.22}>
          <mesh material={cardMaterial} position={[0.85, 0.25, 0.4]} rotation={[0, -0.45, 0.05]}>
            <RoundedPlaneGeometry args={[1.9, 1.2, 0.12]} />
          </mesh>
          <mesh material={emissiveMaterial} position={[0.85, 0.25, 0.41]} rotation={[0, -0.45, 0.05]}>
            <RoundedPlaneGeometry args={[1.92, 1.22, 0.13]} />
          </mesh>
        </Float>

        <Float speed={0.9} rotationIntensity={0.14} floatIntensity={0.2}>
          <mesh material={cardMaterial} position={[-0.95, -0.1, 0.15]} rotation={[0, 0.5, -0.04]}>
            <RoundedPlaneGeometry args={[1.6, 1.05, 0.12]} />
          </mesh>
          <mesh material={emissiveMaterial} position={[-0.95, -0.1, 0.16]} rotation={[0, 0.5, -0.04]}>
            <RoundedPlaneGeometry args={[1.62, 1.07, 0.13]} />
          </mesh>
        </Float>

        <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.18}>
          <mesh material={cardMaterial} position={[0.05, -0.65, 0.05]} rotation={[0, -0.15, 0.02]}>
            <RoundedPlaneGeometry args={[2.1, 0.85, 0.12]} />
          </mesh>
        </Float>
      </group>
    </>
  );
}

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

export const HeroCanvas = ({ scrollProgress }: HeroCanvasProps) => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 3.6], fov: 45 }}
    >
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
};
