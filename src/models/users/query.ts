// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HydratedDocument, UserModel, UserType, ObjectId } from './index';

export const findUserByEmail = async (email: string) =>
    UserModel.findOne({ email: email });

export const saveUser = async (user: HydratedDocument<UserType>) => user.save();
