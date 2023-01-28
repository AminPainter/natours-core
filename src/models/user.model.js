import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'A user must have an email address'],
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: {
        values: ['user', 'admin', 'lead-guide', 'guide'],
        message: 'Invalid role provided',
      },
    },
    picture: {
      type: String,
      trim: true,
      default:
        'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

const User = mongoose.model('User', schema);
export default User;
