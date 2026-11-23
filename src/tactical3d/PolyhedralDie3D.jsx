import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function createDieGeometry(sides, radius = 0.86) {
  switch (Number(sides)) {
    case 4:
      return new THREE.TetrahedronGeometry(radius * 1.12);
    case 6:
      return new THREE.BoxGeometry(radius * 1.36, radius * 1.36, radius * 1.36);
    case 8:
      return new THREE.OctahedronGeometry(radius * 1.05);
    case 10: {
      // 10-sided pentagonal bipyramid (two 5-sided cones joined at equator)
      const geo = new THREE.ConeGeometry(radius * 0.98, radius * 1.02, 5, 1, false);
      const pos = geo.attributes.position;
      const arr = [];
      for (let i = 0; i < pos.count; i++) {
        arr.push(pos.getX(i), pos.getY(i) + radius * 0.51, pos.getZ(i));
      }
      const lower = new THREE.ConeGeometry(radius * 0.98, radius * 1.02, 5, 1, false);
      lower.rotateX(Math.PI);
      const lPos = lower.attributes.position;
      for (let i = 0; i < lPos.count; i++) {
        arr.push(lPos.getX(i), lPos.getY(i) - radius * 0.51, lPos.getZ(i));
      }
      const merged = new THREE.BufferGeometry();
      merged.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
      merged.computeVertexNormals();
      geo.dispose();
      lower.dispose();
      return merged;
    }
    case 12:
      return new THREE.DodecahedronGeometry(radius * 0.96);
    case 20:
    default:
      return new THREE.IcosahedronGeometry(radius);
  }
}

function SvgFallbackPoly({ sides = 20, stroke = "#38bdf8", size = 64 }) {
  const s = Number(sides);
  let pts = "50,6 92,28 92,72 50,94 8,72 8,28";
  if (s === 4) pts = "50,10 90,85 10,85";
  else if (s === 6) pts = "18,18 82,18 82,82 18,82";
  else if (s === 8) pts = "50,6 92,50 50,94 8,50";
  else if (s === 10) pts = "50,6 88,38 74,88 26,88 12,38";
  else if (s === 12) pts = "50,6 86,22 92,62 68,92 32,92 8,62 14,22";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <polygon points={pts} fill="#142033" stroke={stroke} strokeWidth="3.5" />
    </svg>
  );
}

/**
 * Single shared Three.js WebGL stage rendering 1 or more polyhedral dice (d4, d6, d8, d10, d12, d20).
 */
export default function PolyhedralDiceStage3D({
  dice = [{ sides: 20, value: 20, bodyColor: "#172554", edgeColor: "#38bdf8" }],
  rolling = true,
  dieSize = 86,
  gap = 12,
}) {
  const mountRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [tickNums, setTickNums] = useState(() =>
    dice.map((d) => 1 + Math.floor(Math.random() * (d.sides || 20)))
  );

  const diceKey = useMemo(
    () => dice.map((d) => `${d.sides}:${d.value}:${d.edgeColor || ""}`).join("|"),
    [dice]
  );

  // Number flicker while rolling
  useEffect(() => {
    if (!rolling) {
      setTickNums(dice.map((d) => d.value));
      return undefined;
    }
    const iv = setInterval(() => {
      setTickNums(dice.map((d) => 1 + Math.floor(Math.random() * (d.sides || 20))));
    }, 60);
    return () => clearInterval(iv);
  }, [rolling, diceKey]);

  const count = Math.max(1, dice.length);
  const stageWidth = Math.min(400, count * dieSize + Math.max(0, count - 1) * gap);
  const stageHeight = dieSize + 10;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    let renderer;
    let frameId = 0;
    const disposables = [];

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(stageWidth, stageHeight);
      container.innerHTML = "";
      container.appendChild(renderer.domElement);
    } catch {
      setWebglFailed(true);
      return undefined;
    }

    const scene = new THREE.Scene();
    const aspect = stageWidth / stageHeight;
    const frustumH = 2.4;
    const frustumW = frustumH * aspect;
    const camera = new THREE.OrthographicCamera(
      -frustumW / 2,
      frustumW / 2,
      frustumH / 2,
      -frustumH / 2,
      0.1,
      50
    );
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    // Three-point dramatic tabletop lighting
    const ambient = new THREE.AmbientLight(0xdbeafe, 0.85);
    const keyLight = new THREE.DirectionalLight(0xfef08a, 1.85);
    keyLight.position.set(3.5, 4.5, 6);
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.35);
    rimLight.position.set(-4, -3, 3.5);
    scene.add(ambient, keyLight, rimLight);

    const spacing = Math.min(2.1, (frustumW * 0.84) / count);
    const dieScale = count > 3 ? 0.72 : count > 1 ? 0.86 : 1.0;

    const meshes = dice.map((d, idx) => {
      const group = new THREE.Group();
      const offsetX = (idx - (count - 1) / 2) * spacing;
      group.position.set(offsetX, 0, 0);
      group.scale.setScalar(dieScale);

      const geo = createDieGeometry(d.sides || 20, 0.88);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(d.bodyColor || "#172554"),
        metalness: 0.42,
        roughness: 0.24,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const edgeGeo = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(d.edgeColor || "#38bdf8"),
        transparent: true,
        opacity: 0.92,
      });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);

      group.add(mesh, edges);
      scene.add(group);
      disposables.push(geo, mat, edgeGeo, edgeMat);

      return {
        group,
        vx: (idx % 2 === 0 ? 1 : -1) * (0.14 + (idx % 3) * 0.03),
        vy: 0.19 + (idx % 2) * 0.04,
        vz: (idx % 2 === 0 ? -1 : 1) * 0.09,
        phase: idx * 1.1,
      };
    });

    const startTime = performance.now();
    const animate = (now) => {
      const t = (now - startTime) * 0.001;
      for (const m of meshes) {
        if (rolling) {
          m.group.rotation.x += m.vx;
          m.group.rotation.y += m.vy;
          m.group.rotation.z += m.vz;
          m.group.position.y = Math.sin(t * 11 + m.phase) * 0.14;
        } else {
          // Smoothly ease to a clean hero-facing orientation
          m.group.rotation.x += (0.28 - m.group.rotation.x) * 0.16;
          m.group.rotation.y += (0.35 + Math.sin(t * 1.8 + m.phase) * 0.14 - m.group.rotation.y) * 0.14;
          m.group.rotation.z += (0 - m.group.rotation.z) * 0.16;
          m.group.position.y += (0 - m.group.position.y) * 0.18;
        }
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      for (const res of disposables) res.dispose?.();
      renderer.dispose?.();
    };
  }, [diceKey, rolling, stageWidth, stageHeight, count]);

  return (
    <div
      style={{
        position: "relative",
        width: stageWidth,
        height: stageHeight,
        margin: "0 auto",
      }}
    >
      {!webglFailed && (
        <div
          ref={mountRef}
          style={{ width: stageWidth, height: stageHeight, pointerEvents: "none" }}
        />
      )}

      {/* Crisp Number Overlay Aligned Over Each 3D Die */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap,
          pointerEvents: "none",
        }}
      >
        {dice.map((d, idx) => {
          const val = rolling ? tickNums[idx] : d.value;
          const isMax = !rolling && Number(val) === Number(d.sides);
          const isMin = !rolling && Number(val) === 1 && Number(d.sides) === 20;
          return (
            <div
              key={idx}
              style={{
                width: dieSize,
                height: dieSize,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {webglFailed && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SvgFallbackPoly sides={d.sides} stroke={d.edgeColor || "#38bdf8"} size={dieSize * 0.85} />
                </div>
              )}
              <span
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: count > 3 ? 19 : count > 1 ? 23 : 30,
                  fontWeight: 900,
                  color: rolling ? "#e2e8f0" : isMax ? "#fde047" : isMin ? "#f87171" : "#ffffff",
                  textShadow: "0 2px 8px rgba(0,0,0,0.95), 0 0 10px rgba(15,23,42,0.9)",
                }}
              >
                {val}
              </span>
              {!rolling && d.tag && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -2,
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#cbd5e1",
                    background: "rgba(15,23,42,0.88)",
                    padding: "0px 5px",
                    borderRadius: 4,
                    border: "1px solid rgba(148,163,184,0.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.tag}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
