/**
 *
 * PageTitle
 *
 */
import React, { memo } from 'react';

import { Grid, Typography } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export const PageTitle = memo((props: Props) => {
  const { ...rest } = props;
  return (
    <Grid container>
      <Typography variant="h4" {...rest}>
        {props.children}
      </Typography>
    </Grid>
  );
});
