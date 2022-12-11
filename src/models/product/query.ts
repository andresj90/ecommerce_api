import { HydratedDocument, ProductType, ProductModel } from './product';

const insertNewProduct = (product: HydratedDocument<ProductType>) =>
  product.save({ checkKeys: true });

const getAllProducts = async () => ProductModel.find();

export { insertNewProduct, getAllProducts };
