import * as THREE from 'three';
import { colors } from '../../theme/theme';

const TARGET_PREVIEW_Z_OFFSET = 2;
const TARGET_PREVIEW_COLOR = colors.scene.targetPreview;
const TARGET_PREVIEW_CROSS_LENGTH = 100;
const TARGET_PREVIEW_CROSS_THICKNESS = 8;
const TARGET_PREVIEW_OPACITY = 0.8;

interface TargetCrosshairController {
  setEnabled: (enabled: boolean) => void;
  getGroundPointFromMouseEvent: (event: MouseEvent) => THREE.Vector3 | null;
  dispose: () => void;
}

interface CreateTargetCrosshairParams {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  domElement: HTMLCanvasElement;
  groundPlane: THREE.Mesh;
}

const createTargetPreview = (): THREE.Group => {
  const targetPreview: THREE.Group = new THREE.Group();

  const crossMaterial = new THREE.MeshBasicMaterial({
    color: TARGET_PREVIEW_COLOR,
    transparent: true,
    opacity: TARGET_PREVIEW_OPACITY,
  });

  const horizontalGeometry = new THREE.PlaneGeometry(
    TARGET_PREVIEW_CROSS_LENGTH,
    TARGET_PREVIEW_CROSS_THICKNESS
  );

  const horizontalLine = new THREE.Mesh(horizontalGeometry, crossMaterial);
  targetPreview.add(horizontalLine);

  const verticalGeometry = new THREE.PlaneGeometry(
    TARGET_PREVIEW_CROSS_THICKNESS,
    TARGET_PREVIEW_CROSS_LENGTH
  );

  const verticalLine = new THREE.Mesh(verticalGeometry, crossMaterial);
  targetPreview.add(verticalLine);

  targetPreview.visible = false;
  return targetPreview;
};

const disposeObjectResources = (object: THREE.Object3D): void => {
  const disposedMaterials = new Set<THREE.Material>();

  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }

    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach((item) => {
        if (item && !disposedMaterials.has(item)) {
          item.dispose();
          disposedMaterials.add(item);
        }
      });
    } else if (material) {
      if (!disposedMaterials.has(material)) {
        material.dispose();
        disposedMaterials.add(material);
      }
    }
  });
};

export const createTargetCrosshairController = ({
  scene,
  camera,
  domElement,
  groundPlane,
}: CreateTargetCrosshairParams): TargetCrosshairController => {
  const targetPreview = createTargetPreview();
  const raycaster = new THREE.Raycaster();
  let enabled = false;

  scene.add(targetPreview);

  const getMousePointer = (event: MouseEvent): THREE.Vector2 => {
    const rect = domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    return new THREE.Vector2(x, y);
  };

  const getGroundPointFromPointer = (
    pointer: THREE.Vector2
  ): THREE.Vector3 | null => {
    raycaster.setFromCamera(pointer, camera);

    const [groundIntersection] = raycaster.intersectObject(groundPlane);

    if (!groundIntersection) {
      return null;
    }

    return groundIntersection.point;
  };

  const updateTargetPreview = (groundPoint: THREE.Vector3): void => {
    targetPreview.visible = true;
    targetPreview.position.set(
      Math.round(groundPoint.x),
      Math.round(groundPoint.y),
      TARGET_PREVIEW_Z_OFFSET
    );
  };

  const handlePointerMove = (event: MouseEvent): void => {
    if (!enabled) {
      return;
    }

    const pointer = getMousePointer(event);
    const groundPoint = getGroundPointFromPointer(pointer);

    if (!groundPoint) {
      targetPreview.visible = false;
      return;
    }

    updateTargetPreview(groundPoint);
  };

  const handleMouseLeave = (): void => {
    targetPreview.visible = false;
  };

  domElement.addEventListener('pointermove', handlePointerMove);
  domElement.addEventListener('mouseleave', handleMouseLeave);

  return {
    setEnabled: (nextEnabled: boolean): void => {
      enabled = nextEnabled;
      if (!nextEnabled) {
        targetPreview.visible = false;
      }
    },
    getGroundPointFromMouseEvent: (event: MouseEvent): THREE.Vector3 | null => {
      const pointer = getMousePointer(event);
      return getGroundPointFromPointer(pointer);
    },
    dispose: (): void => {
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('mouseleave', handleMouseLeave);
      scene.remove(targetPreview);
      disposeObjectResources(targetPreview);
    },
  };
};
