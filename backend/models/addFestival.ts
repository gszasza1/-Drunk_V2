import mongoose, { Schema } from 'mongoose';

export const registerFestivalScheme = new mongoose.Schema(
  {
    festivalName: { type: String, minlength: 6, required: true, unique: true },
    place: { type: String, minlength: 6, required: true },
    time: { type: Date },
    ticket: [
      {
        ticketName: { type: String, minlength: 2, required: true },
        ticketPrice: { type: Number, minlength: 2, required: true },
      },
    ],
    participants: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

registerFestivalScheme.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const Festival = mongoose.model("festival", registerFestivalScheme);
