"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import TWEEN from "@tweenjs/tween.js";

const destinations = [
  {
    id: "sigiriya",
    name: "Sigiriya Rock Fortress",
    province: "Central Province",
    temp: "☀️ 29°C",
    season: "Jan – April",
    elevation: "349m ASL",
    desc: "An ancient palace and fortress complex featuring a massive column of rock nearly 200 meters high. Renowned for its ancient frescoes and Lion Staircase.",
    highlights: ["Ancient Frescoes Painting", "Mirror Wall & Water Gardens", "Panoramic 360° Hill Views"],
    pos: { x: 0, y: 0.8, z: 0.2 },
    color: 0x10b981,
  },
  {
    id: "ella",
    name: "Ella Nine Arch Bridge",
    province: "Uva Province",
    temp: "🌤️ 22°C",
    season: "Year Round",
    elevation: "1,041m ASL",
    desc: "Nestled in Sri Lanka's central highlands, Ella is famous for sweeping tea estate valleys, Nine Arch Bridge, and epic hiking trails.",
    highlights: ["Nine Arch Demodara Bridge", "Little Adam's Peak Trek", "Ravana Waterfalls"],
    pos: { x: 0.6, y: 0.4, z: -0.6 },
    color: 0xf59e0b,
  },
  {
    id: "galle",
    name: "Galle Dutch Fort",
    province: "Southern Province",
    temp: "☀️ 30°C",
    season: "Nov – April",
    elevation: "Coastal",
    desc: "A UNESCO World Heritage site built by the Portuguese and fortified by the Dutch. Known for ancient colonial ramparts, cobblestone streets, and lighthouse views.",
    highlights: ["Historical Galle Lighthouse", "Dutch Colonial Architecture", "Sunset Wall Walks"],
    pos: { x: -0.7, y: -0.8, z: 0.8 },
    color: 0x3b82f6,
  },
];

export default function Explore3DPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // UI State refs for changing destination details dynamically
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const tempRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const seasonRef = useRef<HTMLParagraphElement>(null);
  const elevationRef = useRef<HTMLParagraphElement>(null);
  const highlightsRef = useRef<HTMLUListElement>(null);
  
  const btnDayRef = useRef<HTMLButtonElement>(null);
  const btnSunsetRef = useRef<HTMLButtonElement>(null);
  const btnNightRef = useRef<HTMLButtonElement>(null);

  // Three.js instances ref
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const islandMeshRef = useRef<THREE.Mesh | null>(null);
  const pinsRef = useRef<THREE.Group[]>([]);
  const lightsRef = useRef<{ ambient: THREE.AmbientLight; dir: THREE.DirectionalLight } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x071318, 0.08);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 4, 7);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 12;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5ea, 1.2);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    lightsRef.current = { ambient: ambientLight, dir: dirLight };

    // 6. Island Terrain Model
    const islandGeo = new THREE.CylinderGeometry(2.2, 1.8, 0.6, 32);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0x0a3224,
      roughness: 0.6,
      metalness: 0.1,
      flatShading: true,
    });
    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandMesh.position.y = -0.3;
    islandMesh.receiveShadow = true;
    scene.add(islandMesh);
    islandMeshRef.current = islandMesh;

    // Ocean Ring
    const waterGeo = new THREE.RingGeometry(2.3, 5, 32);
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x082e38, roughness: 0.1, transparent: true, opacity: 0.85 });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -0.58;
    scene.add(waterMesh);

    // 7. Hotspot Pins
    const newPins: THREE.Group[] = [];
    destinations.forEach((dest) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(dest.pos.x, dest.pos.y, dest.pos.z);

      const pinGeo = new THREE.ConeGeometry(0.12, 0.35, 16);
      pinGeo.rotateX(Math.PI);
      const pinMat = new THREE.MeshStandardMaterial({ color: dest.color, roughness: 0.2, metalness: 0.5 });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.castShadow = true;
      pinGroup.add(pinMesh);

      const sphereGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.position.y = 0.22;
      pinGroup.add(sphereMesh);

      pinGroup.userData = dest;
      newPins.push(pinGroup);
      scene.add(pinGroup);
    });
    pinsRef.current = newPins;

    // 8. Raycaster Interaction (Click on Pins)
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
        const dest = intersects[0].object.parent?.userData;
        if (dest) {
          updateUI(dest);
          focusCamera(dest.pos);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointerdown", handlePointerDown);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      TWEEN.update();
      controls.update();

      if (islandMeshRef.current) {
        islandMeshRef.current.rotation.y += 0.0015;
        pinsRef.current.forEach((pin, index) => {
          pin.position.y = destinations[index].pos.y + Math.sin(elapsedTime * 2 + index) * 0.05;
        });
      }

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
      .to({ x: targetPos.x * 2, y: targetPos.y + 2.5, z: targetPos.z * 2 + 3 }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    new TWEEN.Tween(controlsRef.current.target)
      .to({ x: targetPos.x, y: targetPos.y, z: targetPos.z }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  };

  const updateUI = (dest: typeof destinations[0]) => {
    if (titleRef.current) titleRef.current.innerText = dest.name;
    if (badgeRef.current) badgeRef.current.innerText = dest.province;
    if (tempRef.current) tempRef.current.innerText = dest.temp;
    if (descRef.current) descRef.current.innerText = dest.desc;
    if (seasonRef.current) seasonRef.current.innerText = dest.season;
    if (elevationRef.current) elevationRef.current.innerText = dest.elevation;

    if (highlightsRef.current) {
      highlightsRef.current.innerHTML = dest.highlights.map((h) => `<li class="flex items-center gap-2">✔ ${h}</li>`).join("");
    }
  };

  const setLighting = (mode: "day" | "sunset" | "night") => {
    if (!lightsRef.current || !sceneRef.current) return;
    const { ambient, dir } = lightsRef.current;

    // Reset buttons style
    [btnDayRef, btnSunsetRef, btnNightRef].forEach((ref) => {
      if (ref.current) ref.current.className = "px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white transition";
    });

    if (mode === "day") {
      if (btnDayRef.current) btnDayRef.current.className = "px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-semibold transition";
      ambient.intensity = 0.7;
      dir.intensity = 1.2;
      dir.color.setHex(0xfff5ea);
      if (sceneRef.current.fog) sceneRef.current.fog.color.setHex(0x071318);
    } else if (mode === "sunset") {
      if (btnSunsetRef.current) btnSunsetRef.current.className = "px-3 py-1.5 rounded-xl bg-amber-600 text-white font-semibold transition";
      ambient.intensity = 0.4;
      dir.intensity = 1.5;
      dir.color.setHex(0xff6b35);
      if (sceneRef.current.fog) sceneRef.current.fog.color.setHex(0x1a0a0f);
    } else if (mode === "night") {
      if (btnNightRef.current) btnNightRef.current.className = "px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold transition";
      ambient.intensity = 0.15;
      dir.intensity = 0.3;
      dir.color.setHex(0x4a72b0);
      if (sceneRef.current.fog) sceneRef.current.fog.color.setHex(0x030708);
    }
  };

  return (
    <div className="bg-[#071318] text-gray-100 min-h-screen overflow-x-hidden flex flex-col justify-between font-sans">
      
      {/* Header */}
      <header className="w-full bg-[#0b1920]/90 backdrop-blur-md border-b border-zinc-800/80 px-6 py-4 flex items-center justify-between fixed top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-950 font-serif font-bold text-emerald-400 text-sm">
            SL
          </div>
          <span className="font-serif font-bold text-lg tracking-wider text-white">
            Lankara Travels{" "}
            <span className="text-xs font-sans text-emerald-400 font-normal px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 ml-2">
              3D Experience
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <Link href="/dashboard" className="text-zinc-300 hover:text-emerald-400 transition">
            Back to Dashboard
          </Link>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full transition shadow-lg font-semibold cursor-pointer">
            Book Destination
          </button>
        </div>
      </header>

      {/* Main 3D Workspace */}
      <main className="relative w-full h-screen pt-16 flex flex-col lg:flex-row items-stretch">
        
        {/* 3D Canvas Container */}
        <div ref={containerRef} className="relative flex-1 h-[60vh] lg:h-full bg-gradient-to-b from-[#050e12] via-[#081820] to-[#040b0e]">
          
          {/* Overlay text */}
          <div className="absolute top-6 left-6 z-10 pointer-events-none space-y-1">
            <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Real-time WebGL Renderer
            </span>
            <h2 className="text-2xl font-serif font-bold text-white drop-shadow-md">Interactive Island Explorer</h2>
            <p className="text-xs text-zinc-400">Drag to rotate • Scroll to zoom • Click hotspots to view landmark details</p>
          </div>

          {/* Time of Day Control Buttons */}
          <div className="absolute bottom-6 left-6 z-10 bg-[#0c1e27]/80 backdrop-blur-md p-2 rounded-2xl border border-zinc-800/80 flex items-center gap-2 text-xs">
            <span className="text-zinc-400 text-[11px] px-2 font-medium">Lighting Mode:</span>
            <button ref={btnDayRef} onClick={() => setLighting("day")} className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-semibold transition cursor-pointer">
              Daylight
            </button>
            <button ref={btnSunsetRef} onClick={() => setLighting("sunset")} className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer">
              Sunset
            </button>
            <button ref={btnNightRef} onClick={() => setLighting("night")} className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer">
              Night
            </button>
          </div>
        </div>

        {/* Right Sidebar Info Panel */}
        <aside className="w-full lg:w-96 bg-[#0b1920] border-t lg:border-t-0 lg:border-l border-zinc-800 p-6 flex flex-col justify-between space-y-6 z-20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span ref={badgeRef} className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Central Province
              </span>
              <span ref={tempRef} className="text-amber-400 text-xs font-bold flex items-center gap-1">
                ☀️ 29°C
              </span>
            </div>

            <h1 ref={titleRef} className="text-3xl font-serif font-bold text-white">Sigiriya Rock Fortress</h1>
            <p ref={descRef} className="text-xs text-zinc-300 leading-relaxed">
              An ancient palace and fortress complex featuring a massive column of rock nearly 200 meters high. Renowned for its ancient frescoes and Lion Staircase.
            </p>

            {/* Landmark Stats */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-[#11242f] p-3 rounded-2xl border border-zinc-800/80 space-y-0.5">
                <span className="text-zinc-400 text-[10px]">Best Season</span>
                <p ref={seasonRef} className="font-bold text-white">Jan – April</p>
              </div>
              <div className="bg-[#11242f] p-3 rounded-2xl border border-zinc-800/80 space-y-0.5">
                <span className="text-zinc-400 text-[10px]">Elevation</span>
                {/* FIXED: changed ref="elevationRef" to ref={elevationRef} */}
                <p ref={elevationRef} className="font-bold text-white">349m ASL</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-zinc-200">Featured Highlights</h4>
              <ul ref={highlightsRef} className="space-y-1.5 text-xs text-zinc-400">
                <li className="flex items-center gap-2">✔ Ancient Frescoes Painting</li>
                <li className="flex items-center gap-2">✔ Mirror Wall & Water Gardens</li>
                <li className="flex items-center gap-2">✔ Panoramic 360° Hill Views</li>
              </ul>
            </div>
          </div>

          {/* Action Footer */}
          <div className="space-y-3 pt-4 border-t border-zinc-800">
            <Link href="/planning-a-trip" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-2xl transition shadow-lg text-xs flex items-center justify-center gap-2 cursor-pointer">
              Plan Trip to This Destination →
            </Link>
            <p className="text-[10px] text-zinc-500 text-center">Interactive 3D preview powered by Three.js & WebGL</p>
          </div>
        </aside>

      </main>
    </div>
  );
}