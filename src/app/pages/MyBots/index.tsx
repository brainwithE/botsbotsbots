/**
 *
 * MyBots
 * List all bots of current user logged in
 *
 */
import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import { AppBarHeader } from 'app/components/AppBarHeader';

import { BotDetails } from './components/BotDetails';
import { BotForm } from './components/BotForm';
import { BotList } from './components/BotList';
import { MyBotsProvider } from './provider';

interface Props {}

export const MyBots = memo((props: Props) => {
  return (
    <>
      <Helmet>
        <title>My Bots</title>
        <meta name="description" content="My list of bots" />
      </Helmet>

      <MyBotsProvider>
        <AppBarHeader />
        <BotList />
        <BotDetails />
        <BotForm />
      </MyBotsProvider>
    </>
  );
});
