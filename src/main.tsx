import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from './shared/snackbar/SnackbarProvider';
import App from './App';
import theme from './theme/theme';
import store from './store';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
