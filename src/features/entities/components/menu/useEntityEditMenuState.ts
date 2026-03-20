import { MouseEvent, useMemo, useState } from 'react';
import { EntityEditFormData } from './types';

interface UseEntityEditMenuStateParams {
  name: string;
  x: number;
  y: number;
  onSave: (data: EntityEditFormData) => Promise<void>;
}

export const useEntityEditMenuState = ({
  name,
  x,
  y,
  onSave,
}: UseEntityEditMenuStateParams) => {
  const [open, setOpen] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [draftX, setDraftX] = useState(x.toString());
  const [draftY, setDraftY] = useState(y.toString());
  const [saving, setSaving] = useState(false);

  const isInvalid = useMemo(() => {
    const parsedX = Number(draftX);
    const parsedY = Number(draftY);
    return (
      !draftName.trim() ||
      !Number.isFinite(parsedX) ||
      !Number.isFinite(parsedY)
    );
  }, [draftName, draftX, draftY]);

  const resetDraft = () => {
    setDraftName(name);
    setDraftX(x.toString());
    setDraftY(y.toString());
  };

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    resetDraft();
    setOpen(true);
  };

  const handleClose = () => {
    if (!saving) {
      setOpen(false);
    }
  };

  const handleSave = async (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (isInvalid || saving) {
      return;
    }

    setSaving(true);
    try {
      await onSave({
        name: draftName.trim(),
        position: {
          x: Number(draftX),
          y: Number(draftY),
        },
      });
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return {
    open,
    saving,
    isInvalid,
    draftName,
    draftX,
    draftY,
    setDraftName,
    setDraftX,
    setDraftY,
    handleOpen,
    handleClose,
    handleSave,
  };
};
