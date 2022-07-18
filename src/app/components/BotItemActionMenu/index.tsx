/**
 *
 * BotItemActionMenu
 *
 */
import React, { memo } from 'react';

import { Menu, MenuItem } from '@mui/material';

import { useAuth } from 'app/providers/AuthProvider';

interface Props {
  anchorEl: HTMLElement | null;
  onCloseMenu: () => void;
  onViewBot: () => void;
  onUpdateBot: () => void;
  onDeleteBot: () => void;
  selectedBot: any;
}

export const BotItemActionMenu = memo((props: Props) => {
  const {
    anchorEl,
    onCloseMenu,
    onViewBot,
    onUpdateBot,
    onDeleteBot,
    selectedBot,
  } = props;

  const { userProfile } = useAuth();

  if (!selectedBot) return null;

  return (
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
      onClose={onCloseMenu}
    >
      <MenuItem onClick={onViewBot}>View Bot</MenuItem>
      <MenuItem
        onClick={onUpdateBot}
        disabled={userProfile.uid !== selectedBot.createdBy.uid}
      >
        Edit Bot
      </MenuItem>
      <MenuItem
        onClick={onDeleteBot}
        disabled={userProfile.uid !== selectedBot.createdBy.uid}
      >
        Delete Bot
      </MenuItem>
    </Menu>
  );
});
