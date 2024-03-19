import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import connectToMongoDB from './db/connectToMongoDB';

dotenv.config();

// Create Express app
const app = express();

// Define routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!!!!!!!');
});

//auth routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
