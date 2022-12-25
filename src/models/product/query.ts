import {
  HydratedDocument,
  ObjectId,
  ProductModel,
  ProductType
} from './product';

const insertNewProduct = (product: HydratedDocument<ProductType>) =>
  product.save({ checkKeys: true });

const getAllProducts = async () => ProductModel.find();

const updateProductById = async (product: HydratedDocument<ProductType>) =>
  ProductModel.findByIdAndUpdate(product._id, product, {
    timestamps: true,
    upsert: false,
    new: true
  });

const deleteProductById = async (id?: ObjectId) => {
  if (id) {
    return ProductModel.findByIdAndDelete(id);
  }
  return null;
};

const getProductById = async (id?: ObjectId) => {
  if (id) {
    return ProductModel.findById(id);
  }
  return null;
};

export {
  deleteProductById,
  getAllProducts,
  getProductById,
  insertNewProduct,
  updateProductById
};
