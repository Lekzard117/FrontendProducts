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
    overflow: auto;
    flex-direction: column;
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

function Status500() {
  return (
    <>
      <Head>
        <title>Status - 500</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: 2 }}>
              <Box textAlign="center">
                <img
                  alt="500"
                  height={190}
                  src="/static/images/status/500.svg"
                />
                <Typography variant="h2" sx={{ my: 2 }}>
                  Hubo un error, por favor intenta nuevamente más tarde.
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                  El servidor encontró un error interno y no pudo completar su solicitud
                </Typography>
                <Divider sx={{ my: 4 }}><ArrowDownwardIcon /></Divider>
                <Button href="/" variant="outlined">
                  Ir a pagina principal
                </Button>
              </Box>
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default Status500;

Status500.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
