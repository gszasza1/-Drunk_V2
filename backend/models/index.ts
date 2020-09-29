import mongoose from 'mongoose';

import dbConfig from '../database/connect';
import { Member } from './registerMember';

mongoose.Promise = global.Promise;

export default {
  mongoose,
  url: dbConfig.url,
  Member,
};
