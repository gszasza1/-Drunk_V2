import mongoose from 'mongoose';

export const registerMemberScheme = new mongoose.Schema(
  {
    username: { type: String, minlength: 6, required: true, unique: true },
    password: { type: String, minlength: 6, required: true },
    fullName: { type: String },
    type: { type: Number, required: true },
  },
  { timestamps: true }
);

registerMemberScheme.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const User = mongoose.model("user", registerMemberScheme);
