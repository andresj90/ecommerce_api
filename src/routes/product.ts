import { Router, Request, Response } from 'express';
import { IParams, IRequest, IResponse } from '../models/product/types';
import { ProductType } from '../models/product/product';
import { insertProduct } from '@controllers/product';

const productRouter = Router();

productRouter.get('/', (req: Request, res: Response) => {
  //const products =
  //res.status(200).send(products)
});

productRouter.post<never, any, IRequest<ProductType>, never>(
  '/',
  (req, res) => {
    const product = req.body.data;
    const headers = req.headers;
    console.log(headers);
    const createdProduct = insertProduct(product);
  }
);
