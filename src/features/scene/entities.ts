import * as THREE from 'three';
import { Obstacle, Robot } from '../entities/types/entities.types';
import { colors } from '../../theme/theme';

const ROBOT_HEIGHT = 80;
const ROBOT_RADIUS_BOTTOM = 50;
const ROBOT_RADIUS_TOP = 0;

const OBSTACLE_HEIGHT = 200;

interface SceneEntitiesRuntime {
  syncRobots: (robots: Robot[]) => void;
  syncObstacles: (obstacles: Obstacle[]) => void;
  dispose: () => void;
}

const syncEntityMap = <T extends { _id: string }>(
  scene: THREE.Scene,
  map: Map<string, THREE.Mesh>,
  items: T[],
  createObject: (item: T) => THREE.Mesh,
  updateObject: (object: THREE.Mesh, item: T) => void
): void => {
  const nextIds = new Set(items.map((item) => item._id));

  map.forEach((object, id) => {
    if (!nextIds.has(id)) {
      scene.remove(object);
      if ((object as THREE.Mesh).geometry) {
        (object as THREE.Mesh).geometry.dispose();
      }
      const material = (object as THREE.Mesh).material;
      if (Array.isArray(material)) {
        material.forEach((m) => m.dispose());
      } else if (material) {
        material.dispose();
      }
      map.delete(id);
    }
  });

  items.forEach((item) => {
    const existing = map.get(item._id);
    if (existing) {
      updateObject(existing, item);
      return;
    }

    const object = createObject(item);
    updateObject(object, item);
    map.set(item._id, object);
    scene.add(object);
  });
};

const createRobotMesh = (): THREE.Mesh => {
  const geometry = new THREE.CylinderGeometry(
    ROBOT_RADIUS_BOTTOM,
    ROBOT_RADIUS_TOP,
    ROBOT_HEIGHT,
    24
  );

  geometry.rotateX(Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({ color: colors.scene.robot });
  return new THREE.Mesh(geometry, material);
};

const createObstacleMesh = (obstacle: Obstacle): THREE.Mesh => {
  const geometry = new THREE.BoxGeometry(
    obstacle.width,
    obstacle.length,
    OBSTACLE_HEIGHT
  );
  const material = new THREE.MeshBasicMaterial({
    color: colors.scene.obstacle,
  });
  return new THREE.Mesh(geometry, material);
};

export const createSceneEntities = (
  scene: THREE.Scene
): SceneEntitiesRuntime => {
  const robotObjects = new Map<string, THREE.Mesh>();
  const obstacleObjects = new Map<string, THREE.Mesh>();

  const syncRobots = (robots: Robot[]): void => {
    syncEntityMap(
      scene,
      robotObjects,
      robots,
      () => createRobotMesh(),
      (object, robot) => {
        object.position.set(
          robot.position.x,
          robot.position.y,
          ROBOT_HEIGHT / 2
        );
      }
    );
  };

  const syncObstacles = (obstacles: Obstacle[]): void => {
    syncEntityMap(
      scene,
      obstacleObjects,
      obstacles,
      (obstacle) => createObstacleMesh(obstacle),
      (object, obstacle) => {
        object.position.set(
          obstacle.position.x,
          obstacle.position.y,
          OBSTACLE_HEIGHT / 2
        );
      }
    );
  };

  const dispose = (): void => {
    syncRobots([]);
    syncObstacles([]);
  };

  return {
    syncRobots,
    syncObstacles,
    dispose,
  };
};
