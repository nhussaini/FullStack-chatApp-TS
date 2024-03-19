import { Request, Response } from 'express';

export const sendMessage = async (req: Request, res: Response) => {
  console.log('message sent');
};
