import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { useTheme } from "next-themes";

export const PremiumBackground = ({ enable3d }: { enable3d: boolean }) => {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const { sparkleCount, maxDpr, sparkleSpeed, sparkleSize } = useMemo(() => {
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? null;
    const cores = navigator.hardwareConcurrency ?? null;
    const lowEnd =
      (typeof mem === "number" && mem > 0 && mem <= 4) || (typeof cores === "number" && cores > 0 && cores <= 4);
    const highEnd =
      (typeof mem === "number" && mem >= 12) || (typeof cores === "number" && cores >= 12);
    return {
      sparkleCount: lowEnd ? 36 : highEnd ? 72 : 54,
      maxDpr: lowEnd ? 1.1 : highEnd ? 1.35 : 1.25,
      sparkleSpeed: lowEnd ? 0.18 : 0.24,
      sparkleSize: lowEnd ? 1.0 : 1.15,
    };
  }, []);

  return (
    <div id="depth-root" aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-background" />
      {isLight ? (
        <>
          <div data-depth="bg" className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(79,70,229,0.20),transparent_58%)]" />
          <div data-depth="mid" className="absolute inset-0 bg-[radial-gradient(900px_circle_at_75%_20%,rgba(16,185,129,0.14),transparent_60%)]" />
          <div data-depth="fg" className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_85%,rgba(99,102,241,0.12),transparent_62%)]" />
          <div data-depth="fg" className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
        </>
      ) : (
        <>
          <div data-depth="bg" className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(79,70,229,0.35),transparent_55%)]" />
          <div data-depth="mid" className="absolute inset-0 bg-[radial-gradient(900px_circle_at_75%_20%,rgba(16,185,129,0.22),transparent_58%)]" />
          <div data-depth="fg" className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_85%,rgba(99,102,241,0.18),transparent_60%)]" />
          <div data-depth="fg" className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />
        </>
      )}

      {enable3d && (
        <div className="absolute inset-0 opacity-70">
          <Canvas
            dpr={[1, maxDpr]}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 6], fov: 45 }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.55} />
              <Sparkles
                count={sparkleCount}
                scale={[12, 8, 10]}
                size={sparkleSize}
                speed={sparkleSpeed}
                opacity={isLight ? 0.22 : 0.45}
                color={isLight ? "#4F46E5" : "#A5B4FC"}
              />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
};
