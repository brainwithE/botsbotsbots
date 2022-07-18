/**
 *
 * Login
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { Container, Grid } from '@mui/material';

import { LoginForm } from './components/LoginForm';
import { LoginHeader } from './components/LoginHeader';
import { LoginProvider } from './provider';

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
            <LoginHeader />
            <LoginForm />
          </Grid>
        </Container>
      </LoginProvider>
    </>
  );
}
