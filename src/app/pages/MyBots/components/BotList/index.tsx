/**
 *
 * BotList
 *
 */
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import { List, Button } from '@mui/material';

import { BotItemActionMenu } from 'app/components/BotItemActionMenu';
import { BotListItem } from 'app/components/BotListItem';
import { NotFound } from 'app/components/BotNotFound';
import { ROOT_PATH } from 'app/constants/route';

import { useMyBots } from '../../provider';

interface Props {}

export const BotList = memo((props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const {
    botList,
    selectedBot,
    deleteBot,
    setSelectedBot,
    setIsBotFormOpen,
    setIsBotDetailsOpen,
  } = useMyBots();

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
    return (
      <NotFound label="You don't own a bot">
        <Button
          onClick={() => history.push(ROOT_PATH)}
          variant="outlined"
          size="large"
        >
          GO TO DASHBOARD
        </Button>
      </NotFound>
    );
  }

  return (
    <>
      <List>
        {Object.entries(botList).map(([key, bot]: any) => (
          <BotListItem
            key={key}
            botKey={key}
            bot={bot}
            onHandleMenu={handleMenu}
            showCatchphrase
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
