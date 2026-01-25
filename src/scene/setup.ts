import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  CAMERA_DEFAULT_POSITION,
  CAMERA_FAR_PLANE,
  CAMERA_FOV,
  CAMERA_NEAR_PLANE,
  CONTROLS_ENABLE_DAMPING,
  CONTROLS_MAX_POLAR_ANGLE,
  CONTROLS_MIN_DISTANCE,
  DEFAULT_CAMERA_TARGET,
  GRID_CELL,
  GRID_COLOR_PRIMARY,
  GRID_COLOR_SECONDARY,
  GRID_SIZE,
  GROUND_PLANE_COLOR,
  GROUND_PLANE_OPACITY,
  RENDERER_ENABLE_ANTIALIAS,
  SCENE_BACKGROUND_COLOR,
} from './constants';

const createScene = (): THREE.Scene => {
  const scene: THREE.Scene = new THREE.Scene();
  scene.background = new THREE.Color(SCENE_BACKGROUND_COLOR);
  scene.fog = null;
  return scene;
};

const createCamera = (container: HTMLElement): THREE.PerspectiveCamera => {
  const aspect: number = container.clientWidth / container.clientHeight;

  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    aspect,
    CAMERA_NEAR_PLANE,
    CAMERA_FAR_PLANE
  );

  camera.position.set(
    CAMERA_DEFAULT_POSITION.x,
    CAMERA_DEFAULT_POSITION.y,
    CAMERA_DEFAULT_POSITION.z
  );

  camera.lookAt(
    DEFAULT_CAMERA_TARGET.x,
    DEFAULT_CAMERA_TARGET.y,
    DEFAULT_CAMERA_TARGET.z
  );

  return camera;
};

const createRenderer = (container: HTMLElement): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({
    antialias: RENDERER_ENABLE_ANTIALIAS,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  return renderer;
};

const createControls = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
): OrbitControls => {
  const controls: OrbitControls = new OrbitControls(
    camera,
    renderer.domElement
  );

  controls.enableDamping = CONTROLS_ENABLE_DAMPING;

  controls.target.set(
    DEFAULT_CAMERA_TARGET.x,
    DEFAULT_CAMERA_TARGET.y,
    DEFAULT_CAMERA_TARGET.z
  );

  controls.minDistance = CONTROLS_MIN_DISTANCE;
  controls.maxPolarAngle = CONTROLS_MAX_POLAR_ANGLE;

  controls.update();
  return controls;
};

const createGrid = (gridSize: number, gridCell: number): THREE.GridHelper => {
  const grid: THREE.GridHelper = new THREE.GridHelper(
    gridSize,
    Math.round(gridSize / gridCell),
    GRID_COLOR_PRIMARY,
    GRID_COLOR_SECONDARY
  );

  // Rotate grid to lie on XY plane (Z-up coordinate system)
  grid.rotation.x = Math.PI / 2;
  return grid;
};

const createGroundPlane = (maxSize: number): THREE.Mesh => {
  const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(
    maxSize,
    maxSize
  );

  const planeMaterial: THREE.MeshLambertMaterial =
    new THREE.MeshLambertMaterial({
      color: GROUND_PLANE_COLOR,
      transparent: true,
      opacity: GROUND_PLANE_OPACITY,
    });

  const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, planeMaterial);

  return plane;
};

export const initScene = (container: HTMLElement): (() => void) => {
  // Set global coordinate system to Z-up for all Three.js objects
  THREE.Object3D.DEFAULT_UP.set(0, 0, 1);

  const scene: THREE.Scene = createScene();
  const camera: THREE.PerspectiveCamera = createCamera(container);
  const renderer: THREE.WebGLRenderer = createRenderer(container);
  const controls: OrbitControls = createControls(camera, renderer);

  scene.add(createGrid(GRID_SIZE, GRID_CELL));
  scene.add(createGroundPlane(GRID_SIZE));

  container.appendChild(renderer.domElement);

  let animationId: number;
  const animate = (): void => {
    animationId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  const handleResize = (): void => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationId);
    controls.dispose();
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };
};
