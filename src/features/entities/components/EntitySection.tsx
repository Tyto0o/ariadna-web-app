import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { EntitySectionProps } from '../types/entities.types';
import { EntityItem } from './EntityItem';

export const EntitySection = ({
  title,
  entities,
  isOpen,
  onToggle,
  selectedId,
  onSelect,
  renderItemAction,
  icon,
  markerColor,
}: EntitySectionProps) => {
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
