import { HydratedDocument, ProductType, ProductModel } from './product';

const insertNewProduct = (product: HydratedDocument<ProductType>) =>
  product.save({ checkKeys: true });

const getAllProducts = async () => ProductModel.find();

const updateProductById = async (product: HydratedDocument<ProductType>) =>
  ProductModel.findByIdAndUpdate(product._id, product, {
    timestamps: true,
    upsert: false,
    new: true
  });

export { insertNewProduct, getAllProducts, updateProductById };
