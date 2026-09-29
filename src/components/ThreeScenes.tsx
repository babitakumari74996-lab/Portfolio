import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export type SceneKind =
  | "preloader"
  | "hero"
  | "globe"
  | "skills"
  | "project"
  | "process"
  | "service"
  | "testimonials"
  | "stats"
  | "faq"
  | "footer";

type SceneProps = {
  kind: SceneKind;
  variant?: string;
  selected?: number;
  progress?: number;
  onSelect?: (index: number) => void;
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function randomGenerator(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function ParticleField({
  count = 120,
  spread = 11,
  color = "#a6faff",
  size = 0.025,
  opacity = 0.6,
}: {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  opacity?: number;
}) {
  const positions = useMemo(() => {
    const random = randomGenerator(count * 23 + 41);
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (random() - 0.5) * spread;
      array[i * 3 + 1] = (random() - 0.5) * spread * 0.7;
      array[i * 3 + 2] = (random() - 0.5) * 5 - 1;
    }
    return array;
  }, [count, spread]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
}

function PreloaderObject({ progress = 0 }: { progress?: number }) {
  const knot = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((state, delta) => {
    if (!knot.current || reduced) return;
    knot.current.rotation.x += delta * 0.23;
    knot.current.rotation.y += delta * 0.37;
    knot.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
  });

  return (
    <group ref={knot} scale={0.42 + (progress / 100) * 0.64}>
      <mesh rotation={[0.3, 0, 0.3]}>
        <torusKnotGeometry args={[1.14, 0.27, 160, 12, 2, 3]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.48} />
      </mesh>
      <mesh rotation={[0.3, 0, 0.3]} scale={0.98}>
        <torusKnotGeometry args={[1.14, 0.27, 160, 8, 2, 3]} />
        <meshBasicMaterial color="#11343b" wireframe transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[1.15, 0.5, 0]}>
        <torusGeometry args={[1.85, 0.008, 4, 120]} />
        <meshBasicMaterial color="#ffb347" transparent opacity={0.48} />
      </mesh>
    </group>
  );
}

function HeroUniverse() {
  const pointerGroup = useRef<THREE.Group>(null);
  const scrollGroup = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const satellite = useRef<THREE.Mesh>(null);
  const octa = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const { viewport } = useThree();
  const compact = viewport.width < 6;
  const mobileScale = viewport.width < 6 ? 1.35 : viewport.width < 9 ? 1.2 : 1;

  useEffect(() => {
    const move = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    if (!scrollGroup.current || reduced) return;
    const animation = gsap.to(scrollGroup.current.rotation, {
      y: 0.82,
      z: -0.16,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });
    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [reduced]);

  useFrame((state, delta) => {
    if (!pointerGroup.current || !core.current || reduced) return;
    pointerGroup.current.rotation.y = THREE.MathUtils.damp(
      pointerGroup.current.rotation.y,
      mouse.current.x * 0.1,
      2.3,
      delta,
    );
    pointerGroup.current.rotation.x = THREE.MathUtils.damp(
      pointerGroup.current.rotation.x,
      -mouse.current.y * 0.07,
      2.3,
      delta,
    );
    core.current.rotation.y += delta * 0.055;
    core.current.rotation.z += delta * 0.018;
    if (satellite.current) {
      satellite.current.position.x = 1.9 + Math.sin(state.clock.elapsedTime * 0.31) * 0.36;
      satellite.current.position.y = 2.1 + Math.cos(state.clock.elapsedTime * 0.31) * 0.23;
      satellite.current.rotation.x += delta * 0.17;
      satellite.current.rotation.y += delta * 0.13;
    }
    if (octa.current) {
      octa.current.position.x = -2.45 + Math.sin(state.clock.elapsedTime * 0.26) * 0.24;
      octa.current.position.y = -1.28 + Math.cos(state.clock.elapsedTime * 0.26) * 0.18;
      octa.current.rotation.y += delta * 0.09;
    }
    if (knot.current) {
      knot.current.position.y = -1.05 + Math.sin(state.clock.elapsedTime * 0.42) * 0.22;
      knot.current.rotation.z += delta * 0.13;
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 5]} intensity={25} color="#00dcea" distance={12} />
      <pointLight position={[-3, -2, 2]} intensity={18} color="#ff9b46" distance={10} />
      <ParticleField count={compact ? 100 : 240} spread={compact ? 9 : 16} opacity={0.38} />
      <group position={[compact ? 0.54 : 2.5, compact ? -1.45 : -0.12, 0]} scale={(compact ? 0.79 : 1) * mobileScale}>
        <group ref={pointerGroup}>
          <group ref={scrollGroup}>
            <group ref={core}>
              <mesh>
                <icosahedronGeometry args={[1.58, 4]} />
                <meshPhysicalMaterial
                  color="#0b2830"
                  metalness={0.78}
                  roughness={0.29}
                  clearcoat={0.85}
                  clearcoatRoughness={0.15}
                  flatShading
                />
              </mesh>
              <mesh scale={1.012}>
                <icosahedronGeometry args={[1.58, 4]} />
                <meshBasicMaterial color="#63ecf0" wireframe transparent opacity={0.14} depthWrite={false} />
              </mesh>
              <mesh scale={1.13} rotation={[0.2, 0.5, 0.4]}>
                <icosahedronGeometry args={[1.58, 1]} />
                <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.15} depthWrite={false} />
              </mesh>
            </group>

            <mesh rotation={[1.15, 0.17, 0.2]}>
              <torusGeometry args={[2.62, 0.012, 4, 180]} />
              <meshBasicMaterial color="#00f0ff" transparent opacity={0.55} />
            </mesh>
            <mesh rotation={[-0.52, -0.44, 0.48]}>
              <torusGeometry args={[2.98, 0.007, 4, 180]} />
              <meshBasicMaterial color="#ffb347" transparent opacity={0.42} />
            </mesh>
            <mesh rotation={[0.28, 1.05, 0.6]}>
              <torusGeometry args={[2.23, 0.006, 4, 180]} />
              <meshBasicMaterial color="#8eeaf0" transparent opacity={0.26} />
            </mesh>

            <group ref={octa} position={[-2.45, -1.28, 0.46]} rotation={[0.5, 0.3, -0.28]}>
              <mesh>
                <octahedronGeometry args={[0.45, 0]} />
                <meshStandardMaterial color="#0c343a" metalness={0.65} roughness={0.3} flatShading />
              </mesh>
              <mesh scale={1.02}>
                <octahedronGeometry args={[0.45, 0]} />
                <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.42} />
              </mesh>
            </group>
            <mesh ref={satellite} position={[1.9, 2.1, 0.25]} rotation={[0.4, 0.3, 0.1]}>
              <icosahedronGeometry args={[0.38, 0]} />
              <meshStandardMaterial color="#d28c4c" emissive="#ff9a3b" emissiveIntensity={0.15} metalness={0.7} roughness={0.3} wireframe />
            </mesh>
            <mesh ref={knot} position={[2.58, -1.05, 0.8]} rotation={[0.3, 0.45, 0]}>
              <torusKnotGeometry args={[0.28, 0.08, 96, 8, 2, 3]} />
              <meshStandardMaterial color="#3e8e98" metalness={0.65} roughness={0.27} />
            </mesh>
            <mesh position={[0.68, 2.52, -0.8]}>
              <sphereGeometry args={[0.06, 10, 10]} />
              <meshBasicMaterial color="#ffb347" />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

function pointInPolygon(lon: number, lat: number, polygon: number[][]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];
    const intersects = yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

function globePosition(lat: number, lon: number, radius: number) {
  const latitude = THREE.MathUtils.degToRad(lat);
  const longitude = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    radius * Math.cos(latitude) * Math.sin(longitude),
    radius * Math.sin(latitude),
    radius * Math.cos(latitude) * Math.cos(longitude),
  );
}

const landMasses = [
  [[-168, 67], [-135, 72], [-117, 61], [-125, 49], [-112, 31], [-98, 17], [-81, 8], [-80, 27], [-96, 34], [-112, 31], [-130, 50]],
  [[-81, 12], [-68, 12], [-50, 3], [-35, -5], [-46, -25], [-70, -56], [-78, -28]],
  [[-12, 36], [-11, 58], [8, 70], [38, 69], [73, 76], [116, 71], [160, 61], [164, 48], [139, 36], [120, 21], [107, 11], [102, -1], [87, 7], [78, 8], [69, 23], [49, 29], [36, 36], [26, 42], [13, 36]],
  [[-17, 35], [9, 37], [35, 30], [51, 12], [44, -13], [32, -35], [18, -35], [10, -19], [-10, 0], [-16, 15]],
  [[112, -11], [149, -11], [154, -35], [135, -39], [114, -32]],
  [[44, -12], [50, -13], [50, -26], [44, -26]],
];

function WorldGlobe({ variant = "about" }: { variant?: string }) {
  const globe = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const { viewport } = useThree();
  const contact = variant === "contact";
  const mobileScale = viewport.width < 7 ? 1.5 : viewport.width < 9 ? 1.3 : 1;
  const india = useMemo(() => globePosition(21, 78.9, 1.56), []);
  const indiaRotation = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), india.clone().normalize()),
    [india],
  );
  const land = useMemo(() => {
    const random = randomGenerator(511);
    const positions: number[] = [];
    for (let lat = -56; lat <= 76; lat += 3.1) {
      for (let lon = -178; lon <= 178; lon += 3.1) {
        if (landMasses.some((polygon) => pointInPolygon(lon, lat, polygon)) && random() > 0.12) {
          const point = globePosition(lat + (random() - 0.5) * 1.3, lon + (random() - 0.5) * 1.3, 1.522);
          positions.push(point.x, point.y, point.z);
        }
      }
    }
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    if (!globe.current || reduced) return;
    globe.current.rotation.y = -1.37 + Math.sin(state.clock.elapsedTime * 0.32) * 0.13;
    globe.current.rotation.x = -0.12 + Math.sin(state.clock.elapsedTime * 0.27) * 0.035;
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 3, 5]} color="#00dcea" intensity={16} distance={12} />
      <pointLight position={[-3, -2, 3]} color="#ffb347" intensity={contact ? 13 : 5} distance={10} />
      <ParticleField count={contact ? 120 : 55} spread={8} size={0.025} opacity={0.38} />
      <group scale={(contact ? 0.8 : 0.92) * mobileScale}>
        <mesh rotation={[1.18, 0.15, 0.4]}>
          <torusGeometry args={[2.05, 0.009, 5, 128]} />
          <meshBasicMaterial color={contact ? "#ffb347" : "#00f0ff"} transparent opacity={0.34} />
        </mesh>
        {contact && <mesh rotation={[-0.42, 0.75, 0.12]}>
          <torusGeometry args={[2.33, 0.006, 5, 128]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.27} />
        </mesh>}
        <group ref={globe} rotation={[-0.12, -1.37, 0]}>
          <mesh>
            <icosahedronGeometry args={[1.5, 4]} />
            <meshStandardMaterial color="#0c2227" metalness={0.45} roughness={0.72} flatShading />
          </mesh>
          <mesh scale={1.006}>
            <icosahedronGeometry args={[1.5, 3]} />
            <meshBasicMaterial color="#438890" wireframe transparent opacity={0.23} depthWrite={false} />
          </mesh>
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[land, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#77c5c5" size={0.027} sizeAttenuation transparent opacity={0.72} depthWrite={false} />
          </points>
          <group position={india.toArray()} quaternion={indiaRotation}>
            <mesh>
              <sphereGeometry args={[0.065, 12, 12]} />
              <meshBasicMaterial color="#ffb347" />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <torusGeometry args={[0.18, 0.008, 5, 40]} />
              <meshBasicMaterial color="#ffb347" transparent opacity={0.86} />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <torusGeometry args={[0.32, 0.005, 5, 40]} />
              <meshBasicMaterial color="#ffb347" transparent opacity={0.3} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

type Skill = {
  name: string;
  level: string;
  shape: "box" | "sphere" | "torus" | "octa" | "dodeca" | "knot";
  position: [number, number, number];
  color: string;
};

const skillItems: Skill[] = [
  { name: "React", level: "Advanced", shape: "box", position: [-3.2, 0.9, 0], color: "#00f0ff" },
  { name: "Next.js", level: "Advanced", shape: "octa", position: [-1.15, 1.45, -0.6], color: "#d6e9ea" },
  { name: "Three.js", level: "Advanced", shape: "torus", position: [1.4, 1.05, 0.2], color: "#ffb347" },
  { name: "Node.js", level: "Proficient", shape: "sphere", position: [3.25, 0.9, -0.7], color: "#86c9aa" },
  { name: "Tailwind", level: "Advanced", shape: "dodeca", position: [-2.05, -1.5, -0.2], color: "#9cdbeb" },
  { name: "GSAP", level: "Proficient", shape: "knot", position: [1.95, -1.45, -0.3], color: "#d8bc89" },
];

function SkillGeometry({ shape, color, wireframe = false }: { shape: Skill["shape"]; color: string; wireframe?: boolean }) {
  const geometry =
    shape === "box" ? <boxGeometry args={[0.85, 0.85, 0.85]} /> :
    shape === "sphere" ? <sphereGeometry args={[0.5, 18, 12]} /> :
    shape === "torus" ? <torusGeometry args={[0.52, 0.18, 12, 48]} /> :
    shape === "octa" ? <octahedronGeometry args={[0.65, 0]} /> :
    shape === "dodeca" ? <dodecahedronGeometry args={[0.61, 0]} /> :
    <torusKnotGeometry args={[0.4, 0.13, 72, 10, 2, 3]} />;

  return (
    <mesh scale={wireframe ? 1.025 : 1}>
      {geometry}
      {wireframe ? (
        <meshBasicMaterial color={color} wireframe transparent opacity={0.42} depthWrite={false} />
      ) : (
        <meshStandardMaterial color="#123139" metalness={0.72} roughness={0.28} flatShading />
      )}
    </mesh>
  );
}

function SkillNode({ skill, nodeRef }: { skill: Skill; nodeRef: (node: THREE.Group | null) => void }) {
  const object = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  useFrame((state, delta) => {
    if (!object.current) return;
    object.current.scale.setScalar(THREE.MathUtils.damp(object.current.scale.x, hovered ? 1.28 : 1, 6, delta));
    if (!reduced) {
      object.current.rotation.y += delta * 0.2;
      object.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35 + skill.position[0]) * 0.16;
    }
  });

  return (
    <group ref={nodeRef} position={skill.position}>
      <group
        ref={object}
        onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <SkillGeometry shape={skill.shape} color={skill.color} />
        <SkillGeometry shape={skill.shape} color={skill.color} wireframe />
      </group>
      <Html position={[0, -0.88, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className={`skill-html ${hovered ? "skill-html-active" : ""}`}>
          <span>{skill.name}</span>
          <small>{hovered ? skill.level : ""}</small>
        </div>
      </Html>
    </group>
  );
}

function SkillConstellation() {
  const nodes = useRef<(THREE.Group | null)[]>([]);
  const { viewport } = useThree();
  const reduced = useReducedMotion();
  const compact = viewport.width < 7;
  const mobileBoost = viewport.width < 7 ? 1.5 : viewport.width < 9 ? 1.3 : 1;
  const scale = (compact ? 0.55 : Math.min(2.2, Math.max(1.3, viewport.width * 0.105))) * mobileBoost;
  const linePositions = useMemo(() => {
    const edges = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 2], [1, 5]];
    const array: number[] = [];
    edges.forEach(([a, b]) => {
      array.push(...skillItems[a].position, ...skillItems[b].position);
    });
    return new Float32Array(array);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 85%",
        end: "center 45%",
        scrub: 1,
      },
    });
    nodes.current.forEach((node, index) => {
      if (!node) return;
      const [x, y, z] = skillItems[index].position;
      timeline.fromTo(node.position, { x: x * 1.8, y: y * 1.7, z: z - 3.4 }, { x, y, z, ease: "none" }, index * 0.1);
    });
    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [reduced]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[2, 4, 5]} color="#00f0ff" intensity={20} distance={14} />
      <pointLight position={[-4, -1, 3]} color="#ffb347" intensity={13} distance={11} />
      <ParticleField count={90} spread={12} opacity={0.3} />
      <group scale={scale} position={[0, compact ? 0.1 : -0.15, 0]}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#59adb8" transparent opacity={0.29} depthWrite={false} />
        </lineSegments>
        {skillItems.map((skill, index) => (
          <SkillNode key={skill.name} skill={skill} nodeRef={(node) => { nodes.current[index] = node; }} />
        ))}
      </group>
    </>
  );
}

function ProjectOrbit({ variant = "cyan" }: { variant?: string }) {
  const orbit = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const { viewport } = useThree();
  const mobileScale = viewport.width < 7 ? 1.6 : viewport.width < 9 ? 1.35 : 1;
  const color = variant === "amber" ? "#ffb347" : variant === "violet" ? "#b88cff" : "#00f0ff";

  useFrame((_, delta) => {
    if (!orbit.current || reduced) return;
    orbit.current.rotation.z += delta * 0.055;
    orbit.current.rotation.y += delta * 0.04;
  });

  return (
    <>
      <ParticleField count={65} spread={8} color={color} opacity={0.55} size={0.03} />
      <group ref={orbit} rotation={[0.7, 0.3, 0.2]} scale={mobileScale}>
        <mesh>
          <torusGeometry args={[2.7, 0.012, 4, 120]} />
          <meshBasicMaterial color={color} transparent opacity={0.52} />
        </mesh>
        <mesh rotation={[0.95, 0.1, 0.5]}>
          <torusGeometry args={[2.25, 0.006, 4, 120]} />
          <meshBasicMaterial color={color} transparent opacity={0.25} />
        </mesh>
        <mesh position={[2.68, 0, 0]}>
          <octahedronGeometry args={[0.13, 0]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
      </group>
    </>
  );
}

function ProcessPipeline({ selected = 0, onSelect }: { selected?: number; onSelect?: (index: number) => void }) {
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const reduced = useReducedMotion();
  const { viewport } = useThree();
  const mobileBoost = viewport.width < 7 ? 1.6 : viewport.width < 9 ? 1.35 : 1;
  const pipelineScale = Math.min(5.5, viewport.width * 0.82 / 7.6) * mobileBoost;
  const positions = useMemo(() => [
    new THREE.Vector3(-3.8, -0.1, 0),
    new THREE.Vector3(-1.9, 0.34, -0.32),
    new THREE.Vector3(0, -0.12, 0.15),
    new THREE.Vector3(1.9, 0.34, -0.32),
    new THREE.Vector3(3.8, -0.1, 0),
  ], []);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(positions).getPoints(180), [positions]);
  const geometry = useMemo(() => {
    const value = new THREE.BufferGeometry().setFromPoints(curve);
    value.setDrawRange(0, reduced ? curve.length : 0);
    return value;
  }, [curve, reduced]);

  useEffect(() => {
    if (reduced) {
      geometry.setDrawRange(0, curve.length);
      return;
    }
    const reveal = { value: 0 };
    const animation = gsap.to(reveal, {
      value: 1,
      ease: "none",
      onUpdate: () => geometry.setDrawRange(0, Math.max(2, Math.round(curve.length * reveal.value))),
      scrollTrigger: { trigger: "#process", start: "top 78%", end: "center 45%", scrub: 1 },
    });
    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [curve.length, geometry, reduced]);

  useFrame((state) => {
    if (reduced) return;
    nodeRefs.current.forEach((node, index) => {
      if (node) node.rotation.y = state.clock.elapsedTime * 0.24 + index * 0.42;
    });
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight position={[0, 2, 4]} color="#00f0ff" intensity={13} distance={12} />
      <ParticleField count={70} spread={12} opacity={0.23} />
      <group scale={pipelineScale}>
        <lineSegments geometry={geometry}>
          <lineBasicMaterial color="#00f0ff" transparent opacity={0.75} depthWrite={false} />
        </lineSegments>
        {positions.map((position, index) => (
          <group key={index} ref={(node) => { nodeRefs.current[index] = node; }} position={position}>
            <mesh onClick={(event) => { event.stopPropagation(); onSelect?.(index); }}>
              <sphereGeometry args={[0.38, 12, 12]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            <mesh>
              <icosahedronGeometry args={[index === selected ? 0.25 : 0.19, 1]} />
              <meshStandardMaterial
                color={index === selected ? "#ffb347" : "#0b393f"}
                emissive={index === selected ? "#ffb347" : "#00d8e8"}
                emissiveIntensity={index === selected ? 0.45 : 0.12}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
            <mesh scale={1.75}>
              <icosahedronGeometry args={[0.22, 1]} />
              <meshBasicMaterial color={index === selected ? "#ffb347" : "#00f0ff"} wireframe transparent opacity={index === selected ? 0.75 : 0.24} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

function ServiceGlyph({ variant = "landing" }: { variant?: string }) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const { viewport } = useThree();
  const mobileScale = viewport.width < 7 ? 1.6 : viewport.width < 9 ? 1.35 : 1;

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.24;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <pointLight position={[2, 3, 4]} color={variant === "commerce" ? "#ffb347" : "#00f0ff"} intensity={16} distance={10} />
      <group ref={group} rotation={[0.22, -0.35, 0]} scale={mobileScale}>
        {variant === "landing" && (
          <>
            {[-0.32, 0, 0.32].map((offset, index) => (
              <mesh key={offset} position={[offset * 0.32, -offset * 0.55, offset]} rotation={[0.12, -0.16, 0]}>
                <boxGeometry args={[1.55 - index * 0.15, 1.02 - index * 0.1, 0.035]} />
                <meshStandardMaterial color={index === 2 ? "#13575f" : "#122b31"} metalness={0.7} roughness={0.35} />
              </mesh>
            ))}
            <mesh position={[0.1, 0.43, 0.4]}>
              <boxGeometry args={[0.84, 0.018, 0.02]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
          </>
        )}
        {variant === "commerce" && (
          <>
            <mesh rotation={[0.3, 0.35, 0]}>
              <boxGeometry args={[1.1, 1.1, 1.1]} />
              <meshStandardMaterial color="#4b3828" metalness={0.72} roughness={0.28} />
            </mesh>
            <mesh scale={1.025} rotation={[0.3, 0.35, 0]}>
              <boxGeometry args={[1.1, 1.1, 1.1]} />
              <meshBasicMaterial color="#ffb347" wireframe transparent opacity={0.56} />
            </mesh>
            <mesh rotation={[1.05, 0.3, 0.25]}>
              <torusGeometry args={[1.08, 0.01, 4, 100]} />
              <meshBasicMaterial color="#ffb347" transparent opacity={0.58} />
            </mesh>
          </>
        )}
        {variant === "experience" && (
          <>
            <mesh>
              <torusKnotGeometry args={[0.64, 0.2, 120, 12, 2, 3]} />
              <meshStandardMaterial color="#0e515b" metalness={0.75} roughness={0.25} />
            </mesh>
            <mesh scale={1.025}>
              <torusKnotGeometry args={[0.64, 0.2, 120, 7, 2, 3]} />
              <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.38} />
            </mesh>
          </>
        )}
      </group>
    </>
  );
}

function TestimonialOrbit() {
  const ring = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const { viewport } = useThree();
  const mobileScale = viewport.width < 7 ? 1.5 : viewport.width < 9 ? 1.3 : 1;
  useFrame((_, delta) => {
    if (ring.current && !reduced) ring.current.rotation.y += delta * 0.055;
  });
  return (
    <>
      <ParticleField count={115} spread={12} opacity={0.3} />
      <group ref={ring} rotation={[0.3, 0, 0.15]} scale={mobileScale}>
        <mesh rotation={[1.15, 0.1, 0]}>
          <torusGeometry args={[3.55, 0.01, 4, 160]} />
          <meshBasicMaterial color="#ffb347" transparent opacity={0.27} />
        </mesh>
        <mesh rotation={[0.38, 0.5, 0.7]}>
          <torusGeometry args={[3.1, 0.007, 4, 160]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.23} />
        </mesh>
      </group>
    </>
  );
}

function StatsWave() {
  const wave = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const { viewport } = useThree();
  const mobileScale = viewport.width < 7 ? 1.6 : viewport.width < 9 ? 1.35 : 1;
  const positions = useMemo(() => {
    const values: number[] = [];
    for (let row = -8; row <= 8; row += 1) {
      for (let col = -24; col < 24; col += 1) {
        const x = col * 0.22;
        const nextX = (col + 1) * 0.22;
        const z = row * 0.2;
        values.push(x, Math.sin(x * 0.7 + z) * 0.17, z, nextX, Math.sin(nextX * 0.7 + z) * 0.17, z);
      }
    }
    return new Float32Array(values);
  }, []);
  useFrame((state) => {
    if (wave.current && !reduced) wave.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.1;
  });

  return (
    <group ref={wave} rotation={[-0.84, 0, 0]} position={[0, -1.1, -2]} scale={mobileScale}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00b8c6" transparent opacity={0.15} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

function QuestionSculpture() {
  const mark = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const { viewport } = useThree();
  const mobileScale = viewport.width < 7 ? 1.7 : viewport.width < 9 ? 1.4 : 1;
  useFrame((state) => {
    if (!mark.current || reduced) return;
    mark.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.32;
    mark.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.28) * 0.09;
  });
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[2, 3, 4]} color="#00f0ff" intensity={20} distance={10} />
      <ParticleField count={45} spread={7} opacity={0.3} />
      <group ref={mark} rotation={[0, -0.3, -0.2]} scale={mobileScale}>
        <mesh position={[0, 0.55, 0]} rotation={[0, 0, -0.45]}>
          <torusGeometry args={[0.8, 0.13, 10, 80, Math.PI * 1.42]} />
          <meshStandardMaterial color="#0e5058" metalness={0.8} roughness={0.24} />
        </mesh>
        <mesh position={[0.17, -0.67, 0]} rotation={[0, 0, 0.4]}>
          <cylinderGeometry args={[0.12, 0.12, 0.5, 10]} />
          <meshStandardMaterial color="#0e5058" metalness={0.8} roughness={0.24} />
        </mesh>
        <mesh position={[0.15, -1.25, 0]}>
          <icosahedronGeometry args={[0.14, 1]} />
          <meshBasicMaterial color="#ffb347" />
        </mesh>
        <mesh scale={1.07} position={[0, 0.55, -0.04]} rotation={[0, 0, -0.45]}>
          <torusGeometry args={[0.8, 0.13, 5, 60, Math.PI * 1.42]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.2} />
        </mesh>
      </group>
    </>
  );
}

function FooterWave() {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const { viewport } = useThree();
  const mobileScale = viewport.width < 7 ? 1.5 : viewport.width < 9 ? 1.3 : 1;
  const curves = useMemo(() => {
    const points: number[] = [];
    for (let row = 0; row < 9; row += 1) {
      for (let col = 0; col < 70; col += 1) {
        const x1 = (col - 35) * 0.18;
        const x2 = (col - 34) * 0.18;
        const z = -row * 0.2;
        points.push(x1, Math.sin(x1 * 0.65 + row * 0.23) * 0.14, z, x2, Math.sin(x2 * 0.65 + row * 0.23) * 0.14, z);
      }
    }
    return new Float32Array(points);
  }, []);
  useFrame((state) => {
    if (group.current && !reduced) group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.28) * 0.045;
  });
  return (
    <group ref={group} rotation={[-0.9, 0, 0]} position={[0, -0.2, 0]} scale={[Math.max(1, viewport.width / 13) * mobileScale, 1 * mobileScale, 1 * mobileScale]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[curves, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function ThreeScene({ kind, variant, selected, progress, onSelect }: SceneProps) {
  const camera = kind === "hero" ? { position: [0, 0, 9] as [number, number, number], fov: 45 }
    : kind === "skills" || kind === "process" ? { position: [0, 0, 10] as [number, number, number], fov: 45 }
      : kind === "service" ? { position: [0, 0, 4.7] as [number, number, number], fov: 45 }
      : { position: [0, 0, 6] as [number, number, number], fov: 45 };

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={camera}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      fallback={kind === "hero" ? <div className="webgl-fallback" /> : null}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color("#000000"), 0)}
      style={{ width: "100%", height: "100%" }}
    >
      {kind === "preloader" && <PreloaderObject progress={progress} />}
      {kind === "hero" && <HeroUniverse />}
      {kind === "globe" && <WorldGlobe variant={variant} />}
      {kind === "skills" && <SkillConstellation />}
      {kind === "project" && <ProjectOrbit variant={variant} />}
      {kind === "process" && <ProcessPipeline selected={selected} onSelect={onSelect} />}
      {kind === "service" && <ServiceGlyph variant={variant} />}
      {kind === "testimonials" && <TestimonialOrbit />}
      {kind === "stats" && <StatsWave />}
      {kind === "faq" && <QuestionSculpture />}
      {kind === "footer" && <FooterWave />}
    </Canvas>
  );
}