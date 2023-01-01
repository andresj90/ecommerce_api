import {
  newProductWithId,
  updatedProduct,
  updatedProductWrongId
} from '@routes/products/product.mockData';
import { agent } from 'supertest';
import {
  clearDatabase,
  connect,
  disconnect
} from '../../db/mock-db-connection';
import { app } from '../../index';

describe('Product Endpoint', () => {
  beforeAll(async () => {
    await connect();
  });
  afterAll(async () => {
    await disconnect();
  });
  describe('Collection With Documents', () => {
    describe('GET ALL', () => {
      beforeAll(async () => {
        await agent(app).post('/products').send({ data: newProductWithId });
      });

      afterAll(async () => {
        await clearDatabase();
      });

      it('should return all docs in the collection', async () => {
        const response = await agent(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.data).toHaveLength(1);
      });
    });

    describe('DELETE', () => {
      beforeAll(async () => {
        await agent(app).post('/products').send({ data: newProductWithId });
      });

      afterAll(async () => {
        await clearDatabase();
      });

      it('should delete product doc and return it if id matches', async () => {
        const response = await agent(app).delete(
          `/products/${newProductWithId['_id']}`
        );
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.data).toMatchObject(newProductWithId);
      });
    });

    describe('GET By Id', () => {
      beforeAll(async () => {
        await agent(app).post('/products').send({ data: newProductWithId });
      });

      afterAll(async () => {
        await clearDatabase();
      });

      it('should return specific product doc by id', async () => {
        const response = await agent(app).get(
          `/products/${newProductWithId['_id']}`
        );

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.data).toMatchObject(newProductWithId);
      });
    });

    describe('PUT', () => {
      beforeAll(async () => {
        await agent(app).post('/products').send({ data: newProductWithId });
      });

      afterAll(async () => {
        await clearDatabase();
      });

      it('should update product doc and return it if id matches', async () => {
        const response = await agent(app)
          .put(`/products/${newProductWithId['_id']}`)
          .send({ data: updatedProduct });

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.data).toMatchObject(updatedProduct);
      });
    });
  });
  describe('Collection Without Documents', () => {
    afterAll(async () => {
      await clearDatabase();
    });
    describe('GET ALL', () => {
      it('should return empty array if collection has no docs', async () => {
        const response = await agent(app).get('/products');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.data).toEqual([]);
      });
    });

    describe('DELETE', () => {
      it('should return 204 if product does not exist', async () => {
        const response = await agent(app).delete(
          `/products/6382b75f1a7bc791ab06c60b`
        );

        expect(response.status).toBe(204);
        expect(response.headers['content-type']).toBeUndefined();
        expect(response.body.data).toBeUndefined();
      });
    });

    describe('GET By Id', () => {
      it('should return null if not doc is found by id', async () => {
        const response = await agent(app).get(
          `/products/6382b75f1a7bc791ab06c60b`
        );

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body.data).toBeNull();
      });
    });

    describe('PUT', () => {
      it('should not update if not prodduct is found by id', async () => {
        const response = await agent(app)
          .put(`/products/6382b75f1a7bc791ab06c60b`)
          .send({ data: updatedProductWrongId });

        expect(response.status).toBe(204);
        expect(response.headers['content-type']).toBeUndefined();
        expect(response.body.data).toBeUndefined();
      });
    });
  });
});
