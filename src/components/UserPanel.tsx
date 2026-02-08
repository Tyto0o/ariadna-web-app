import { ReactNode, useState } from 'react';
import { useTheme } from '@mui/material/styles';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';

interface Position {
  x: number;
  y: number;
}

interface Entity {
  _id: string;
  name: string;
  position: Position;
  width: number;
  length: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CollapsibleEntitySectionProps {
  title: string;
  entities: Entity[];
  isOpen: boolean;
  onToggle: () => void;
  icon: ReactNode;
  markerColor: string;
}

const CollapsibleEntitySection = ({
  title,
  entities,
  isOpen,
  onToggle,
  icon,
  markerColor,
}: CollapsibleEntitySectionProps) => {
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
            <ListItem
              key={entity._id}
              sx={{
                pl: 4,
                backgroundColor: theme.palette.background.light,
                borderBottom: `1px solid ${theme.palette.divider}`,
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
                secondary={`Pos: (${entity.position.x}, ${entity.position.y}) | Size: ${entity.width}x${entity.length}`}
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
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export const UserPanel = () => {
  const theme = useTheme();
  const [robotsOpen, setRobotsOpen] = useState(false);
  const [objectsOpen, setObjectsOpen] = useState(false);

  const robots: Entity[] = [];
  const objects: Entity[] = [];

  return (
    <List
      sx={{
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        paddingTop: 0,
      }}
    >
      <ListSubheader
        sx={{
          textAlign: 'center',
          fontSize: '1.4em',
          fontWeight: 600,
          padding: '8px',
          borderBottom: `2px solid ${theme.palette.divider}`,
          letterSpacing: '0.5px',
        }}
      >
        User Panel
      </ListSubheader>

      <CollapsibleEntitySection
        title="Robots"
        entities={robots}
        isOpen={robotsOpen}
        onToggle={() => setRobotsOpen((prev) => !prev)}
        icon={<SmartToyIcon sx={{ color: theme.palette.info.light }} />}
        markerColor={theme.palette.info.light}
      />

      <CollapsibleEntitySection
        title="Objects"
        entities={objects}
        isOpen={objectsOpen}
        onToggle={() => setObjectsOpen((prev) => !prev)}
        icon={<CategoryIcon sx={{ color: theme.palette.success.light }} />}
        markerColor={theme.palette.success.light}
      />
    </List>
  );
};
