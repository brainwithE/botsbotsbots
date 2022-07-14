/**
 *
 * MyBots
 *
 */
import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import { AppBarHeader } from 'app/components/AppBarHeader';
import { MyBotsProvider } from './provider';
import { BotList } from './components/BotList';
import { BotDetails } from './components/BotDetails';
import { BotForm } from './components/BotForm';

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
