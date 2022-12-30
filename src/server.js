import mongoose from 'mongoose';
import app from './app';

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening at port ${PORT}`));

process.on('unhandledRejection', err => {
  console.log(err);
  server.close(() => console.log('Shutting down the server 💥💥'));
});
