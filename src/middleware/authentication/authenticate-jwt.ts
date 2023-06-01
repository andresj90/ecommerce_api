/* eslint-disable no-console */
import { verify, Secret } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { CustomRequest, IJwtPayload } from '@common/types';

export const verifyJsonWebToken = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    const SECRET_KEY = process.env.JWTSECRET as Secret;

    if (!token) {
        res.status(401)
            .send({
                data: null,
                message: 'Could not verify JWT token, please try again'
            })
            .end();
    } else {
        try {
            const user = verify(token, SECRET_KEY) as IJwtPayload;
            req.userDetails = {
                name: user.name,
                email: user.email,
                iat: user.iat
            };
            console.log(
                'ROUTE VERIFIED TRHOUGHT TOKEN',
                verify(token, SECRET_KEY)
            );
            next();
        } catch (error) {
            console.log({ error });
            res.sendStatus(403).end();
        }
    }
};
