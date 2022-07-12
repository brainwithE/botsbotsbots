/**
 *
 * Login
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { LoginForm } from './components/LoginForm';
import { LoginProvider } from './provider';
import { Container, Grid, Avatar, Typography } from '@mui/material';

interface Props {}

export function Login(props: Props) {
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Log user" />
      </Helmet>

      <LoginProvider>
        <Container maxWidth="sm">
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            sx={{ minHeight: '100vh' }}
          >
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

            <LoginForm />
          </Grid>
        </Container>
      </LoginProvider>
    </>
  );
}
