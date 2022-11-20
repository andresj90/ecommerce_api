import {
  HydratedDocument,
  Model,
  InferSchemaType,
  Schema,
  model
} from 'mongoose';

const ProductSchema = new Schema(
  {
    id: Number,
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: String,
    category: {
      type: String,
      required: true
    },
    image: String,
    rating: {
      rate: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default: 0
      }
    }
  },
  { collation: { locale: 'en-US', strength: 1 } }
);

type ProductType = InferSchemaType<typeof ProductSchema>;

const ProductModel = model('Product', ProductSchema);

export { ProductModel, HydratedDocument, ProductType };
