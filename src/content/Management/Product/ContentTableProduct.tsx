import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import FormModifyProduct from './ModifyProduct';
import BulkActions from './BulkActions';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Product } from '@/models/product';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface ContentTableProductProps {
  product: Product[];
}

const ContentTableProduct: React.FC<ContentTableProductProps> = ({ product }) => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProducts, setSelectedSensors] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const selectedBulkActions = selectedProducts.length > 0;

  useEffect(() => {
    const token = Cookies.get('token_person');
    const storedUser = Cookies.get('user');
    console.log("Contenido de la cookie 'user':", storedUser);
    if (!token) {
      router.push(`/login`);
    }
  }, [router]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, product.length - page * rowsPerPage);

  const handleSelectSensor = (productName) => {
    setSelectedSensors((prevSelected) =>
      prevSelected.includes(productName)
        ? prevSelected.filter((name) => name !== productName)
        : [...prevSelected, productName]
    );
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <TextField id="outlined-search" label="Search field" type="search" />
              </FormControl>
            </Box>
          }
          title="PRODUCTOS REGISTRADOS"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Codigo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio Unit.</TableCell>
              <TableCell>Fecha Exp.</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.length > 0 ? (
              product.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                <TableRow hover key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProducts.includes(order.descripcion)}
                      onChange={() => handleSelectSensor(order.descripcion)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order.descripcion}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="text.primary" gutterBottom noWrap>
                      {order.codigo}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="text.primary" gutterBottom noWrap>
                      {order.estado_Producto}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="text.primary" gutterBottom noWrap>
                      {order.cantidad}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="text.primary" gutterBottom noWrap>
                      {order.precioxUnidad}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="text.primary" gutterBottom noWrap>
                      {order.fechaExpiracion}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Editar Producto" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.primary.lighter },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleEditClick(order)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="ELiminar Producto" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hay productos disponibles.
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={product.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      {isEditing && selectedProduct && (
        <FormModifyProduct product={selectedProduct} onClose={() => setIsEditing(false)} open={isEditing} />
      )}
    </Card>
  );
};

export default ContentTableProduct;
