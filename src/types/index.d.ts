import { IJwtPayload } from '../common/types';
export {};

declare global {
    namespace Express {
        interface Request {
            userDetails?: IJwtPayload;
        }
    }
}
