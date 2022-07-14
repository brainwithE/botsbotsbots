/**
 *
 * BotList
 *
 */
import React, { memo } from 'react';
import { List, Typography, Grid } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import { useMyBots } from '../../provider';
import { useAuth } from 'app/providers/AuthProvider';
import { BotListItem } from 'app/components/BotListItem';
import { BotItemActionMenu } from 'app/components/BotItemActionMenu';

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
  } = useMyBots();

  const { isUserAuthenticated } = useAuth();

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

  if (Object.keys(botList).length === 0)
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        sx={{ minHeight: '30vh' }}
      >
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: '5em' }} color="error" />

        <Typography variant="h5" align="center">
          Bot not found
        </Typography>

        {!isUserAuthenticated && (
          <Typography variant="body1" align="center">
            Login to generate random bot.
          </Typography>
        )}
      </Grid>
    );

  return (
    <>
      <List sx={{ pb: '10em' }}>
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
