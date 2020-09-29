import mongoose from 'mongoose';

import dbConfig from '../database/connect';
import tutorial from './tutorial';

mongoose.Promise = global.Promise;

export default {
  mongoose,
  url: dbConfig.url,
  tutorials: tutorial(mongoose),
};
