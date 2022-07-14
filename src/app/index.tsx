/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { Login } from './pages/Login/Loadable';
import { Dashboard } from './pages/Dashboard/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from './providers/AuthProvider';
import { Container } from '@mui/material';
import { AlertProvider } from './providers/AlertProvider';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <AlertProvider>
        <AuthProvider>
          <Container disableGutters maxWidth="sm">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route component={NotFoundPage} />
            </Switch>
          </Container>
        </AuthProvider>
      </AlertProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
