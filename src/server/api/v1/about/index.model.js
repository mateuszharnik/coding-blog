import { Schema, model } from 'mongoose';

const AboutSchema = new Schema(
  {
    description: {
      type: String,
      minlength: 10,
      maxlength: 2000,
      required: true,
    },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default model('About', AboutSchema);
