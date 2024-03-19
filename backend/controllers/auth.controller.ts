import { Request, Response } from 'express';
import User from '../models/user.model';

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    //passowrds don't match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    //username alreaddy exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    //Hash password

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    console.log('new user is=>', newUser);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error: any) {
    console.log('Error in signup controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = (req: Request, res: Response) => {
  console.log('loginuser');
};

export const logout = (req: Request, res: Response) => {
  console.log('logoutuser');
};
