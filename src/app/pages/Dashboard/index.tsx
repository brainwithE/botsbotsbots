/**
 *
 * Dashboard
 * Landing Page to list all user's bots
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { AppBarHeader } from 'app/components/AppBarHeader';

import { BotDetails } from './components/BotDetails';
import { BotForm } from './components/BotForm';
import { BotList } from './components/BotList';
import { DashboardCta } from './components/DashboardCta';
import { DashboardProvider } from './provider';

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
