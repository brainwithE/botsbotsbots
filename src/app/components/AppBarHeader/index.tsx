/**
 *
 * AppBarHeader
 *
 */
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  ButtonBase,
} from '@mui/material';

import { MY_BOTS_PATH, ROOT_PATH } from 'app/constants/route';

import { useAuth } from '../../providers/AuthProvider';
import { LogoutConfirmationDialog } from './logoutConfirmationDialog';

interface Props {}

export const AppBarHeader = memo((props: Props) => {
  const { logoutUser, isUserAuthenticated, userProfile } = useAuth();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = React.useState(false);

  const handleLogout = () => {
    logoutUser();
    setIsLogoutConfirmOpen(false);
    history.push(ROOT_PATH);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenDialog = () => {
    setAnchorEl(null);
    setIsLogoutConfirmOpen(true);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <ButtonBase onClick={() => history.push(ROOT_PATH)}>
          <Avatar
            src={'https://avatars.dicebear.com/api/bottts/botsbotsbots.svg'}
            alt="bot"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BotsBotsBots
          </Typography>
        </ButtonBase>

        {isUserAuthenticated && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
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
              onClose={handleClose}
            >
              <MenuItem onClick={() => history.push(ROOT_PATH)}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => history.push(MY_BOTS_PATH)}>
                My Bots
              </MenuItem>
              <MenuItem onClick={handleOpenDialog}>
                Logout {userProfile.email}
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
      <LogoutConfirmationDialog
        open={isLogoutConfirmOpen}
        setOpen={setIsLogoutConfirmOpen}
        onLogout={handleLogout}
      />
    </AppBar>
  );
});
