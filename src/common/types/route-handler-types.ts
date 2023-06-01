import { Request } from 'express';
export interface IResponse<T> {
    data: T;
    message: string;
}

export interface IRequest<T> {
    data: T;
}

export interface IParams {
    id: number;
}

export interface IJwtPayload {
    name: string;
    email: string;
    iat: number;
}

export interface CustomRequest extends Request {
    userDetails?: IJwtPayload;
}
