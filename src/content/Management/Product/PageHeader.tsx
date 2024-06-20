//import Head from 'next/head';
import {
    Button,
    Grid,
    Container,
    CardContent
} from '@mui/material';

import SidebarLayout from '@/layouts/SidebarLayout';
import FormSaveProduct from './SaveProduct';
import { useState } from 'react';


function ModalProduct() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <CardContent>
                            <br />
                            <Button
                                sx={{ mt: { xs: 2, md: 0 } }}
                                variant="contained"
                                onClick={handleClickOpen}>
                                Registrar Producto
                            </Button>
                            <FormSaveProduct
                                //selectedValue={selectedValue}
                                open={open}
                                onClose={handleClose}
                            />
                        </CardContent>

                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
ModalProduct.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default ModalProduct;