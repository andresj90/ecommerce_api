import { ProductType } from '@models/product/product';
import {
  connect,
  disconnect,
  clearDatabase
} from '../../db/mock-db-connection';
import { newProduct, productWithRequiredFields } from './__data__/';
import * as controller from './index';

describe('Product Controller', () => {
  beforeAll(async () => {
    await connect();
  });
  afterAll(async () => {
    await disconnect();
  });
  afterEach(async () => {
    await clearDatabase();
  });
  describe('Create Product', () => {
    it('should create a new Product if all fields are set', async () => {
      const doc = await controller.insertProduct(newProduct);
      expect(doc).toHaveProperty('_id');
    });
    it('should create with required fields only', async () => {
      const doc = await controller.insertProduct(productWithRequiredFields);
      console.log(doc);
      expect(doc).toHaveProperty('_id');
    });
    it('should reject if object has not required fields', async () => {
      const insertProductSpy = jest.spyOn(controller, 'insertProduct');
      const doc = await controller.insertProduct({} as ProductType);
      console.log(doc);
      expect(insertProductSpy).toThrowError();
    });
  });
});
