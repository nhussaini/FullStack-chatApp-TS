import { Request, Response } from 'express';
import User from '../models/user.model';

// Define a custom Request type by extending the Request type from Express
interface CustomRequest extends Request {
  user?: any; // Add the user property to the Request type
}

export const getUsersForSidebar = async (req: CustomRequest, res: Response) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId }, //ne =not equal
    }).select('-password');

    res.status(200).json(filteredUsers);
  } catch (error: any) {
    console.error('Error in getUsersForSidebar: ', error.message);
    res.status(500).json({ error: 'Internal Server error' });
  }
};
