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
import { useMyBots } from '../../provider';

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
    useMyBots();

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
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Avatar
            src={`https://avatars.dicebear.com/api/bottts/${selectedBot.key}.svg`}
            alt="bot"
            sx={{ height: '10em', width: '10em' }}
          />

          <Typography variant="h3" color="primary" align="center">
            {selectedBot.name}
          </Typography>

          <Typography
            variant="subtitle1"
            component="p"
            color="secondary"
            align="center"
            gutterBottom
            sx={{ fontStyle: 'italic' }}
          >
            "{selectedBot.catchphrase}"
          </Typography>

          {selectedBot.purpose && (
            <Typography variant="body1" align="center" gutterBottom>
              Purpose: {selectedBot.purpose}
            </Typography>
          )}

          <Typography
            variant="caption"
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
