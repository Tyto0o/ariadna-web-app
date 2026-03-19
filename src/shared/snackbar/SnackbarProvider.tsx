import { Alert, type AlertColor, Snackbar } from '@mui/material';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type SnackbarType = AlertColor;
export type SnackbarDuration = number | null;

type SnackbarState = {
  open: boolean;
  message: string;
  type: SnackbarType;
  duration: SnackbarDuration;
};

type SnackbarContextValue = {
  showSnackbar: (
    message: string,
    type?: SnackbarType,
    duration?: SnackbarDuration
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

const INITIAL_STATE: SnackbarState = {
  open: false,
  message: '',
  type: 'info',
  duration: 3500,
};

function normalizeDuration(duration: SnackbarDuration): SnackbarDuration {
  if (duration === Infinity || duration === Number.POSITIVE_INFINITY) {
    return null;
  }

  return duration;
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState>(INITIAL_STATE);

  const showSnackbar = useCallback(
    (
      message: string,
      type: SnackbarType = 'info',
      duration: SnackbarDuration = 3500
    ) => {
      setSnackbar({
        open: true,
        message,
        type,
        duration: normalizeDuration(duration),
      });
    },
    []
  );

  function handleClose() {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }

  const value = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context;
}
