import { Router, NextFunction } from 'express';
import { IRequest, IResponse } from '@common/types';
import { ProductType } from '@models/product/product';
import { insertProduct } from '@controllers/product';
import { getAllProducts } from '@models/product/query';
import { Document } from 'mongoose';

const productRoute = Router();

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

export { productRoute };
