import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) return;

  const dbUri = process.env.MONGODB_URI;
  if (!dbUri) {
    throw new Error('MONGODB_URI is not defined');
  }

  await mongoose.connect(dbUri);
};

export default connectMongo;
