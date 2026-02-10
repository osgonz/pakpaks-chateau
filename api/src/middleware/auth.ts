import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Authentication middleware
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const sessionToken = req.cookies["session"];

    if (!sessionToken) {
        return res.status(401).send("User is unauthorized.");
    }

    try {
        const decoded = jwt.verify(
            sessionToken,
            process.env.JWT_SECRET!
        ) as { userId: string };

        req.userId = decoded.userId;
        next();
    } catch {
        return res.status(401).send("Invalid or expired token.");
    }
}