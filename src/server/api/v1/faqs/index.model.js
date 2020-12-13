import { Schema, model } from 'mongoose';

const FAQSchema = new Schema(
  {
    question: {
      type: String,
      minlength: 10,
      maxlength: 500,
      required: true,
    },
    answer: {
      type: String, minlength: 10, maxlength: 5000, required: true,
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

export default model('FAQ', FAQSchema);
