import * as mongoose from 'mongoose';
const passportLocalMongoose = require('passport-local-mongoose');

export interface Statics {
  authenticate: Function;
  serializeUser: Function;
  deserializeUser: Function;
  register: Function;
}

const UserSchema = new mongoose.Schema({});
UserSchema.plugin(passportLocalMongoose);

export const User: Statics & mongoose.Model<{}> =  mongoose.model<{}, Statics>('User', UserSchema);