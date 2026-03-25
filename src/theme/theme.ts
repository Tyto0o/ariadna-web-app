import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    light: string;
    darker: string;
  }

  interface Palette {
    icons: {
      robot: string;
      obstacle: string;
    };
  }

  interface PaletteOptions {
    icons?: {
      robot: string;
      obstacle: string;
    };
  }
}

export const colors = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#fff',
  },
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#fff',
  },
  background: {
    default: '#0a0a0a',
    paper: '#1a1a1a',
    light: '#121212',
    darker: '#0d0d0d',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  divider: '#2d2d2d',
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
  },
  icons: {
    robot: '#42a5f5',
    obstacle: '#66bb6a',
  },
  scene: {
    gridPrimary: '#000',
    gridSecondary: '#999',
    background: '#fff',
    groundPlane: '#fff',
    path: '#0697b1',
    pathDots: '#0697b1',
    robot: '#4dabf5',
    obstacle: '#7cc37c',
    targetPreview: '#636061',
    textBorder: '#000000',
  },
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    text: colors.text,
    divider: colors.divider,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    icons: colors.icons,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.darker,
          color: colors.text.primary,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
