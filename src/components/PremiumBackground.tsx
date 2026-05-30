import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Suspense } from "react";

export const PremiumBackground = ({ enable3d }: { enable3d: boolean }) => {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#050712]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(79,70,229,0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_75%_20%,rgba(16,185,129,0.22),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_85%,rgba(99,102,241,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />

      {enable3d && (
        <div className="absolute inset-0 opacity-70">
          <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 6], fov: 45 }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.55} />
              <Sparkles count={120} scale={[12, 8, 10]} size={1.2} speed={0.28} opacity={0.45} color={"#A5B4FC"} />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
};
