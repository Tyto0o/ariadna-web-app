import {
  Box,
  Button,
  Dialog,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { MouseEventHandler } from 'react';

interface EntityEditMenuDialogProps {
  title: string;
  open: boolean;
  draftName: string;
  draftX: string;
  draftY: string;
  saving: boolean;
  isInvalid: boolean;
  onClose: () => void;
  onSave: MouseEventHandler<HTMLElement>;
  setDraftName: (value: string) => void;
  setDraftX: (value: string) => void;
  setDraftY: (value: string) => void;
}

export const EntityEditMenuDialog = ({
  title,
  open,
  draftName,
  draftX,
  draftY,
  saving,
  isInvalid,
  onClose,
  onSave,
  setDraftName,
  setDraftX,
  setDraftY,
}: EntityEditMenuDialogProps) => (
  <Dialog
    open={open}
    onClose={(_, reason) => {
      if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
        onClose();
      }
    }}
    slotProps={{
      backdrop: {
        sx: (theme) => ({
          backgroundColor: alpha(theme.palette.background.default, 0.72),
          backdropFilter: 'blur(8px)',
        }),
      },
      paper: {
        sx: {
          p: 2,
          minWidth: 300,
          borderRadius: 2.5,
        },
      },
    }}
  >
    <Stack spacing={1.25} sx={{ p: 0.25 }}>
      <Typography variant="subtitle2" fontWeight={600}>
        {title}
      </Typography>
      <TextField
        size="small"
        label="Name"
        value={draftName}
        onChange={(event) => setDraftName(event.target.value)}
        autoFocus
      />
      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          label="X"
          value={draftX}
          onChange={(event) => setDraftX(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">x</InputAdornment>
              ),
            },
          }}
        />
        <TextField
          size="small"
          label="Y"
          value={draftY}
          onChange={(event) => setDraftY(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">y</InputAdornment>
              ),
            },
          }}
        />
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button size="small" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={onSave}
          disabled={isInvalid || saving}
        >
          Save
        </Button>
      </Box>
    </Stack>
  </Dialog>
);
