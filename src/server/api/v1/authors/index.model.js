import { Schema, model } from 'mongoose';

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    description: {
      type: String, minlength: 10, maxlength: 2000, required: true,
    },
    gender: { type: String, required: true },
    image: { type: String, default: '' },
    social_media: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
      github: { type: String, default: '' },
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

export default model('Author', AuthorSchema);
