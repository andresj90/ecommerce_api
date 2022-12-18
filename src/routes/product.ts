import { IRequest, IResponse } from '@common/types';
import { insertProduct } from '@controllers/product';
import { ProductType } from '@models/product/product';
import {
  deleteProductById,
  getAllProducts,
  updateProductById
} from '@models/product/query';
import { NextFunction, Router } from 'express';
import { Document, HydratedDocument } from 'mongoose';

const productRoute = Router();

productRoute.post<
  never,
  IResponse<Document>,
  IRequest<ProductType>,
  never,
  NextFunction
>('/', async (req, res, next) => {
  try {
    const product = req.body?.data;
    const doc = await insertProduct(product);

    return doc
      ? res
          .status(201)
          .send({ data: doc, message: 'Product saved successfully' })
      : res.status(400);
  } catch (error) {
    next(error);
  }
});

productRoute.get<
  never,
  IResponse<ReadonlyArray<Document>>,
  never,
  never,
  NextFunction
>('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    return res
      .status(201)
      .send({ data: products, message: `products found ${products.length}` });
  } catch (error) {
    next(error);
  }
});

productRoute.put<
  never,
  IResponse<Document | null>,
  IRequest<HydratedDocument<ProductType>>,
  never,
  NextFunction
>('/:id', async (req, res, next) => {
  try {
    const product = req.body.data;
    const updatedProduct = await updateProductById(product);
    return res.status(200).send({
      data: updatedProduct,
      message: updatedProduct
        ? 'Product successfully updated'
        : 'Product not found'
    });
  } catch (error) {
    next(error);
  }
});

productRoute.delete<
  never,
  IResponse<Document | null>,
  never,
  never,
  NextFunction
>('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await deleteProductById(id);
    doc
      ? res
          .status(200)
          .send({ data: doc, message: 'Product successfully removed' })
      : res.status(204).send({ data: doc, message: 'Product Not found' });
  } catch (error) {
    next(error);
  }
});

export { productRoute };
