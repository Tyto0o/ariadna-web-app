import { Position } from '../../types/entities.types';

export interface EntityEditFormData {
  name: string;
  position: Position;
}

export interface EntityEditMenuProps {
  title: string;
  name: string;
  position: Position;
  disabled?: boolean;
  mode?: 'edit' | 'add';
  onSave: (data: EntityEditFormData) => Promise<void>;
}
