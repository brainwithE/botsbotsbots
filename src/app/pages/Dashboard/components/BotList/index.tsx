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

interface Props {}

export const BotList = memo((props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeBot, setActiveBot] = React.useState<any>();

  const { botList, updateBot, deleteBot } = useDashboard();

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
  };

  const handleDelete = async e => {
    e.stopPropagation();
    await deleteBot(activeBot.key);
  };

  if (Object.keys(botList).length === 0)
    return <Typography variant="body1">No bot found</Typography>;

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {Object.entries(botList).map(([key, bot]: any) => (
        <ListItem
          key={key}
          alignItems="flex-start"
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={e => handleMenu(e, { key, bot })}
            >
              <MoreVertIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar
              src={`https://avatars.dicebear.com/api/bottts/${bot.name}.svg`}
              alt="bot"
            />
          </ListItemAvatar>
          <ListItemText
            primary={key}
            secondary={`${bot.name}— ${bot.description}`}
          />
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
