import { type AlertColor } from '@mui/material';
import { createContext } from 'react';

export type SnackbarType = AlertColor;
export type SnackbarDuration = number | null;

export type SnackbarContextValue = {
  showSnackbar: (
    message: string,
    type?: SnackbarType,
    duration?: SnackbarDuration
  ) => void;
};

export const SnackbarContext = createContext<SnackbarContextValue | null>(null);
