import * as THREE from 'three';
import { colors } from '../../theme/theme';

const ENTITY_LABEL_BORDER_COLOR = colors.scene.textBorder;
const ENTITY_LABEL_FONT_SIZE = 42;
const ENTITY_LABEL_FONT_FAMILY = 'Inter, Arial, sans-serif';
const ENTITY_LABEL_PADDING_X = 22;
const ENTITY_LABEL_PADDING_Y = 14;
const ENTITY_LABEL_LINE_WIDTH = 4;

const groupLabels = new WeakMap<THREE.Group, THREE.Sprite>();
interface EntityNameLabelProps {
  name: string;
  color: string;
  heightOffset: number;
}

const groupLabelProps = new WeakMap<THREE.Group, EntityNameLabelProps>();

const createEntityNameLabel = (name: string, color: string): THREE.Sprite => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Unable to create 2D context for entity label');
  }

  context.font = `600 ${ENTITY_LABEL_FONT_SIZE}px ${ENTITY_LABEL_FONT_FAMILY}`;

  const textWidth = Math.ceil(context.measureText(name).width);
  canvas.width = textWidth + ENTITY_LABEL_PADDING_X * 2;
  canvas.height = ENTITY_LABEL_FONT_SIZE + ENTITY_LABEL_PADDING_Y * 2;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = `600 ${ENTITY_LABEL_FONT_SIZE}px ${ENTITY_LABEL_FONT_FAMILY}`;
  context.textBaseline = 'middle';
  context.textAlign = 'center';

  context.strokeStyle = ENTITY_LABEL_BORDER_COLOR;
  context.lineWidth = ENTITY_LABEL_LINE_WIDTH;
  context.lineJoin = 'round';
  context.strokeText(name, canvas.width / 2, canvas.height / 2);

  context.fillStyle = color;
  context.fillText(name, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  });

  const label = new THREE.Sprite(material);
  const worldHeight = 50;
  const worldWidth = Math.max(
    (canvas.width / canvas.height) * worldHeight,
    120
  );
  label.scale.set(worldWidth, worldHeight, 1);

  return label;
};

export const setEntityNameLabel = (
  group: THREE.Group,
  name: string,
  heightOffset: number,
  color: string
): void => {
  const nextProps: EntityNameLabelProps = {
    name,
    color,
    heightOffset,
  };

  const previousProps = groupLabelProps.get(group);
  const previousLabel = groupLabels.get(group);

  if (previousLabel && previousProps) {
    const nameUnchanged = previousProps.name === nextProps.name;
    const colorUnchanged = previousProps.color === nextProps.color;
    const heightOffsetUnchanged =
      previousProps.heightOffset === nextProps.heightOffset;

    if (nameUnchanged && colorUnchanged && heightOffsetUnchanged) {
      return;
    }

    if (nameUnchanged && colorUnchanged && !heightOffsetUnchanged) {
      previousLabel.position.set(0, 0, heightOffset);
      groupLabelProps.set(group, nextProps);
      return;
    }
  }

  if (previousLabel) {
    const spriteMaterial = previousLabel.material;

    if (spriteMaterial instanceof THREE.SpriteMaterial && spriteMaterial.map) {
      spriteMaterial.map.dispose();
    }

    if (spriteMaterial instanceof THREE.Material) {
      spriteMaterial.dispose();
    }

    group.remove(previousLabel);
  }

  const label = createEntityNameLabel(name, color);
  label.position.set(0, 0, heightOffset);
  group.add(label);
  groupLabels.set(group, label);
  groupLabelProps.set(group, nextProps);
};
