import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import generateTokenAndSetCookie from '../utils/generateToken';
import { Error } from 'mongoose';

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    console.log('new user is=>', newUser);
    if (newUser) {
      //generate JWT token
      generateTokenAndSetCookie(newUser._id.toString(), res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error: any) {
    console.log('Error in signup controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    generateTokenAndSetCookie(user._id.toString(), res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    console.log('Error in logout controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
