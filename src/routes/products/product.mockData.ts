import { ProductType } from '@models/product/product';

export const newProduct: ProductType = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 3.9,
    count: 120
  }
};

export const productWithRequiredFields: ProductType = {
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  category: "men's clothing"
};

interface IProduct extends ProductType {
  _id: string;
}

export const newProductWithId: IProduct = {
  ...newProduct,
  _id: '6382b75f1a7bc791ab06c60a'
};

export const updatedProduct: IProduct = {
  id: 2,
  title: 'Updated Title',
  price: 11,
  description: 'Updated Description',
  category: "women's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 1.0,
    count: 5000
  },
  _id: '6382b75f1a7bc791ab06c60a'
};

export const updatedProductWrongId: IProduct = {
  id: 2,
  title: 'Updated Title',
  price: 11,
  description: 'Updated Description',
  category: "women's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 1.0,
    count: 5000
  },
  _id: '6382b75f1a7bc791ab06c60b'
};
