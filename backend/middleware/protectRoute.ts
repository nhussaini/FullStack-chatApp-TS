import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
// Define a custom Request type by extending the Request type from Express
interface CustomRequest extends Request {
  user?: any; // Add the user property to the Request type
}

const protectRoute = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - No Token Provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }

    // const user = await User.findById(decoded.userId).select('-password');
    const decodedToken = decoded as { userId: string };
    const user = await User.findById(decodedToken.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error: any) {
    console.log('Error in protectRoute middleware: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default protectRoute;
