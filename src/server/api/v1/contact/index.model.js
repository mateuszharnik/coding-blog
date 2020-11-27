import { Schema, model } from 'mongoose';

const ContactSchema = new Schema(
  {
    email: { type: String, default: '' },
    show_email: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default model('Contact', ContactSchema);
