import * as THREE from 'three';

interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

interface CameraTransform {
  position: Vector3Like;
  lookAt?: Vector3Like;
  direction?: Vector3Like;
}

interface CreateCameraForContainerParams {
  container: HTMLElement;
  fov: number;
  near: number;
  far: number;
  position: Vector3Like;
  lookAt: Vector3Like;
}

const toVector3 = (value: Vector3Like): THREE.Vector3 => {
  return new THREE.Vector3(value.x, value.y, value.z);
};

export const setCameraTransform = (
  camera: THREE.PerspectiveCamera,
  transform: CameraTransform
): void => {
  camera.position.set(
    transform.position.x,
    transform.position.y,
    transform.position.z
  );

  if (transform.lookAt) {
    camera.lookAt(transform.lookAt.x, transform.lookAt.y, transform.lookAt.z);
    return;
  }

  if (transform.direction) {
    const direction = toVector3(transform.direction).normalize();
    const lookTarget = camera.position.clone().add(direction);
    camera.lookAt(lookTarget);
  }
};

export const createCamera = ({
  container,
  fov,
  near,
  far,
  position,
  lookAt,
}: CreateCameraForContainerParams): THREE.PerspectiveCamera => {
  const aspect = container.clientWidth / container.clientHeight;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  setCameraTransform(camera, {
    position,
    lookAt,
  });

  return camera;
};
