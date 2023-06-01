import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { use } from 'passport';

export default use(
    'jwt',
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: 'secretKey'
        },
        function (jwtPayload, done: VerifiedCallback) {
            try {
                const user = jwtPayload.user;
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);
