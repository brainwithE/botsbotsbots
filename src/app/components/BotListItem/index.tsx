/**
 *
 * BotListItem
 *
 */
import {
  ListItem,
  ListItemAvatar,
  Typography,
  Avatar,
  ListItemText,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from 'app/providers/AuthProvider';
import React, { memo } from 'react';

interface Props {
  botKey: string;
  bot: any;
  onHandleMenu: (event, bot) => void;
}

export const BotListItem = memo((props: Props) => {
  const { isUserAuthenticated } = useAuth();
  const { botKey, bot, onHandleMenu } = props;

  return (
    <ListItem
      key={botKey}
      alignItems="flex-start"
      secondaryAction={
        isUserAuthenticated && (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={event => onHandleMenu(event, { key: botKey, ...bot })}
          >
            <MoreVertIcon />
          </IconButton>
        )
      }
    >
      <ListItemAvatar>
        <Avatar
          src={`https://avatars.dicebear.com/api/bottts/${botKey}.svg`}
          alt="bot"
        />
      </ListItemAvatar>

      <ListItemText
        primary={bot.name}
        secondary={
          <>
            {bot.purpose && (
              <Typography
                component="span"
                variant="caption"
                color="text.primary"
                sx={{ display: 'block' }}
              >
                Purpose: {bot.purpose}
              </Typography>
            )}
            "{bot.catchphrase}"
          </>
        }
      />
    </ListItem>
  );
});
