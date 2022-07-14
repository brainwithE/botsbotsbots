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
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useDashboard } from '../../provider';
import { useAuth } from 'app/providers/AuthProvider';

interface Props {}

export const BotList = memo((props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeBot, setActiveBot] = React.useState<any>();

  const { botList, updateBot, deleteBot } = useDashboard();
  const { isUserAuthenticated } = useAuth();

  const handleMenu = (event, bot) => {
    setActiveBot(bot);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUpdate = async e => {
    e.stopPropagation();

    await updateBot(activeBot.key);
    setAnchorEl(null);
  };

  const handleDelete = async e => {
    e.stopPropagation();

    await deleteBot(activeBot.key);
    setAnchorEl(null);
  };

  if (Object.keys(botList).length === 0)
    return <Typography variant="body1">No bot found</Typography>;

  return (
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
                onClick={e => handleMenu(e, { key, bot })}
              >
                <MoreVertIcon />
              </IconButton>
            )
          }
        >
          <ListItemAvatar>
            <Avatar
              src={`https://avatars.dicebear.com/api/bottts/${bot.name}.svg`}
              alt="bot"
            />
          </ListItemAvatar>
          <ListItemText primary={bot.name} secondary={`"${bot.catchphrase}"`} />
        </ListItem>
      ))}
      <Menu
        id="menu-bot-action"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleUpdate}>Edit Bot</MenuItem>
        <MenuItem onClick={handleDelete}>Delete Bot</MenuItem>
      </Menu>
    </List>
  );
});
