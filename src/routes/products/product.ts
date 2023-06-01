import { NextFunction, Router } from 'express';
import { Document, HydratedDocument } from 'mongoose';

import { IRequest, IResponse } from '@common/types';
import { insertProduct } from '@controllers/product';
import { ProductType } from '@models/product/product';
import {
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProductById
} from '@models/product/query';

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
        const data = await insertProduct(product);
        const statusCode = data ? 201 : 204;
        const message = data
            ? 'Product successfully saved'
            : 'Product not saved';

        res.status(statusCode).send({ data, message }).end();
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
        res.status(200)
            .send({
                data: products,
                message: `products found ${products.length}`
            })
            .end();
    } catch (error) {
        next(error);
    }
});

productRoute.get<never, IResponse<Document | null>, never, never, NextFunction>(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await getProductById(id);

            const message = data ? 'Product found' : 'Product not found';

            res.status(200).send({ data, message }).end();
        } catch (error) {
            next(error);
        }
    }
);

productRoute.put<
    never,
    IResponse<Document | null>,
    IRequest<HydratedDocument<ProductType>>,
    never,
    NextFunction
>('/:id', async (req, res, next) => {
    try {
        const product = req.body.data;
        const data = await updateProductById(product);
        const statusCode = data ? 200 : 204;
        const message = data
            ? 'Product successfully updated'
            : 'Product not found';

        return res
            .status(statusCode)
            .send({
                data,
                message
            })
            .end();
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
        const data = await deleteProductById(id);
        const message = data
            ? 'Product successfully removed'
            : 'Product not found';
        const statusCode = data ? 200 : 204;

        res.status(statusCode).send({ data, message }).end();
    } catch (error) {
        next(error);
    }
});

export { productRoute };
