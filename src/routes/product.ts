import { Router, NextFunction } from 'express';
import { IRequest, IResponse } from '@common/types';
import { ProductType } from '@models/product/product';
import { insertProduct } from '@controllers/product';
import { getAllProducts, updateProductById } from '@models/product/query';
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
      .send({ data: products, message: 'Product saved successfully' });
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
>('/:_id', async (req, res, next) => {
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
export { productRoute };
