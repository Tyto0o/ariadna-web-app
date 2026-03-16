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
import { Obstacle, Robot } from '../entities/types/entities.types';
import { createSceneEntities } from './entities';
import { createTargetCrosshairController } from './crosshair';
import { createScenePath } from './path';
import { createCamera } from './camera';
import { createTargetSelectionCameraController } from './targetSelectionCamera';

interface SceneEventHandlers {
  onGroundClick?: (position: { x: number; y: number }) => void;
}

interface SceneRuntime {
  syncRobots: (robots: Robot[]) => void;
  syncObstacles: (obstacles: Obstacle[]) => void;
  syncPath: (path: { x: number; y: number }[]) => void;
  setTargetPreviewEnabled: (enabled: boolean) => void;
  dispose: () => void;
}

const createScene = (): THREE.Scene => {
  const scene: THREE.Scene = new THREE.Scene();
  scene.background = new THREE.Color(SCENE_BACKGROUND_COLOR);
  scene.fog = null;
  return scene;
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

export const initScene = (
  container: HTMLElement,
  eventHandlers?: SceneEventHandlers
): SceneRuntime => {
  // Set global coordinate system to Z-up for all Three.js objects
  THREE.Object3D.DEFAULT_UP.set(0, 0, 1);

  const scene: THREE.Scene = createScene();
  const camera: THREE.PerspectiveCamera = createCamera({
    container,
    fov: CAMERA_FOV,
    near: CAMERA_NEAR_PLANE,
    far: CAMERA_FAR_PLANE,
    position: CAMERA_DEFAULT_POSITION,
    lookAt: DEFAULT_CAMERA_TARGET,
  });

  const renderer: THREE.WebGLRenderer = createRenderer(container);
  const controls: OrbitControls = createControls(camera, renderer);
  const entities = createSceneEntities(scene);
  const scenePath = createScenePath(scene);
  const grid = createGrid(GRID_SIZE, GRID_CELL);
  const groundPlane = createGroundPlane(GRID_SIZE);

  scene.add(grid);
  scene.add(groundPlane);

  const targetCrosshair = createTargetCrosshairController({
    scene,
    camera,
    domElement: renderer.domElement,
    groundPlane,
  });

  const targetSelectionCamera = createTargetSelectionCameraController({
    camera,
    controls,
    minDistance: CONTROLS_MIN_DISTANCE,
    defaultTarget: DEFAULT_CAMERA_TARGET,
  });

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

  const syncRobots = (robots: Robot[]): void => {
    entities.syncRobots(robots);
  };

  const syncObstacles = (obstacles: Obstacle[]): void => {
    entities.syncObstacles(obstacles);
  };

  const syncPath = (path: { x: number; y: number }[]): void => {
    scenePath.syncPath(path);
  };

  const handleClick = (event: MouseEvent): void => {
    if (event.button !== 0 || !eventHandlers?.onGroundClick) {
      return;
    }

    const groundPoint = targetCrosshair.getGroundPointFromMouseEvent(event);

    if (!groundPoint) {
      return;
    }

    eventHandlers.onGroundClick({
      x: Math.round(groundPoint.x),
      y: Math.round(groundPoint.y),
    });
  };

  const setTargetPreviewEnabled = (enabled: boolean): void => {
    targetCrosshair.setEnabled(enabled);
    targetSelectionCamera.setEnabled(enabled);
  };

  renderer.domElement.addEventListener('click', handleClick);

  const dispose = (): void => {
    entities.dispose();
    scenePath.dispose();
    targetCrosshair.dispose();
    window.removeEventListener('resize', handleResize);
    renderer.domElement.removeEventListener('click', handleClick);
    cancelAnimationFrame(animationId);
    controls.dispose();
    renderer.dispose();
    if (renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement);
    }
  };

  return {
    syncRobots,
    syncObstacles,
    syncPath,
    setTargetPreviewEnabled,
    dispose,
  };
};
