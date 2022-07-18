/**
 *
 * NotFound for Bots
 *
 */
import React, { memo } from 'react';

import { Typography, Grid, Avatar } from '@mui/material';

interface Props {
  label: string;
  children?: React.ReactNode;
}

export const NotFound = memo((props: Props) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{ minHeight: '90vh' }}
    >
      <Avatar
        src={'https://avatars.dicebear.com/api/bottts/notfound.svg'}
        alt="bot"
        sx={{ height: '10em', width: '10em' }}
      />

      <Typography variant="h5" align="center" gutterBottom sx={{ mb: '1em' }}>
        {props.label}
      </Typography>

      {props.children}
    </Grid>
  );
});
