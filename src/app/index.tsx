/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { Container } from '@mui/material';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { LOGIN_PATH, MY_BOTS_PATH, ROOT_PATH } from './constants/route';
import { Dashboard } from './pages/Dashboard/Loadable';
import { Login } from './pages/Login/Loadable';
import { MyBots } from './pages/MyBots';
import { AlertProvider } from './providers/AlertProvider';
import { AuthProvider } from './providers/AuthProvider';

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
              <Route exact path={ROOT_PATH} component={Dashboard} />
              <Route exact path={LOGIN_PATH} component={Login} />
              <Route exact path={MY_BOTS_PATH} component={MyBots} />
              <Route component={NotFoundPage} />
            </Switch>
          </Container>
        </AuthProvider>
      </AlertProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
