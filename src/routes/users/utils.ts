import { Response, Router } from 'express';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';

export const userRoute = Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(token: string) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        });
        return { payload: ticket.getPayload() };
    } catch (error) {
        return { error: 'Invalid user detected. Please try again' };
    }
}

export const sendResponse = <T>(
    res: Response<{ data: T; message: string }>,
    statusCode: number,
    responseBody: { data: T; message: string }
) =>
    res
        .status(statusCode)
        .send({ data: responseBody.data, message: responseBody.message })
        .end();
