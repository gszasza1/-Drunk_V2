import mongoose from 'mongoose';

export const tutorialScheme = new mongoose.Schema(
  {
    title: String,
    description: String,
    published: Boolean,
  },
  { timestamps: true }
);

tutorialScheme.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const tutorial = mongoose.model("tutorial", tutorialScheme);
