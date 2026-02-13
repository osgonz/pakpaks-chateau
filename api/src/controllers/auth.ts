import { Request, Response } from 'express';
import { getGoogleUserPayload, createSessionToken } from '../services/auth';
import { execute } from '../connection';

class AuthController {
    // Exchange Google authorization code for tokens
    authenticateUser = async (req: Request, res: Response) => {
        try {
            const payload = await getGoogleUserPayload(req.body.code);
            const user = await this.upsertUser(payload.googleId, payload.email, payload.name, payload.imageUrl);
            const sessionToken = createSessionToken(user.id);
            res.cookie("session", sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            
            res.status(200).json(user);
        } catch (error) {
            res.status(401).send("Authentication failed!");
        }
    };

    // Get authenticated user info
    getAuthenticatedUser = async (req: Request, res: Response) => {
        const userId = req.userId!;

        const [user] = await execute("call get_user(?)", [userId]);
        res.status(200).json(user[0]);
    };

    // Log out and clear session cookie
    logOutUser = (_: Request, res: Response) => {
        res.clearCookie("session");
        res.status(200).send('Successfully logged out.');
    };

    // Upsert a user
    upsertUser = async (googleId: string, email?: string, name?: string, picture?: string) => {
        const [user] = await execute("call upsert_user(?,?,?,?)", [googleId, email, name, picture]);

        return(user[0]);
    }

};

export default new AuthController();