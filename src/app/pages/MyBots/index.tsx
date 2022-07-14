/**
 *
 * MyBots
 *
 */
import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import { AppBarHeader } from 'app/components/AppBarHeader';

interface Props {}

export const MyBots = memo((props: Props) => {
  return (
    <>
      <Helmet>
        <title>My Bots</title>
        <meta name="description" content="My list of bots" />
      </Helmet>

      <AppBarHeader />
    </>
  );
});
