import { Avatar, Grid, Typography } from '@mui/material';

import React from 'react';
import { useTheme } from '@mui/material/styles';

function PageWelcomeUser({ userName }) {
  console.log(userName);
  

  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          // alt={user ? user.name : 'Invitado'}
          // src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenido, {userName}!
        </Typography>
        <Typography variant="subtitle2">
          Gracias por hacer uso de nuestro programa!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageWelcomeUser;
