import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

// Initialize canvas and renderer
const canvas = document.getElementById("bg");
if (!canvas) {
  console.error("Canvas element with id 'bg' not found");
}

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap for mobile performance
renderer.setClearColor(0x0a0a1a, 1);

// Scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 4;

// Galaxy parameters matching brand colors
const params = {
  count: 15000,
  radius: 5,
  branches: 4,
  spin: 1,
  randomness: 0.35,
  randomnessPower: 3,
  insideColor: "#667eea", // Purple
  outsideColor: "#2a1a5e", // Dark purple
};

let geometry = null;
let material = null;
let points = null;

// Create a star texture with a radial gradient
function createStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);

  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
  gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.3)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

function generateGalaxy() {
  // Cleanup old geometry
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);
  const sizes = new Float32Array(params.count);

  const insideColor = new THREE.Color(params.insideColor);
  const outsideColor = new THREE.Color(params.outsideColor);

  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * params.radius;
    const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;

    const spinAngle = radius * params.spin;

    const randomX =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? -1 : 1) *
      params.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? -1 : 1) *
      params.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? -1 : 1) *
      params.randomness *
      radius;

    // Star position
    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY * 0.1;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Color interpolation from center to edges
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / params.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    // Vary star sizes slightly for more natural look
    sizes[i] = 0.015 + Math.random() * 0.01;
  }

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  material = new THREE.PointsMaterial({
    size: 0.015,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    map: createStarTexture(),
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);
}

generateGalaxy();

// Scroll tracking
let scroll = 0;
window.addEventListener("scroll", () => {
  scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  scroll = Math.max(0, Math.min(1, scroll)); // Clamp between 0 and 1
});

// Animation loop
function animate(t) {
  requestAnimationFrame(animate);

  if (points) {
    // subtle rotation
    points.rotation.y = t * 0.00001;

    // Camera parallax with scroll (optional)
    const targetZ = 4 - scroll * 1.5;
    camera.position.z += (targetZ - camera.position.z) * 0.02;
  }

  renderer.render(scene, camera);
}

animate(0);

// Handle window resize
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Visibility change optimization
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    renderer.setPixelRatio(1);
  } else {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  }
});
