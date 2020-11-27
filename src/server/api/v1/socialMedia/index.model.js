import { Schema, model } from 'mongoose';

const SocialMediaSchema = new Schema(
  {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default model('SocialMedia', SocialMediaSchema);
