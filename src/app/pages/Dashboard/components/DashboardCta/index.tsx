/**
 *
 * DashboardCta
 *
 */
import { Button } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'app/providers/AuthProvider';
import React, { memo } from 'react';
import { useDashboard } from '../../provider';
import { LoadingButton } from '@mui/lab';

interface Props {}

export const DashboardCta = memo((props: Props) => {
  const { createBot, isProcessing } = useDashboard();
  const { isUserAuthenticated } = useAuth();
  const history = useHistory();

  const handleInsert = async () => {
    await createBot();
    window.scrollTo(0, 0);
  };

  const buttonAction = () => {
    if (!isUserAuthenticated) {
      return (
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => history.push('/login')}
        >
          LOGIN TO GENERATE A BOT
        </Button>
      );
    }

    return (
      <LoadingButton
        loading={isProcessing}
        variant="outlined"
        size="large"
        fullWidth
        onClick={() => handleInsert()}
      >
        GENERATE RANDOM BOT
      </LoadingButton>
    );
  };

  return (
    <Sheet
      variant="solid"
      color="neutral"
      sx={{
        p: 4,
        position: 'sticky',
        bottom: 0,
        width: '100%',
        background: '#fff',
      }}
    >
      {buttonAction()}
    </Sheet>
  );
});
