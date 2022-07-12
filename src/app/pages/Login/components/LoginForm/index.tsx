import * as React from 'react';

import { Grid, Divider, Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useLogin } from '../../provider';

export function LoginForm() {
  const { loginUser, loading } = useLogin();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const onSubmit = () => {
    loginUser(values);
  };

  return (
    <>
      <Grid item sx={{ width: '100%' }}>
        <ValidatorForm onSubmit={onSubmit}>
          <TextValidator
            id="outlined-adornment-email"
            type="text"
            value={values.email}
            onChange={handleChange('email')}
            fullWidth
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            label="Email"
            margin="normal"
          />

          <TextValidator
            id="outlined-adornment-password"
            type="password"
            fullWidth
            value={values.password}
            onChange={handleChange('password')}
            label="Password"
            validators={['required']}
            errorMessages={['this field is required']}
            margin="normal"
          />

          <Divider variant="middle" sx={{ margin: '2em' }} />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            LOGIN
          </Button>
        </ValidatorForm>
      </Grid>
    </>
  );
}
