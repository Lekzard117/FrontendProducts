import * as React from 'react';
import * as yup from 'yup';

import { useEffect, useState } from 'react';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import api from '@/utils/api/apiPerson';
import { renderMessage } from '@/utils/api/utilities/formErrors';
import { useRouter } from 'next/router';

// import { ThemeProvider, createTheme } from '@mui/material/styles';

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();
interface Errors {
  clave?: string;
}
const schema = yup.object().shape({
  clave: yup
    .string()
    .test(
      'uppercase',
      'La contraseña debe contener al menos una letra mayúscula',
      (value) => {
        if (!value) return true;
        return /[A-Z]/.test(value);
      }
    )
    .test(
      'lowercase',
      'La contraseña debe contener al menos una letra minúscula',
      (value) => {
        if (!value) return true;
        return /[a-z]/.test(value);
      }
    )
    .test(
      'number',
      'La contraseña debe contener al menos un número',
      (value) => {
        if (!value) return true;
        return /\d/.test(value);
      }
    )
    .test(
      'special character',
      'La contraseña debe contener al menos un carácter especial',
      (value) => {
        if (!value) return true;
        return /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/]/.test(value);
      }
    )
    .test(
      'min length',
      'La contraseña debe tener al menos 8 caracteres',
      (value) => {
        if (!value) return true;
        return value.length >= 8;
      }
    )
});

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({
    correo: '',
    clave: ''
  });

  useEffect(() => {
    const token = Cookies.get('token_person');
    const storedUser = Cookies.get('user');
    console.log("Contenido de la cookie 'user':", storedUser);
    if (token) {
      router.push(`/management-product`);
    }
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.login(formData);
      const { token, user } = response.data;

      Cookies.set('token_person', token);
      Cookies.set('user', user);

      if (user) {
        router.push(`/management-product`);
      }
    } catch (error) {
      if (error.response) {
        setLoginError('Credenciales incorrectas. Por favor, intente nuevamente.');
      } else if (error.request) {
        router.push('/status/500');
      } else {
        setLoginError('Ocurrió un error inesperado. Por favor, intente nuevamente.');
      }
    }
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setLoginError('');
    if (name === 'clave') {
      if (!value) {
        setIsPasswordValid(false);
        return;
      }
      schema
        .validate({ [name]: value })
        .then(() => {
          setErrors({ ...errors, [name]: '' });
          setIsPasswordValid(true);
        })
        .catch((error) => {
          setErrors({ ...errors, [name]: error.errors[0] });
          setIsPasswordValid(false);
        });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h3" fontFamily="Helvetica">
            Iniciar Sesión
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="correo"
                label="Correo electronico"
                name="correo"
                autoComplete="correo"
                autoFocus
                type="search"
                value={formData.correo}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="clave"
                label="Clave"
                name="clave"
                autoComplete="current-password"
                type={showPassword ? 'text' : 'clave'}
                value={formData.clave}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <div className="">
                {renderMessage({
                  errors,
                  fieldName: 'clave'
                })}
              </div>
              {loginError && (
                <div
                  style={{
                    color: 'red',
                    marginTop: '10px',
                    fontSize: '0.8rem'
                  }}
                >
                  {loginError}
                </div>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isPasswordValid}
                style={{
                  opacity: isPasswordValid ? 1 : 0.7,
                  backgroundColor: '#007bff'
                }}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Grid>
    </Grid>
    // </ThemeProvider>
  );
}
