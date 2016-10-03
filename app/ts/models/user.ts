import {
  Document,
  model,
  PassportLocalModel,
  Schema
} from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema({});
UserSchema.plugin(passportLocalMongoose);

export const User: PassportLocalModel<Document> = model('User', UserSchema);