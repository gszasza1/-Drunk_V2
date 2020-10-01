import mongoose from 'mongoose';

export const registerMemberScheme = new mongoose.Schema(
  {
    username: { type: String, minlength: 6, required: true, unique: true },
    password: { type: String, minlength: 6, required: true },
    type: { type: Number, required: true },
  },
  { timestamps: true }
);

export interface Member {
  username: string;
  password: string;
}
export enum UserType {
  Member,
  Firm,
}

registerMemberScheme.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const Member = mongoose.model("member", registerMemberScheme);
