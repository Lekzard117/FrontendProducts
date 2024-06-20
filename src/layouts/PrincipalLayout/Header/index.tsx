import {
  Avatar,
  Box,
  Button,
  Typography,
  alpha,
  lighten,
  styled,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import HeaderUserbox from './Userbox';
import { useRouter } from 'next/router';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: center;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
  const theme = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { query } = router;
  const userName = query.name || '';

  useEffect(() => {
    const token = Cookies.get('token_person');
    const role = Cookies.get('role');
    if (token && role) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  
  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
              lighten(theme.colors.primary.main, 0.7),
              0.15
            )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
              theme.colors.alpha.black[100],
              0.2
            )}, 0px 5px 22px -4px ${alpha(
              theme.colors.alpha.black[100],
              0.1
            )}`
      }}
    >
      <Box display="absolute">
        <Typography style={{ color: 'black', fontWeight: 'bold', fontSize: '24px' }}>Sistema de Gestion de Productos</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {!isAuthenticated ? (
          <>
            <Button href="/login" variant="outlined">
              Iniciar sesion
            </Button>
            <Button sx={{ margin: 1 }} color="secondary">
              Registrarse
            </Button>
          </>
        ) : (
          <HeaderUserbox userName={userName}/>
        )}
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
