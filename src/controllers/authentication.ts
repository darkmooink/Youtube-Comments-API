import { Request, Response, NextFunction } from 'express';
import { authenticate as authenticateService } from '../services/authentication';

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const apiKey = req.params.API_EKY;

        // Await the asynchronous authenticate service
        const isAuthenticated = await authenticateService(apiKey);
        console.log(isAuthenticated+'----------------------------------------')
        if (isAuthenticated) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (err) {
        // Handle any potential errors in the authentication process
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
