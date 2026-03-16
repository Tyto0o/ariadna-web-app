import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setCameraTransform } from './camera';

interface TargetSelectionControlsState {
  cameraPosition: THREE.Vector3;
  controlsTarget: THREE.Vector3;
  enableRotate: boolean;
  enableZoom: boolean;
  enablePan: boolean;
  minPolarAngle: number;
  maxPolarAngle: number;
  mouseButtons: {
    LEFT: THREE.MOUSE | null | undefined;
    MIDDLE: THREE.MOUSE | null | undefined;
    RIGHT: THREE.MOUSE | null | undefined;
  };
}

interface CreateTargetSelectionCameraControllerParams {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  minDistance: number;
  defaultTarget: { x: number; y: number; z: number };
}

interface TargetSelectionCameraController {
  setEnabled: (enabled: boolean) => void;
}

export const createTargetSelectionCameraController = ({
  camera,
  controls,
  minDistance,
  defaultTarget,
}: CreateTargetSelectionCameraControllerParams): TargetSelectionCameraController => {
  let active = false;
  let state: TargetSelectionControlsState | null = null;

  const setEnabled = (enabled: boolean): void => {
    if (enabled && !active) {
      state = {
        cameraPosition: camera.position.clone(),
        controlsTarget: controls.target.clone(),
        enableRotate: controls.enableRotate,
        enableZoom: controls.enableZoom,
        enablePan: controls.enablePan,
        minPolarAngle: controls.minPolarAngle,
        maxPolarAngle: controls.maxPolarAngle,
        mouseButtons: {
          LEFT: controls.mouseButtons.LEFT,
          MIDDLE: controls.mouseButtons.MIDDLE,
          RIGHT: controls.mouseButtons.RIGHT,
        },
      };

      const currentDistance = camera.position.distanceTo(controls.target);
      const topDownHeight = Math.max(minDistance, currentDistance);

      controls.target.set(
        controls.target.x,
        controls.target.y,
        defaultTarget.z
      );

      setCameraTransform(camera, {
        position: {
          x: controls.target.x,
          y: controls.target.y,
          z: controls.target.z + topDownHeight,
        },
        lookAt: controls.target,
      });

      controls.enableRotate = false;
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = 0;
      controls.mouseButtons = {
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      };

      controls.update();
      active = true;
      return;
    }

    if (!enabled && active && state) {
      controls.target.copy(state.controlsTarget);
      setCameraTransform(camera, {
        position: state.cameraPosition,
        lookAt: state.controlsTarget,
      });
      controls.enableRotate = state.enableRotate;
      controls.enableZoom = state.enableZoom;
      controls.enablePan = state.enablePan;
      controls.minPolarAngle = state.minPolarAngle;
      controls.maxPolarAngle = state.maxPolarAngle;
      controls.mouseButtons = {
        LEFT: state.mouseButtons.LEFT,
        MIDDLE: state.mouseButtons.MIDDLE,
        RIGHT: state.mouseButtons.RIGHT,
      };

      controls.update();
      active = false;
      state = null;
    }
  };

  return {
    setEnabled,
  };
};
