/**
 *
 * PageTitle
 *
 */
import React, { memo } from 'react';

import { Grid, Typography } from '@mui/material';

interface Props {
  title: string;
}

export const PageTitle = memo((props: Props) => {
  const { ...rest } = props;

  return (
    <Grid container>
      <Typography variant="h4" sx={{ p: 2 }} {...rest}>
        {props.title}
      </Typography>
    </Grid>
  );
});
