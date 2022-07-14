/**
 *
 * BotForm
 *
 */
import React, { memo, useEffect, useState } from 'react';

import {
  Container,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Sheet } from '@mui/joy';
import { TransitionProps } from '@mui/material/transitions';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useDashboard } from '../../provider';

interface Props {}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const BotForm = memo((props: Props) => {
  const {
    isBotFormOpen,
    setIsBotFormOpen,
    selectedBot,
    isProcessing,
    updateBot,
    setSelectedBot
  } = useDashboard();

  const [formValues, setFormValues] = useState({
    name: '',
    catchphrase: '',
  });

  useEffect(() => {
    if (selectedBot) {
      setFormValues(selectedBot);
    }
  }, [selectedBot]);

  const handleCloseForm = () => {
    setIsBotFormOpen(false);
    setSelectedBot(null);
  };

  const handleFormSubmit = async () => {
    await updateBot(selectedBot.key, formValues);
    handleCloseForm();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Dialog
      fullScreen
      open={isBotFormOpen}
      onClose={handleCloseForm}
      TransitionComponent={Transition}
    >
      <AppBar position="relative" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseForm}
            aria-label="close"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Update Bot
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: '30px' }}>
        <ValidatorForm onSubmit={() => handleFormSubmit()}>
          <TextValidator
            value={formValues.name || ''}
            margin="normal"
            name="name"
            onChange={handleChange}
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <TextValidator
            margin="normal"
            name="catchphrase"
            value={formValues.catchphrase || ''}
            onChange={handleChange}
            id="name"
            label="Catchphrase"
            type="text"
            fullWidth
            variant="outlined"
            validators={['required']}
            errorMessages={['this field is required']}
          />

          <Sheet variant="solid" color="neutral" sx={{ p: 2 }}>
            <LoadingButton
              loading={isProcessing}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </LoadingButton>
          </Sheet>
        </ValidatorForm>
      </Container>
    </Dialog>
  );
});
