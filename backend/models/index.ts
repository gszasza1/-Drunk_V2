import mongoose from 'mongoose';

import dbConfig from '../database/connect';
import { User } from './registerUser';

mongoose.Promise = global.Promise;

export default {
  mongoose,
  url: dbConfig.url,
  User,
};
