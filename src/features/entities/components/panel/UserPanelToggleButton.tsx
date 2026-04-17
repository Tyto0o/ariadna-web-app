import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import { IconButton, Tooltip } from '@mui/material';

interface UserPanelToggleButtonProps {
  panelOpen: boolean;
  onToggle: () => void;
}

export const UserPanelToggleButton = ({
  panelOpen,
  onToggle,
}: UserPanelToggleButtonProps) => {
  return (
    <Tooltip title={panelOpen ? 'Hide user panel' : 'Show user panel'}>
      <IconButton
        aria-label={panelOpen ? 'Hide user panel' : 'Show user panel'}
        aria-expanded={panelOpen}
        onClick={onToggle}
        sx={{
          position: 'absolute',
          top: 16,
          left: 0,
          transform: 'translateX(-100%)',
          zIndex: 12,
          backgroundColor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRight: 0,
          borderRadius: '12px 0 0 12px',
          transition: 'background-color 160ms ease',
          '&:hover': {
            backgroundColor: 'background.hover',
          },
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            transition: 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)',
            transform: panelOpen ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        >
          <ChevronRightIcon />
        </Box>
      </IconButton>
    </Tooltip>
  );
};
