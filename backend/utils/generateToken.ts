import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response } from 'express';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateTokenAndSetCookie = (userId: string, res: Response) => {
  if (!JWT_SECRET) return;

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks croos-site scripting attacks
    sameSite: 'strict', //CSRF attacks cross-site  request forgery attacks
    secure: process.env.NODE_ENV !== 'development',
  });
};

export default generateTokenAndSetCookie;
