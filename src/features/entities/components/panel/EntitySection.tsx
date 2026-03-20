import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import {
  EntitySectionProps,
  Obstacle,
  Robot,
} from '../../types/entities.types';
import { EntityItem } from '../panel/EntityItem';

export const EntitySection = <T extends Robot | Obstacle>({
  title,
  entities,
  isOpen,
  onToggle,
  selectedId,
  onSelect,
  renderItemAction,
  headerAction,
  icon,
  markerColor,
}: EntitySectionProps<T>) => {
  const theme = useTheme();

  return (
    <>
      <ListItemButton
        aria-expanded={isOpen}
        onClick={onToggle}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          transition: 'background-color 0.2s',
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
        <ListItemText
          primary={title}
          secondary={`Total: ${entities.length}`}
          slotProps={{
            primary: {
              fontSize: '1.1em',
              fontWeight: 500,
            },
            secondary: {
              fontSize: '0.9em',
              color: theme.palette.text.secondary,
            },
          }}
        />
        {headerAction && (
          <Box sx={{ mr: 0.5 }} onClick={(event) => event.stopPropagation()}>
            {headerAction}
          </Box>
        )}
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {entities.map((entity) => (
            <EntityItem
              key={entity._id}
              entity={entity}
              isSelected={selectedId === entity._id}
              onClick={onSelect ? () => onSelect(entity._id) : undefined}
              action={renderItemAction ? renderItemAction(entity) : undefined}
              markerColor={markerColor}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};
