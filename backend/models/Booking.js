import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chalet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chalet',
    required: true
  },
  date_from: {
    type: Date,
    required: true
  },
  date_to: {
    type: Date,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  payment_ref: {
    type: String,
    default: ''
  },
  hostex_booking_id: {
    type: String,
    default: ''
  },
  guests: {
    type: Number,
    default: 1
  },
  special_requests: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Booking', bookingSchema);

