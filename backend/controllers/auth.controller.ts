import { Request, Response } from 'express';

export const signup = (req: Request, res: Response) => {
  console.log('signupUser');
};

export const login = (req: Request, res: Response) => {
  console.log('loginuser');
};

export const logout = (req: Request, res: Response) => {
  console.log('logoutuser');
};
