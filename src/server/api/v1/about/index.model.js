import { Schema, model } from 'mongoose';

const AboutSchema = new Schema(
  {
    description: {
      type: String,
      maxlength: 5000,
      default: '',
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
