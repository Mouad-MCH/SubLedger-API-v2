import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import app from './app.js';


mongoose.connect(process.env.CONNECT_DB).then((con) => {
  console.log('database connected successfully');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`the server running on the port ${port}`);
});