import { ProductType } from '@models/product/product';
import {
  clearDatabase,
  connect,
  disconnect
} from '../../db/mock-db-connection';
import {
  newProduct,
  productWithRequiredFields
} from '../../routes/products/product.mockData';
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

      expect(doc).toHaveProperty('_id');
    });
    it('should reject if object has not required fields', async () => {
      const insertProductSpy = jest.spyOn(controller, 'insertProduct');
      await controller.insertProduct({} as ProductType);

      expect(insertProductSpy).toThrow();
    });
  });
});
