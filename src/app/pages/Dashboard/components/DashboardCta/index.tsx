/**
 *
 * DashboardCta
 *
 */
import { Button } from '@mui/material';
import React, { memo } from 'react';
import { useDashboard } from '../../provider';

interface Props {}

export const DashboardCta = memo((props: Props) => {
  const { createBot } = useDashboard();

  const handleInsert = async () => {
    await createBot();
  };

  return <Button onClick={() => handleInsert()}>bot insert</Button>;
});
