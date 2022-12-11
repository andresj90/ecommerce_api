import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose';

const ProductSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true
    },
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
  {
    collation: {
      locale: 'en_US',
      strength: 1
    },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

type ProductType = InferSchemaType<typeof ProductSchema>;

const ProductModel = model('Product', ProductSchema);

export { ProductModel, HydratedDocument, ProductType };
