import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes';
import connectToMongoDB from './db/connectToMongoDB';
import messageRoutes from './routes/message.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Define routes
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, World!!!!!!!');
// });

app.use(express.json()); //to parse incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the incoming cookies from req.cookies
//auth routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
