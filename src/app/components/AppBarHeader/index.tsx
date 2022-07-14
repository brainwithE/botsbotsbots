/**
 *
 * AppBarHeader
 *
 */
import React, { memo } from 'react';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../providers/AuthProvider';
import { LogoutConfirmationDialog } from './logoutConfirmationDialog';
import { useHistory } from 'react-router-dom';

interface Props {}

export const AppBarHeader = memo((props: Props) => {
  const { logoutUser, isUserAuthenticated, userProfile } = useAuth();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = React.useState(false);

  const handleLogout = () => {
    logoutUser();
    setIsLogoutConfirmOpen(false);
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
        <ButtonBase onClick={() => history.push('/')}>
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
              <MenuItem onClick={() => history.push('/')}>Dashboard</MenuItem>
              <MenuItem onClick={() => history.push('/my-bots')}>
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
