import { useState } from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CategoryIcon from '@mui/icons-material/Category';
import { useTheme } from '@mui/material/styles';
import { Obstacle, Robot } from '../types/entities.types';
import { EntitySection } from './EntitySection';

export const UserPanel = () => {
  const theme = useTheme();

  const [robotsOpen, setRobotsOpen] = useState(false);
  const [obstaclesOpen, setObstaclesOpen] = useState(false);

  const robots: Robot[] = [];
  const obstacles: Obstacle[] = [];

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

      <EntitySection
        title="Robots"
        entities={robots}
        isOpen={robotsOpen}
        onToggle={() => setRobotsOpen((prev) => !prev)}
        icon={<SmartToyIcon sx={{ color: theme.palette.icons.robot }} />}
        markerColor={theme.palette.info.light}
      />

      <EntitySection
        title="Obstacles"
        entities={obstacles}
        isOpen={obstaclesOpen}
        onToggle={() => setObstaclesOpen((prev) => !prev)}
        icon={<CategoryIcon sx={{ color: theme.palette.icons.obstacle }} />}
        markerColor={theme.palette.success.light}
      />
    </List>
  );
};
