import { EntityEditMenuDialog } from './EntityEditMenuDialog';
import { EntityEditMenuTrigger } from './EntityEditMenuTrigger';
import { EntityEditMenuProps } from './types';
import { useEntityEditMenuState } from './useEntityEditMenuState';

export const EntityEditMenu = ({
  title,
  name,
  position,
  disabled = false,
  mode = 'edit',
  onSave,
}: EntityEditMenuProps) => {
  const state = useEntityEditMenuState({
    name,
    x: position.x,
    y: position.y,
    onSave,
  });

  return (
    <>
      <EntityEditMenuTrigger
        title={title}
        disabled={disabled}
        mode={mode}
        onClick={state.handleOpen}
      />
      <EntityEditMenuDialog
        title={title}
        open={state.open}
        draftName={state.draftName}
        draftX={state.draftX}
        draftY={state.draftY}
        saving={state.saving}
        isInvalid={state.isInvalid}
        onClose={state.handleClose}
        onSave={state.handleSave}
        setDraftName={state.setDraftName}
        setDraftX={state.setDraftX}
        setDraftY={state.setDraftY}
      />
    </>
  );
};
