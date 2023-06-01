import {
    HydratedDocument,
    InferSchemaType,
    ObjectId,
    Schema,
    model
} from 'mongoose';

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        picture: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
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

type UserType = InferSchemaType<typeof UserSchema>;

const UserModel = model('User', UserSchema);

export { UserModel, HydratedDocument, UserType, ObjectId };
