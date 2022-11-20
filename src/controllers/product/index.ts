import { ProductModel } from '../../models';
import { insertNewProduct } from '../../models/product/query';
import { ProductType, HydratedDocument } from '../../models/product/product';

const insertProduct = async (product: ProductType) => {
  const newProduct: HydratedDocument<ProductType> = new ProductModel(product);
  try {
    const document = await insertNewProduct(newProduct);
    return document ? document : null;
  } catch (error) {
    console.error(error?.message);
  }
};

export { insertProduct };
