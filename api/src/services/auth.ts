import { OAuth2Client } from 'google-auth-library';
import jwt from "jsonwebtoken";

const authClient = new OAuth2Client(
    {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: 'postmessage'
    }
);

// Function that returns a Google user's payload
export const getGoogleUserPayload = async (code: string) => {
    const { tokens } = await authClient.getToken(code);

    if (!tokens) {
        throw new Error("Invalid Google Auth Code.");
    }

    const ticket = await authClient.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    
    if (!payload){
        throw new Error("Invalid Google ID Token.")
    }

    return {
        googleId: payload.sub!,
        email: payload.email,
        name: payload.name,
        imageUrl: payload.picture
    };
}

// Function that creates a new session JWT token for a user
export const createSessionToken = (userId: string) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );
}