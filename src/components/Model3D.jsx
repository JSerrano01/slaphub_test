// components/Model3D.jsx
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Model3D() {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Escena
    const scene = new THREE.Scene();
    scene.background = null;

    // Cámara
    const camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 2, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;
    controls.target.set(0, 0.5, 0);

    // Modelo
    const loader = new GLTFLoader();
    loader.load(
      "/models/soda_can_2.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(5, 5, 5);
        model.position.set(0, 1, 0);
        scene.add(model);

        if (location.pathname === "/") {
          // Animaciones de scroll solo en home
          gsap.timeline({
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          })
            .to(camera.position, { x: 2, y: 3, z: 6, ease: "power1.inOut" })
            .to(camera.position, { x: -3, y: 2, z: 4, ease: "power1.inOut" })
            .to(model.rotation, { y: Math.PI, ease: "power1.inOut" }, "<");
        } else if (location.pathname === "/about") {
          gsap.to(camera.position, { x: 0, y: 2, z: 8, duration: 1 });
        } else if (location.pathname === "/products") {
          gsap.to(camera.position, { x: 5, y: 4, z: 5, duration: 1 });
        }
      },
      undefined,
      (error) => console.error("Error al cargar el modelo:", error)
    );

    // Resize
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-pink-200 to-green-300 z-0" />
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-10" />
    </div>
  );
}
