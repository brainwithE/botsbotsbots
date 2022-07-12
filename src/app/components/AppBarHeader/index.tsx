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
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../providers/AuthProvider';

interface Props {}

export const AppBarHeader = memo((props: Props) => {
  const { logoutUser, isUserAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const logout = () => logoutUser();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Avatar
          src={'https://avatars.dicebear.com/api/bottts/botsbotsbots.svg'}
          alt="bot"
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BotsBotsBots
        </Typography>

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
              <MenuItem>Welcome email</MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
});
