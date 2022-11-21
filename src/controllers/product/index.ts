import { ProductModel } from '../../models';
import { insertNewProduct } from '../../models/product/query';
import { ProductType, HydratedDocument } from '@models/product/product';

const insertProduct = (product: ProductType) => {
  const newProduct: HydratedDocument<ProductType> = new ProductModel(product);
  return insertNewProduct(newProduct);
};

export { insertProduct };
