import { NextFunction, Router } from 'express';
import { Secret, sign } from 'jsonwebtoken';

import { CustomRequest, IRequest, IResponse, IJwtPayload } from '@common/types';
import { IUserGoogleLogging } from '@models/index';
import { UserModel } from '@models/users/index';
import { findUserByEmail, saveUser } from '@models/users/query';

import { verifyJsonWebToken } from '@middleware/authentication/authenticate-jwt';

import { sendResponse, verifyGoogleToken } from './utils';

export const userRoute = Router();

const SECRET: Secret = process.env.JWTSECRET as string;

userRoute.post<
    never,
    IResponse<{ user: string | null }>,
    IRequest<IUserGoogleLogging>,
    never,
    NextFunction
>('/signin', async (req, res, next) => {
    try {
        const credential = req.body?.data?.credential;
        const data = await verifyGoogleToken(credential);

        if (data.payload?.email) {
            const userDoc = await findUserByEmail(data.payload.email);
            if (userDoc) {
                const data = {
                    user: sign(
                        { name: userDoc.firstName, email: userDoc.email },
                        SECRET
                    ),
                    message: 'User has logged in successfully'
                };
                sendResponse<{ user: string }>(res, 200, {
                    data,
                    message: data.message
                });
            } else {
                const user = new UserModel({
                    email: data.payload.email,
                    firstName: data.payload.given_name,
                    lastName: data.payload.family_name,
                    picture: data.payload.picture
                });

                const newUser = await saveUser(user);
                newUser
                    ? sendResponse<{ user: string }>(res, 201, {
                          data: {
                              user: sign(
                                  {
                                      name: newUser.firstName,
                                      email: newUser.email
                                  },
                                  SECRET
                              )
                          },
                          message: 'User registered and logged in'
                      })
                    : sendResponse<{ user: null }>(res, 501, {
                          data: { user: null },
                          message: 'User neither registered or logged in'
                      });
            }
        } else {
            const data = {
                data: { user: null },
                message: 'Incorrect login credentials'
            };
            sendResponse<{ user: null }>(res, 401, data);
        }
    } catch (error) {
        next(error);
    }
});

userRoute.get<
    never,
    IResponse<{ data: IJwtPayload | undefined }>,
    CustomRequest,
    never
>('/profile', verifyJsonWebToken, async (req, res) => {
    if ('userDetails' in req) {
        const { userDetails } = req;
        res.status(200)
            .send({ data: { data: userDetails }, message: 'userFound' })
            .end();
    }
    res.status(404).send().end();
});
