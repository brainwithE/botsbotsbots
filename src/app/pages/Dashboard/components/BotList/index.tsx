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
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useDashboard } from '../../provider';
import { useAuth } from 'app/providers/AuthProvider';
import { BotItemActionMenu } from './botItemActionMenu';

interface Props {}

export const BotList = memo((props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    botList,
    selectedBot,
    updateBot,
    deleteBot,
    setSelectedBot,
    setIsBotFormOpen,
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

  const handleUpdate = async () => {
    setIsBotFormOpen(true);
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    await deleteBot(selectedBot.key);
    setAnchorEl(null);
  };

  if (Object.keys(botList).length === 0)
    return <Typography variant="body1">No bot found</Typography>;

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
        onCloseMenu={handleCloseMenu}
        onUpdateBot={handleUpdate}
        onDeleteBot={handleDelete}
      />
    </>
  );
});
