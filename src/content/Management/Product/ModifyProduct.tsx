import { CardContent, Divider, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import { useState, useEffect } from 'react';
import * as React from 'react';
import api from '@/utils/api/apiProduct';
import { Product } from '@/models/product';

interface FormModifyProductProps {
  onClose: () => void;
  open: boolean;
  product: Product;
}

const FormModifyProduct: React.FC<FormModifyProductProps> = ({ onClose, open, product }) => {
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    descripcion: '',
    codigo: '',
    cantidad: '',
    precioxUnidad: '',
    fechaExpiracion: '',
    external_id: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        descripcion: product.descripcion,
        codigo: product.codigo.toString(),
        cantidad: product.cantidad.toString(),
        precioxUnidad: product.precioxUnidad.toString(),
        fechaExpiracion: product.fechaExpiracion,
        external_id: product.external_id
      });
    }
  }, [product]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validación simple
    if (!formData.descripcion || !formData.codigo || !formData.cantidad || !formData.precioxUnidad || !formData.fechaExpiracion) {
      setFormError('Todos los campos son obligatorios.');
      return;
    }

    const modifiedData = {
      external_id: formData.external_id,
      descripcion: formData.descripcion,
      codigo: parseInt(formData.codigo, 10),
      cantidad: parseInt(formData.cantidad, 10),
      precioxUnidad: parseFloat(formData.precioxUnidad),
      fechaExpiracion: formData.fechaExpiracion
    };

    try {
      const response = await api.modifyProduct(modifiedData);
      console.log('Formulario enviado con éxito:', response);
      // Redirigir o hacer algo después de enviar
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setFormError('Ocurrió un error al enviar el formulario.');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormError('');
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Registro de Producto</DialogTitle>
      <List sx={{ pt: 0 }}>
        <Grid item xs={12}>
          <Divider />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div>
                <TextField
                  id="descripcion"
                  label="Descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="codigo"
                  label="Codigo del producto"
                  name="codigo"
                  autoComplete="codigo"
                  autoFocus
                  value={formData.codigo}
                  onChange={handleChange}
                  type="number"
                  required
                />
                <TextField
                  id="cantidad"
                  label="Cantidad del producto"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  type="number"
                  required
                />
                <TextField
                  id="precioxUnidad"
                  label="Precio por Unidad"
                  name="precioxUnidad"
                  value={formData.precioxUnidad}
                  onChange={handleChange}
                  type="number"
                  inputProps={{ step: "0.01" }}
                  required
                />
              </div>
              <br />
              <div>
                <TextField
                  id="fechaExpiracion"
                  label="Fecha de expiracion"
                  name="fechaExpiracion"
                  autoComplete="fechaExpiracion"
                  type="date"
                  value={formData.fechaExpiracion}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                  required
                />
                {formError && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '10px',
                      fontSize: '0.8rem',
                    }}
                  >
                    {formError}
                  </div>
                )}
              </div>
              <br />
              <Button
                type="submit"
                sx={{ mt: { xs: 2, md: 0 } }}
                color="success"
                variant="contained"
              >
                Guardar
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </List>
    </Dialog>
  );
};

FormModifyProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default FormModifyProduct;
