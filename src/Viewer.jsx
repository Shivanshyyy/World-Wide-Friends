import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export default function Viewer({ onViewTreehouse }) {
{
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const center = new THREE.Vector3(-0.71, -11.67, 4.28);
    const initialCamPos = new THREE.Vector3(-6.81, -11.3, 13.24);
    const finalCamPos = center.clone();
    camera.position.copy(initialCamPos);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.copy(center);
    controls.update();

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const shouldLoadModel = false;

    if (shouldLoadModel) 
      {

    const loader = new GLTFLoader();
    const base = import.meta.env.BASE_URL;

    loader.load(
      `${base}modeel2.glb`, // ✅ dynamic, respects base path
      (gltf) => {
        scene.add(gltf.scene);
        console.log("Model loaded.");
      },
      undefined,
      (error) => {
        console.error("GLB load error:", error);
      }
    );
  }

    let frame = 0;
    const totalFrames = 100;
    const animate = () => {
      requestAnimationFrame(animate);
      if (frame < totalFrames) {
        camera.position.lerpVectors(initialCamPos, finalCamPos, frame / totalFrames);
        frame++;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />

      <button
        onClick={onViewTreehouse}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 16px",
          borderRadius: "10px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transition: "transform 0.2s",
        }}
      >
        View Treehouse
      </button>
    </>
  );
}
}
