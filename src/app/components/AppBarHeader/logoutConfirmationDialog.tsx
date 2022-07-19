/**
 *
 * LogoutConfirmationDialog
 *
 */

import React, { Dispatch, memo, SetStateAction } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onLogout: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const LogoutConfirmationDialog = memo((props: Props) => {
  const { open, setOpen, onLogout } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onLogout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
