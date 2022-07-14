/**
 *
 * Dashboard
 *
 */
import * as React from 'react';
import { AppBarHeader } from 'app/components/AppBarHeader';

import { BotList } from './components/BotList';
import { DashboardProvider } from './provider';
import { DashboardCta } from './components/DashboardCta';
import { BotForm } from './components/BotForm';
import { BotDetails } from './components/BotDetails';
import { Helmet } from 'react-helmet-async';

interface Props {}

export function Dashboard(props: Props) {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Generate random bot name" />
      </Helmet>

      <DashboardProvider>
        <AppBarHeader />
        <BotList />
        <BotForm />
        <BotDetails />
        <DashboardCta />
      </DashboardProvider>
    </>
  );
}
