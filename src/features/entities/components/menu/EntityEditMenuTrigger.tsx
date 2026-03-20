import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { MouseEventHandler } from 'react';

interface EntityEditMenuTriggerProps {
  title: string;
  disabled: boolean;
  mode?: 'edit' | 'add';
  onClick: MouseEventHandler<HTMLElement>;
}

export const EntityEditMenuTrigger = ({
  title,
  disabled,
  mode = 'edit',
  onClick,
}: EntityEditMenuTriggerProps) => {
  const actionLabel = mode === 'add' ? 'Add' : 'Edit';
  const lowerCaseTitle = title.toLowerCase();

  return (
    <Tooltip title={`${actionLabel} ${lowerCaseTitle}`}>
      <span>
        <IconButton
          size="small"
          aria-label={`${actionLabel} ${lowerCaseTitle}`}
          onClick={onClick}
          disabled={disabled}
        >
          {mode === 'add' ? (
            <AddOutlinedIcon fontSize="small" />
          ) : (
            <EditOutlinedIcon fontSize="small" />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};
