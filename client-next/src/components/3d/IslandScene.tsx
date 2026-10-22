"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";

function LandmarkPin({ position, title }: { position: [number, number, number]; title: string }) {
  return (
    <group position={position}>
      <mesh>
        <coneGeometry args={[0.15, 0.4, 16]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      <Html distanceFactor={10}>
        <div className="bg-black/80 text-white text-[10px] px-2 py-1 rounded-md border border-emerald-500 whitespace-nowrap">
          {title}
        </div>
      </Html>
    </group>
  );
}

export default function IslandScene() {
  return (
    <div className="w-full h-[500px] rounded-3xl overflow-hidden bg-slate-950 border border-zinc-800">
      <Canvas camera={{ position: [0, 4, 7], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[2.2, 1.8, 0.6, 32]} />
            <meshStandardMaterial color="#0a3224" roughness={0.6} flatShading />
          </mesh>
          <LandmarkPin position={[0, 0.8, 0.2]} title="Sigiriya Fortress" />
          <LandmarkPin position={[0.6, 0.4, -0.6]} title="Ella Nine Arch" />
        </Float>
        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.05} />
      </Canvas>
    </div>
  );
}