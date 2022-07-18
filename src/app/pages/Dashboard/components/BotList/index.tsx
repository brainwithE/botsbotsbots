/**
 *
 * BotList
 *
 */
import React, { memo } from 'react';

import { List } from '@mui/material';

import { BotItemActionMenu } from 'app/components/BotItemActionMenu';
import { BotListItem } from 'app/components/BotListItem';
import { NotFound } from 'app/components/BotNotFound';

import { useDashboard } from '../../provider';

interface Props {}

export const BotList = memo((props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    botList,
    selectedBot,
    deleteBot,
    setSelectedBot,
    setIsBotFormOpen,
    setIsBotDetailsOpen,
  } = useDashboard();

  const handleMenu = (event, bot) => {
    setSelectedBot(bot);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedBot(null);
  };

  const handleView = async () => {
    setAnchorEl(null);
    setIsBotDetailsOpen(true);
  };

  const handleUpdate = async () => {
    setAnchorEl(null);
    setIsBotFormOpen(true);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    await deleteBot(selectedBot.key, selectedBot.createdBy.uid);
    setSelectedBot(null);
  };

  if (Object.keys(botList).length === 0) {
    return <NotFound label="No bot found" />;
  }

  return (
    <>
      <List>
        {Object.entries(botList).map(([key, bot]: any) => (
          <BotListItem
            showCreator
            key={key}
            botKey={key}
            bot={bot}
            onHandleMenu={handleMenu}
          />
        ))}
      </List>

      <BotItemActionMenu
        selectedBot={selectedBot}
        anchorEl={anchorEl}
        onViewBot={handleView}
        onCloseMenu={handleCloseMenu}
        onUpdateBot={handleUpdate}
        onDeleteBot={handleDelete}
      />
    </>
  );
});
