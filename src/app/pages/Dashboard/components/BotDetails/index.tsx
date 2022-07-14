/**
 *
 * BotDetails
 *
 */
import React, { memo } from 'react';

import {
  Avatar,
  Container,
  Grid,
  Dialog,
  Slide,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useDashboard } from '../../provider';

interface Props {}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const BotDetails = memo((props: Props) => {
  const { isBotDetailsOpen, setIsBotDetailsOpen, selectedBot, setSelectedBot } =
    useDashboard();

  const handleClose = () => {
    setIsBotDetailsOpen(false);
    setSelectedBot(null);
  };

  if (!selectedBot) return null;

  return (
    <Dialog
      open={isBotDetailsOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Container sx={{ padding: '2em' }}>
        <Grid container justifyContent="center">
          <Avatar
            src={`https://avatars.dicebear.com/api/bottts/${selectedBot.key}.svg`}
            alt="bot"
            sx={{ height: '10em', width: '10em' }}
          />

          <Typography variant="h3" color="primary" align="center">
            {selectedBot.name}
          </Typography>

          <Typography variant="subtitle2" color="secondary" align="center">
            "{selectedBot.catchphrase}"
          </Typography>

          <Typography
            variant="body2"
            color="gray"
            align="center"
            sx={{ mt: '2em' }}
          >
            Powered by: {selectedBot.createdBy.email}
          </Typography>
        </Grid>
      </Container>
    </Dialog>
  );
});
