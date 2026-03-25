import * as THREE from 'three';
import { Obstacle, Robot } from '../entities/types/entities.types';
import { colors } from '../../theme/theme';
import { setEntityNameLabel } from './entityNameLabel';

const ROBOT_HEIGHT = 80;
const ROBOT_RADIUS_BOTTOM = 50;
const ROBOT_RADIUS_TOP = 0;

const OBSTACLE_HEIGHT = 200;
const ENTITY_LABEL_HEIGHT_OFFSET = 45;

interface SceneEntitiesRuntime {
  syncRobots: (robots: Robot[]) => void;
  syncObstacles: (obstacles: Obstacle[]) => void;
  dispose: () => void;
}

type SceneEntityGroup = THREE.Group;

const syncEntityMap = <T extends { _id: string }>(
  scene: THREE.Scene,
  map: Map<string, SceneEntityGroup>,
  items: T[],
  createObject: (item: T) => SceneEntityGroup,
  updateObject: (object: SceneEntityGroup, item: T) => void
): void => {
  const nextIds = new Set(items.map((item) => item._id));

  map.forEach((object, id) => {
    if (!nextIds.has(id)) {
      scene.remove(object);
      object.traverse((node) => {
        const meshNode = node as THREE.Mesh;
        if (meshNode.geometry) {
          meshNode.geometry.dispose();
        }

        const nodeMaterial = (meshNode as THREE.Mesh).material;
        if (Array.isArray(nodeMaterial)) {
          nodeMaterial.forEach((material) => material.dispose());
        } else if (nodeMaterial) {
          nodeMaterial.dispose();
        }

        const spriteNode = node as THREE.Sprite;
        const spriteMap =
          spriteNode.material instanceof THREE.SpriteMaterial
            ? spriteNode.material.map
            : null;
        if (spriteMap) {
          spriteMap.dispose();
        }
      });
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

const createRobotEntity = (robot: Robot): SceneEntityGroup => {
  const geometry = new THREE.CylinderGeometry(
    ROBOT_RADIUS_BOTTOM,
    ROBOT_RADIUS_TOP,
    ROBOT_HEIGHT,
    24
  );

  geometry.rotateX(Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({ color: colors.scene.robot });
  const mesh = new THREE.Mesh(geometry, material);
  const group = new THREE.Group() as SceneEntityGroup;
  group.add(mesh);
  setEntityNameLabel(
    group,
    robot.name,
    ROBOT_HEIGHT / 2 + ENTITY_LABEL_HEIGHT_OFFSET,
    colors.scene.robot
  );
  return group;
};

const createObstacleEntity = (obstacle: Obstacle): SceneEntityGroup => {
  const geometry = new THREE.BoxGeometry(
    obstacle.width,
    obstacle.length,
    OBSTACLE_HEIGHT
  );
  const material = new THREE.MeshBasicMaterial({
    color: colors.scene.obstacle,
  });
  const mesh = new THREE.Mesh(geometry, material);
  const group = new THREE.Group() as SceneEntityGroup;
  group.add(mesh);
  setEntityNameLabel(
    group,
    obstacle.name,
    OBSTACLE_HEIGHT / 2 + ENTITY_LABEL_HEIGHT_OFFSET,
    colors.scene.obstacle
  );
  return group;
};

export const createSceneEntities = (
  scene: THREE.Scene
): SceneEntitiesRuntime => {
  const robotObjects = new Map<string, SceneEntityGroup>();
  const obstacleObjects = new Map<string, SceneEntityGroup>();

  const syncRobots = (robots: Robot[]): void => {
    syncEntityMap(
      scene,
      robotObjects,
      robots,
      (robot) => createRobotEntity(robot),
      (object, robot) => {
        object.position.set(
          robot.position.x,
          robot.position.y,
          ROBOT_HEIGHT / 2
        );
        setEntityNameLabel(
          object,
          robot.name,
          ROBOT_HEIGHT / 2 + ENTITY_LABEL_HEIGHT_OFFSET,
          colors.scene.robot
        );
      }
    );
  };

  const syncObstacles = (obstacles: Obstacle[]): void => {
    syncEntityMap(
      scene,
      obstacleObjects,
      obstacles,
      (obstacle) => createObstacleEntity(obstacle),
      (object, obstacle) => {
        object.position.set(
          obstacle.position.x,
          obstacle.position.y,
          OBSTACLE_HEIGHT / 2
        );
        setEntityNameLabel(
          object,
          obstacle.name,
          OBSTACLE_HEIGHT / 2 + ENTITY_LABEL_HEIGHT_OFFSET,
          colors.scene.obstacle
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
