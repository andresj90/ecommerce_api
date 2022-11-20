
export interface IResponse<T> {
    data: T;
    message: string;
}

export interface IRequest<T> {
    data: T;
}

export interface IParams {
    id: number
}