/**
 *
 * LoginHeader
 *
 */
import React, { memo } from 'react';
import { Grid, Avatar, Typography } from '@mui/material';

interface Props {}

export const LoginHeader = memo((props: Props) => {
  return (
    <Grid
      item
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar
        src={'https://avatars.dicebear.com/api/bottts/botsbotsbots.svg'}
        alt="bot"
        sx={{ height: '5em', width: '5em' }}
      />
      <Typography variant="h1" sx={{ fontSize: '2em' }}>
        BotsBotsBots
      </Typography>
    </Grid>
  );
});
