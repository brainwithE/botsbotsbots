/**
 * Alert Provider
 * Provider for Alerts - Success, Errors, and Warnings
 */

import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface Props {
  children: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertContext = React.createContext<any>({});

export function useAlert() {
  return React.useContext(AlertContext);
}

export function AlertProvider(props: Props): JSX.Element {
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState();
  const [duration, setDuration] = React.useState(5000);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;

    setMessage('');
    setDuration(5000);
    setIsSnackbarOpen(false);
  };

  const alert = (message, variant, duration = 6000) => {
    setMessage(message);
    setSeverity(variant);
    setDuration(duration);
    setIsSnackbarOpen(true);
  };

  return (
    <AlertContext.Provider value={{ alert }}>
      {props.children}

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackbarOpen}
        autoHideDuration={duration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}
