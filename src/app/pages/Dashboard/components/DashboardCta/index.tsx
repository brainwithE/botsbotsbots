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

interface Props {}

export const DashboardCta = memo((props: Props) => {
  const { createBot } = useDashboard();
  const { isUserAuthenticated } = useAuth();
  const history = useHistory();

  const handleInsert = async () => {
    await createBot();
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
          Login
        </Button>
      );
    }

    return (
      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={() => handleInsert()}
      >
        Add Bot
      </Button>
    );
  };

  return (
    <Sheet variant="solid" color="neutral" sx={{ p: 4 }}>
      {buttonAction()}
    </Sheet>
  );
});
