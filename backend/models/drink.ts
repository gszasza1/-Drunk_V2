import mongoose, { Schema } from 'mongoose';

export const drinkScheme = new mongoose.Schema(
  {
    drinkName: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    provider: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { validateBeforeSave: true, timestamps: true }
);

drinkScheme.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const Drink = mongoose.model("drink", drinkScheme);
