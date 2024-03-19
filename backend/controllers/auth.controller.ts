import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confrimPassword, gender } = req.body;
  } catch (error) {}
};

export const login = (req: Request, res: Response) => {
  console.log('loginuser');
};

export const logout = (req: Request, res: Response) => {
  console.log('logoutuser');
};
