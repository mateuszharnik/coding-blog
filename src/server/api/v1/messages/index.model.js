import { Schema, model } from 'mongoose';

const MessageSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      minlength: 10,
      maxlength: 250,
      required: true,
    },
    content: {
      type: String,
      minlength: 10,
      maxlength: 2500,
      required: true,
    },
    readed: { type: Boolean, default: false },
    terms_accepted: { type: Boolean, required: true },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default model('Message', MessageSchema);
