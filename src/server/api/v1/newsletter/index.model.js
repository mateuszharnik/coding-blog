import { Schema, model } from 'mongoose';

const NewsletterSchema = new Schema(
  {
    email: { type: String, required: true },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default model('Newsletter', NewsletterSchema);
