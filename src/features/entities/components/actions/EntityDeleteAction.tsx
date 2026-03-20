import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

interface EntityDeleteActionProps {
  title: string;
  disabled?: boolean;
  onDelete: () => Promise<void>;
}

export const EntityDeleteAction = ({
  title,
  disabled = false,
  onDelete,
}: EntityDeleteActionProps) => (
  <Tooltip title={`Delete ${title.toLowerCase()}`}>
    <span>
      <IconButton
        size="small"
        aria-label={`Delete ${title.toLowerCase()}`}
        disabled={disabled}
        onClick={async (event) => {
          event.stopPropagation();
          await onDelete();
        }}
      >
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </span>
  </Tooltip>
);
