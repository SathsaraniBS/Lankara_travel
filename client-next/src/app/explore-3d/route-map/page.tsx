"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import TWEEN from "@tweenjs/tween.js";
import { MapPin, Clock, ArrowRight, Compass, ShieldCheck } from "lucide-react";

const routeStops = [
  {
    id: "kandy",
    name: "Kandy",
    subtitle: "Temple of the Sacred Tooth Relic",
    timeToNext: "2 hr 23 min (92 km)",
    desc: "Starting point in the cultural capital of Sri Lanka, home to the sacred tooth relic.",
    image: "/images/Kandy.jpg",
    pos: { x: -1.2, y: 0.5, z: -1.5 },
    color: 0xef4444,
  },
  {
    id: "dambulla",
    name: "Dambulla",
    subtitle: "Dambulla Cave Temple",
    timeToNext: "2 hr 4 min (72 km)",
    desc: "Midway stop featuring magnificent cave temples and ancient paintings.",
    image: "/images/sigiriya.jpg",
    pos: { x: 0, y: 0.2, z: 0 },
    color: 0x3b82f6,
  },
  {
    id: "sigiriya",
    name: "Sigiriya",
    subtitle: "Sigiriya Rock Fortress",
    timeToNext: "Destination Reached",
    desc: "Final destination, the iconic ancient rock fortress and palace complex.",
    image: "/images/ella.jpg",
    pos: { x: 1.2, y: -0.1, z: 1.5 },
    color: 0x10b981,
  },
];

export default function Route3DPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStop, setActiveStop] = useState(routeStops[0]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const pinsRef = useRef<THREE.Group[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x071318, 0.06);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 4, 6);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controlsRef.current = controls;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5ea, 1.2);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // 6. Terrain Base (Stylized island strip)
    const terrainGeo = new THREE.PlaneGeometry(6, 6, 32, 32);
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x0a261c,
      roughness: 0.8,
      wireframe: false,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -0.5;
    scene.add(terrain);

    // 7. Route Line (Curve connecting Kandy -> Dambulla -> Sigiriya)
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.2, 0.5, -1.5),
      new THREE.Vector3(0, 0.2, 0),
      new THREE.Vector3(1.2, -0.1, 1.5),
    ]);

    const points = curve.getPoints(50);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 4 });
    const routeLine = new THREE.Line(lineGeo, lineMat);
    scene.add(routeLine);

    // 8. Pins for each stop
    const newPins: THREE.Group[] = [];
    routeStops.forEach((stop) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(stop.pos.x, stop.pos.y, stop.pos.z);

      // Pin cone
      const coneGeo = new THREE.ConeGeometry(0.1, 0.3, 16);
      coneGeo.rotateX(Math.PI);
      const coneMat = new THREE.MeshStandardMaterial({ color: stop.color, roughness: 0.2 });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      pinGroup.add(cone);

      // Sphere top
      const sphereGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.y = 0.2;
      pinGroup.add(sphere);

      pinGroup.userData = stop;
      newPins.push(pinGroup);
      scene.add(pinGroup);
    });
    pinsRef.current = newPins;

    // Raycaster Click Handler
    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(newPins.map((p) => p.children[0]));

      if (intersects.length > 0) {
        const stopData = intersects[0].object.parent?.userData;
        if (stopData) {
          setActiveStop(stopData);
          focusCamera(stopData.pos);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointerdown", handlePointerDown);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      TWEEN.update();
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointerdown", handlePointerDown);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const focusCamera = (targetPos: { x: number; y: number; z: number }) => {
    if (!cameraRef.current || !controlsRef.current) return;

    new TWEEN.Tween(cameraRef.current.position)
      .to({ x: targetPos.x, y: targetPos.y + 2, z: targetPos.z + 2.5 }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    new TWEEN.Tween(controlsRef.current.target)
      .to({ x: targetPos.x, y: targetPos.y, z: targetPos.z }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  };

  return (
    <div className="bg-[#071318] text-gray-100 min-h-screen flex flex-col justify-between font-sans">
      
      {/* Header */}
      <header className="w-full bg-[#0b1920]/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between fixed top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-950 font-serif font-bold text-emerald-400 text-sm">
            SL
          </div>
          <span className="font-serif font-bold text-lg text-white">
            Lankara Travels <span className="text-xs text-sky-400 font-sans ml-2 px-2 py-0.5 rounded-full bg-sky-950 border border-sky-800">3D Route Transfer</span>
          </span>
        </div>
        <Link href="/explore-3d" className="text-xs text-zinc-300 hover:text-emerald-400 transition">
          ← Back to 3D Explorer
        </Link>
      </header>

      {/* Main Workspace */}
      <main className="relative w-full h-screen pt-16 flex flex-col lg:flex-row items-stretch">
        
        {/* 3D Canvas */}
        <div ref={containerRef} className="relative flex-1 h-[60vh] lg:h-full bg-gradient-to-b from-[#050e12] via-[#081820] to-[#040b0e]">
          <div className="absolute top-6 left-6 z-10 pointer-events-none space-y-1">
            <span className="text-sky-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
              🛺 Tuk-Tuk Transfer Route
            </span>
            <h2 className="text-2xl font-serif font-bold text-white">Kandy → Sigiriya 3D Experience</h2>
            <p className="text-xs text-zinc-400">Click on 3D pins to explore stops along the journey</p>
          </div>

          {/* Bottom Route Progression Bar */}
          <div className="absolute bottom-6 left-6 right-6 lg:right-auto z-10 bg-[#0c1e27]/90 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 flex items-center gap-4">
            {routeStops.map((stop, idx) => (
              <button
                key={stop.id}
                onClick={() => {
                  setActiveStop(stop);
                  focusCamera(stop.pos);
                }}
                className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer ${
                  activeStop.id === stop.id ? "bg-emerald-600 text-white shadow-lg" : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-[10px]">{idx + 1}</span>
                {stop.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Details Panel */}
        <aside className="w-full lg:w-[400px] bg-[#0b1920] border-t lg:border-t-0 lg:border-l border-zinc-800 p-6 flex flex-col justify-between space-y-6 z-20">
          <div className="space-y-4">
            <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-zinc-800">
              <Image src={activeStop.image} alt={activeStop.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                {activeStop.name} Stop
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-white">{activeStop.name}</h3>
              <p className="text-xs text-amber-400 font-medium">{activeStop.subtitle}</p>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">{activeStop.desc}</p>

            <div className="bg-[#11242f] p-4 rounded-2xl border border-zinc-800 flex items-center gap-3 text-xs">
              <Clock className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Next Segment Drive Time</span>
                <span className="font-bold text-white">{activeStop.timeToNext}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-zinc-800">
            <Link
              href="/planning-a-trip"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-2xl transition shadow-lg text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              Book This Tuk-Tuk Transfer →
            </Link>
            <p className="text-[10px] text-zinc-500 text-center">More than just a transfer... it's a journey through Sri Lanka!</p>
          </div>
        </aside>

      </main>
    </div>
  );
}