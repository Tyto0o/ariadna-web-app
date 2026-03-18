import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';
import { useTheme } from '@mui/material/styles';
import { EntityItemProps } from '../types/entities.types';

export const EntityItem = ({
  entity,
  markerColor,
  isSelected,
  onClick,
  action,
}: EntityItemProps) => {
  const theme = useTheme();

  return (
    <ListItem
      disablePadding
      sx={{
        backgroundColor: theme.palette.background.light,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <ListItemButton
        selected={Boolean(isSelected)}
        onClick={onClick}
        sx={{
          pl: 4,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 32 }}>
          <CircleIcon sx={{ fontSize: 8, color: markerColor }} />
        </ListItemIcon>
        <ListItemText
          primary={entity.name}
          secondary={`Pos: (${Math.round(entity.position.x)}, ${Math.round(entity.position.y)})`}
          slotProps={{
            primary: {
              fontSize: '1em',
              fontWeight: 500,
            },
            secondary: {
              fontSize: '0.75em',
              color: theme.palette.text.secondary,
            },
          }}
        />
        {action && <Box sx={{ ml: 1 }}>{action}</Box>}
      </ListItemButton>
    </ListItem>
  );
};
