"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import { CHAPTERS, CITIES, LEGS, PALETTE, computeTimeline } from "@/lib/journey/chapters";
import { faceQuaternion, greatCircleArc, latLngToVector3 } from "@/lib/journey/geo";
import { makeGlowTexture, makePetalTexture } from "./textures";

const R = 2; // globe radius
const SEGMENTS = 160;

// Camera distances (from globe centre). Close = "focus in on the place",
// far = pull back over the arc between places.
const CAM_NEAR = 3.5;
const CAM_FAR_LAND = 5.6;
const CAM_FAR_OCEAN = 8.8;

type Props = { progress: MutableRefObject<number> };

const ease = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

const TEX = "/media/journey";

/** Invert a grayscale texture (ocean-specular → land-roughness). Same-origin, so canvas is clean. */
function invert(tex: THREE.Texture): THREE.Texture {
  const img = tex.image as HTMLImageElement;
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, c.width, c.height);
  for (let i = 0; i < data.data.length; i += 4) {
    data.data[i] = 255 - data.data[i];
    data.data[i + 1] = 255 - data.data[i + 1];
    data.data[i + 2] = 255 - data.data[i + 2];
  }
  ctx.putImageData(data, 0, 0);
  const out = new THREE.CanvasTexture(c);
  out.colorSpace = THREE.NoColorSpace;
  return out;
}

export default function SceneContent({ progress }: Props) {
  const globe = useRef<THREE.Group>(null);
  const camera = useThree((s) => s.camera);

  // High-def Earth textures.
  const [dayMap, nightMap, normalMap, specMap, starMap] = useLoader(TextureLoader, [
    `${TEX}/earth_day.jpg`,
    `${TEX}/earth_night.jpg`,
    `${TEX}/earth_normal.jpg`,
    `${TEX}/earth_specular.jpg`,
    `${TEX}/stars.jpg`,
  ]);

  const roughMap = useMemo(() => invert(specMap), [specMap]);

  useMemo(() => {
    for (const t of [dayMap, nightMap, starMap]) t.colorSpace = THREE.SRGBColorSpace;
    normalMap.colorSpace = THREE.NoColorSpace;
    for (const t of [dayMap, nightMap, normalMap, specMap, roughMap]) t.anisotropy = 8;
  }, [dayMap, nightMap, normalMap, specMap, starMap, roughMap]);

  const { focus } = useMemo(() => computeTimeline(), []);

  const targetQuats = useMemo(
    () => CHAPTERS.map((c) => faceQuaternion(latLngToVector3(c.city.lat, c.city.lng, R))),
    [],
  );

  const legArcs = useMemo(
    () =>
      LEGS.map((leg) => {
        const pts = greatCircleArc(leg.from, leg.to, R * 1.004, leg.height, SEGMENTS);
        const geom = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(
          geom,
          new THREE.LineBasicMaterial({ color: leg.color, transparent: true, opacity: 0.95 }),
        );
        return { geom, line, count: pts.length, leg };
      }),
    [],
  );

  const threadLine = useMemo(() => {
    const pts = greatCircleArc(CITIES.austin, CITIES.durham, R * 1.004, 0.08, 80);
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new THREE.Line(
      geom,
      new THREE.LineDashedMaterial({ color: PALETTE.blush, transparent: true, opacity: 0.6, dashSize: 0.05, gapSize: 0.045 }),
    );
    line.computeLineDistances();
    return line;
  }, []);

  const glowBlush = useMemo(() => makeGlowTexture(PALETTE.blush), []);
  const glowGold = useMemo(() => makeGlowTexture(PALETTE.goldWarm), []);
  const petalTex = useMemo(() => makePetalTexture(PALETTE.petal), []);

  // City markers, built imperatively so we can fade each one in/out per frame.
  // A marker only glows while the story is AT its place (plus the story-linked
  // beats below) — no persistent dots, no spoiling places you haven't reached.
  const markerObjs = useMemo(() => {
    // Chapter indices during which each city's marker should be lit.
    const windows: Record<string, number[]> = {
      [CITIES.austin.name]: [0, 1, 2, 5], // opening, apart, merge, "bought a house"
      [CITIES.durham.name]: [1, 2], // apart + its path merging at Houston
      [CITIES.houston.name]: [2, 4], // merge + home again
      [CITIES.kyoto.name]: [3],
      [CITIES.sorrento.name]: [6],
    };
    const built: {
      group: THREE.Group;
      coreMat: THREE.MeshBasicMaterial;
      spriteMat: THREE.SpriteMaterial;
      indices: number[];
    }[] = [];
    const seen = new Set<string>();
    for (const c of CHAPTERS) {
      if (seen.has(c.city.name)) continue;
      seen.add(c.city.name);
      const group = new THREE.Group();
      group.position.copy(latLngToVector3(c.city.lat, c.city.lng, R * 1.008));
      const coreMat = new THREE.MeshBasicMaterial({ color: PALETTE.ivory, transparent: true, opacity: 0 });
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 16), coreMat);
      const spriteMat = new THREE.SpriteMaterial({
        map: c.city.name === CITIES.durham.name ? glowBlush : glowGold,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.setScalar(0.14);
      group.add(core, sprite);
      built.push({ group, coreMat, spriteMat, indices: windows[c.city.name] ?? [] });
    }
    return built;
  }, [glowBlush, glowGold]);

  const petalField = useMemo(() => {
    const base = latLngToVector3(CITIES.kyoto.lat, CITIES.kyoto.lng, R);
    const up = base.clone().normalize();
    const tangent = new THREE.Vector3(0, 1, 0).cross(up).normalize();
    const bitangent = up.clone().cross(tangent).normalize();
    const N = 130;
    const positions = new Float32Array(N * 3);
    const seeds: number[] = [];
    for (let i = 0; i < N; i++) {
      const a = i * 2.399963;
      const rad = 0.3 + (i / N) * 0.85;
      const p = base
        .clone()
        .addScaledVector(tangent, Math.cos(a) * rad)
        .addScaledVector(bitangent, Math.sin(a) * rad)
        .addScaledVector(up, 0.12 + (i / N) * 0.8);
      positions.set([p.x, p.y, p.z], i * 3);
      seeds.push(a);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geom, up, tangent, bitangent, base, seeds };
  }, []);

  const petalRef = useRef<THREE.Points>(null);
  const finaleRef = useRef<THREE.Sprite>(null);
  const homeRef = useRef<THREE.Sprite>(null);
  const desired = useRef(new THREE.Quaternion());

  useFrame((_, delta) => {
    const p = clamp01(progress.current);
    const g = globe.current;
    if (!g) return;

    let si = 0;
    while (si < focus.length - 1 && p > focus[si + 1]) si++;
    const f0 = focus[si];
    const f1 = focus[Math.min(si + 1, focus.length - 1)];
    const localT = f1 > f0 ? clamp01((p - f0) / (f1 - f0)) : 0;
    const e = ease(localT);

    // Orientation: swing the active city to face the camera.
    if (p <= focus[0]) desired.current.copy(targetQuats[0]);
    else if (p >= focus[focus.length - 1]) desired.current.copy(targetQuats[targetQuats.length - 1]);
    else desired.current.copy(targetQuats[si]).slerp(targetQuats[si + 1], e);
    g.quaternion.slerp(desired.current, 1 - Math.pow(0.0009, delta));

    // Camera: zoom IN at each city (localT→0,1) and OUT mid-leg (localT→0.5).
    const arriving = LEGS.filter((l) => l.arriveAt === si + 1);
    const isOcean = arriving.some((l) => l.height >= 0.4);
    const far = isOcean ? CAM_FAR_OCEAN : CAM_FAR_LAND;
    const pulse = Math.sin(Math.PI * localT);
    const targetDist = CAM_NEAR + (far - CAM_NEAR) * ease(pulse);
    camera.position.z += (targetDist - camera.position.z) * (1 - Math.pow(0.015, delta));
    camera.lookAt(0, 0, 0);

    // Arcs draw while approaching their arrival chapter.
    legArcs.forEach(({ geom, count, leg }) => {
      const wStart = focus[leg.arriveAt - 1];
      const wEnd = focus[leg.arriveAt];
      const draw = clamp01((p - wStart) / Math.max(1e-6, wEnd - wStart));
      geom.setDrawRange(0, Math.max(2, Math.floor(count * ease(draw))));
    });

    // Markers fade in only near the beats that involve their city.
    const MW = 0.075;
    const kMarker = 1 - Math.pow(0.05, delta);
    markerObjs.forEach((m) => {
      let near = 0;
      for (const idx of m.indices) near = Math.max(near, 1 - clamp01(Math.abs(p - focus[idx]) / MW));
      m.coreMat.opacity += (near - m.coreMat.opacity) * kMarker;
      m.spriteMat.opacity += (near * 0.9 - m.spriteMat.opacity) * kMarker;
      m.group.scale.setScalar(0.75 + near * 0.4);
    });

    // Kyoto petals.
    const kyotoIdx = CHAPTERS.findIndex((c) => c.beat === "proposal");
    const nearKyoto = 1 - clamp01(Math.abs(p - focus[kyotoIdx]) / 0.13);
    if (petalRef.current) {
      const mat = petalRef.current.material as THREE.PointsMaterial;
      mat.opacity += (nearKyoto - mat.opacity) * (1 - Math.pow(0.05, delta));
      const attr = petalField.geom.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < attr.count; i++) {
        const s = petalField.seeds[i];
        const rad = 0.3 + (i / attr.count) * 0.85 + Math.sin(s * 3.1 + p * 40) * 0.03;
        const p3 = petalField.base
          .clone()
          .addScaledVector(petalField.tangent, Math.cos(s + p * 6) * rad)
          .addScaledVector(petalField.bitangent, Math.sin(s + p * 6) * rad)
          .addScaledVector(petalField.up, 0.12 + (i / attr.count) * 0.8);
        attr.setXYZ(i, p3.x, p3.y, p3.z);
      }
      attr.needsUpdate = true;
    }

    // Home bloom at Austin.
    const homeIdx = CHAPTERS.findIndex((c) => c.beat === "home");
    const nearHome = 1 - clamp01(Math.abs(p - focus[homeIdx]) / 0.06);
    if (homeRef.current) {
      homeRef.current.scale.setScalar(0.12 + nearHome * 0.4);
      (homeRef.current.material as THREE.SpriteMaterial).opacity = nearHome * 0.9;
    }

    // Finale gold bloom at Sorrento.
    const nearFinale = clamp01((p - (focus[focus.length - 1] - 0.1)) / 0.1);
    if (finaleRef.current) {
      finaleRef.current.scale.setScalar(0.35 + nearFinale * 0.85);
      (finaleRef.current.material as THREE.SpriteMaterial).opacity = nearFinale * 0.7;
    }
  });

  return (
    <>
      {/* Sun + soft fills. Sun is fixed in the scene, so the day/night
          terminator sweeps across as the globe turns. */}
      <ambientLight intensity={0.1} />
      {/* Sun biased toward the camera (+Z) so the focused city is always lit,
          while the limb falls into night with glowing city lights. */}
      <directionalLight position={[3.5, 3, 7]} intensity={2.5} color={"#fff6e8"} />
      <directionalLight position={[-5, -1, -3]} intensity={0.2} color={PALETTE.blush} />

      {/* Milky Way sky. */}
      <mesh scale={90}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial map={starMap} side={THREE.BackSide} />
      </mesh>

      <group ref={globe}>
        {/* The Earth. */}
        <mesh>
          <sphereGeometry args={[R, 128, 128]} />
          <meshStandardMaterial
            map={dayMap}
            normalMap={normalMap}
            normalScale={new THREE.Vector2(0.85, 0.85)}
            roughnessMap={roughMap}
            roughness={1}
            metalness={0.02}
            emissiveMap={nightMap}
            emissive={new THREE.Color("#ffdca8")}
            emissiveIntensity={1.15}
          />
        </mesh>

        {/* Atmosphere rim. */}
        <mesh scale={1.025}>
          <sphereGeometry args={[R, 64, 64]} />
          <meshBasicMaterial color={"#5a86ff"} transparent opacity={0.14} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh scale={1.14}>
          <sphereGeometry args={[R, 48, 48]} />
          <meshBasicMaterial color={"#3f6bd6"} transparent opacity={0.05} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        {/* Austin↔Durham "still connected" thread. */}
        <primitive object={threadLine} />

        {/* Flight arcs. */}
        {legArcs.map(({ line }, i) => (
          <primitive key={i} object={line} />
        ))}

        {/* City markers — fade in per beat (see markerObjs). */}
        {markerObjs.map((m, i) => (
          <primitive key={i} object={m.group} />
        ))}

        {/* Home bloom at Austin. */}
        <sprite ref={homeRef} position={latLngToVector3(CITIES.austin.lat, CITIES.austin.lng, R * 1.02)}>
          <spriteMaterial map={glowGold} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>

        {/* Finale bloom at Sorrento. */}
        <sprite ref={finaleRef} position={latLngToVector3(CITIES.sorrento.lat, CITIES.sorrento.lng, R * 1.03)}>
          <spriteMaterial map={glowGold} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>

        {/* Cherry-blossom petals at Kyoto. */}
        <points ref={petalRef} geometry={petalField.geom}>
          <pointsMaterial map={petalTex} size={0.15} transparent opacity={0} depthWrite={false} sizeAttenuation blending={THREE.NormalBlending} />
        </points>
      </group>
    </>
  );
}
