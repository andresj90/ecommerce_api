import { HydratedDocument, ProductType } from "./product";

const insertNewProduct = (product: HydratedDocument<ProductType>) => product.save();

export { insertNewProduct }