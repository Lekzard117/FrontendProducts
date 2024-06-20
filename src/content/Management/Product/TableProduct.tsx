import { useEffect, useState } from 'react';

import { Card } from '@mui/material';
import ContentTableProduct from './ContentTableProduct';
import { Product } from '@/models/product';
import api from '@/utils/api/apiProduct';

function TablePerson() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await api.listProduct();
      setProducts(products);
      console.log(products);
    };

    fetchProducts();
  }, []);
  return (
    <Card>
      <ContentTableProduct product={products} />
    </Card>
  );
}

export default TablePerson;