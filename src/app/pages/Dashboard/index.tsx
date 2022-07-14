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

interface Props {}

export function Dashboard(props: Props) {
  return (
    <DashboardProvider>
      <AppBarHeader />
      <BotList />
      <BotForm />
      <DashboardCta />
    </DashboardProvider>
  );
}
