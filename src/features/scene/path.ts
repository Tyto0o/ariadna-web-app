import * as THREE from 'three';
import { Position } from '../entities/types/entities.types';
import { colors } from '../../theme/theme';

const PATH_Z_OFFSET = 0.01;
const PATH_COLOR = colors.scene.path;
const PATH_DOT_COLOR = colors.scene.pathDots;
const PATH_DOT_RADIUS = 6;

interface ScenePathRuntime {
  syncPath: (path: Position[]) => void;
  dispose: () => void;
}

export const createScenePath = (scene: THREE.Scene): ScenePathRuntime => {
  let pathObject: THREE.Line | null = null;
  let pathDotsObject: THREE.InstancedMesh | null = null;

  const disposePathObjects = (): void => {
    if (pathObject) {
      scene.remove(pathObject);
      pathObject.geometry.dispose();
      const material = pathObject.material;
      if (Array.isArray(material)) {
        material.forEach((item) => item.dispose());
      } else {
        material.dispose();
      }
      pathObject = null;
    }

    if (pathDotsObject) {
      scene.remove(pathDotsObject);
      pathDotsObject.geometry.dispose();
      const dotsMaterial = pathDotsObject.material;
      if (Array.isArray(dotsMaterial)) {
        dotsMaterial.forEach((item) => item.dispose());
      } else {
        dotsMaterial.dispose();
      }
      pathDotsObject = null;
    }
  };

  const syncPath = (path: Position[]): void => {
    disposePathObjects();

    if (path.length < 2) {
      return;
    }

    const points = path.map(
      ({ x, y }) => new THREE.Vector3(x, y, PATH_Z_OFFSET)
    );
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: PATH_COLOR,
      linewidth: 3,
    });

    pathObject = new THREE.Line(geometry, material);
    scene.add(pathObject);

    const dotPoints = points;
    const dotsGeometry = new THREE.CircleGeometry(PATH_DOT_RADIUS, 12);
    const dotsMaterial = new THREE.MeshBasicMaterial({
      color: PATH_DOT_COLOR,
    });

    pathDotsObject = new THREE.InstancedMesh(
      dotsGeometry,
      dotsMaterial,
      dotPoints.length
    );

    const instanceMatrix = new THREE.Matrix4();
    dotPoints.forEach((point, index) => {
      instanceMatrix.makeTranslation(point.x, point.y, PATH_Z_OFFSET + 1);
      pathDotsObject?.setMatrixAt(index, instanceMatrix);
    });

    if (pathDotsObject) {
      pathDotsObject.instanceMatrix.needsUpdate = true;
      scene.add(pathDotsObject);
    }
  };

  return {
    syncPath,
    dispose: disposePathObjects,
  };
};
