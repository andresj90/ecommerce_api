import { Router, Request, Response } from 'express';
import { IParams, IRequest, IResponse } from '@models/product/types';
import { ProductType } from '@models/product/product';
import { insertProduct } from '@controllers/product';

const productRoute = Router();

productRoute.get('/', (req: Request, res: Response) => {
  //const products =
  //res.status(200).send(products)
});

productRoute.post<never, any, IRequest<ProductType>, never>(
  '/',
  async (req, res) => {
    try {
      const product = req.body?.data;
      const headers = req.headers;
      console.log({ product, headers });
      const doc = await insertProduct(product);
      return doc ? res.status(201).send(doc) : res.status(400);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
);

export { productRoute };
