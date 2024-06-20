import { Container, Grid, styled } from '@mui/material';

import Footer from '@/components/Footer';
import Head from 'next/head';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageWelcomeUser from '@/content/Dashboards/Crypto/PageWelcomeUser';
import PrincipalLayout from '@/layouts/PrincipalLayout';
import SimulationPrognostic from '@/content/Dashboards/Crypto/SimulationPrognostic';

function DashboardCrypto() {
  return (
    <>
      <Head>
        <title>Gestion de Productos</title>
      </Head>
      <PageTitleWrapper>
        {/* <PageWelcomeUser userName={userName} /> */}
      </PageTitleWrapper>
      <Container maxWidth="lg" >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          style={{ marginRight: '300vh' }}
        >
          <Grid item xs={12}>
            <SimulationPrognostic />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <PrincipalLayout>{page}</PrincipalLayout>;

export default DashboardCrypto;
