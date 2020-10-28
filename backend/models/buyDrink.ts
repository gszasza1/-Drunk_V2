import mongoose, { Schema } from 'mongoose';

export const buyDrinkScheme = new mongoose.Schema(
  {
    buyer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    number: { type: Number, required: true, default: 1 },
    drinkId: { type: Schema.Types.ObjectId, ref: "drink", required: true },
  },
  { validateBeforeSave: true, timestamps: true }
);

buyDrinkScheme.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const BuyDrink = mongoose.model("buyDrink", buyDrinkScheme);
