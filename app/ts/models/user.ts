import {
  Document,
  model,
  Schema
} from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export const User = model<IUser>('User', UserSchema);