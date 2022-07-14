/**
 *
 * BotList
 *
 */
import React, { memo } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import { useDashboard } from '../../provider';
import { useAuth } from 'app/providers/AuthProvider';
import { BotItemActionMenu } from './botItemActionMenu';

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

    await deleteBot(selectedBot.key);
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
      <List>
        {Object.entries(botList).map(([key, bot]: any) => (
          <ListItem
            key={key}
            alignItems="flex-start"
            secondaryAction={
              isUserAuthenticated && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={e => handleMenu(e, { key, ...bot })}
                >
                  <MoreVertIcon />
                </IconButton>
              )
            }
          >
            <ListItemAvatar>
              <Avatar
                src={`https://avatars.dicebear.com/api/bottts/${key}.svg`}
                alt="bot"
              />
            </ListItemAvatar>
            <ListItemText
              primary={bot.name}
              secondary={`"${bot.catchphrase}"`}
            />
          </ListItem>
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
