import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Typography,
  styled
} from '@mui/material';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BaseLayout from 'src/layouts/BaseLayout';
import Head from 'next/head';
import type { ReactElement } from 'react';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: auto;
    align-items: center;
    justify-content: center;
`
);

const TopWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
`
);

function Status404() {
  return (
    <>
      <Head>
        <title>Status - 404</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: 2 }}>
              <Box textAlign="center">
                <img alt="404" height={180} src="/static/images/status/404.svg" />
                <Typography variant="h2" sx={{ my: 2 }}>
                  La página que estabas buscando no existe.
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                  La url no esta disponibles, por favor ingrese una correcta
                </Typography>
              </Box>
              <Container maxWidth="sm">
                <Divider sx={{ my: 4 }}><ArrowDownwardIcon /></Divider>
                <Button href="/" variant="outlined">
                  Ir a pagina principal
                </Button>
              </Container>
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default Status404;

Status404.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
