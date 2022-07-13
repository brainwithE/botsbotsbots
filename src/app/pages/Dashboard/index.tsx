/**
 *
 * Dashboard
 *
 */
import * as React from 'react';
import { AppBarHeader } from 'app/components/AppBarHeader';
import { PageTitle } from 'app/components/PageTitle';

import { BotList } from './components/BotList';
import { DashboardProvider } from './provider';
import { DashboardCta } from './components/DashboardCta';

interface Props {}

export function Dashboard(props: Props) {
  return (
    <DashboardProvider>
      <AppBarHeader />
      <PageTitle>Dashboard</PageTitle>
      <BotList />
      <DashboardCta />
    </DashboardProvider>
  );
}
