import express, { Request, Response } from 'express';

// Create Express app
const app = express();

// Define routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
