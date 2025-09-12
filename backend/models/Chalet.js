import mongoose from 'mongoose';

const chaletSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  price_per_night: {
    type: Number,
    required: true,
    min: 0
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  services: [{
    name: String,
    description: String,
    icon: String
  }],
  availability: [{
    date: Date,
    available: Boolean,
    price: Number
  }],
  // Additional fields for Hostex integration
  hostex_id: {
    type: String,
    unique: true,
    sparse: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  review_count: {
    type: Number,
    default: 0
  },
  property_type: {
    type: String,
    default: 'chalet',
    enum: ['chalet', 'hotel', 'apartment', 'villa', 'cabin']
  },
  bedrooms: {
    type: Number,
    default: 1,
    min: 1
  },
  bathrooms: {
    type: Number,
    default: 1,
    min: 1
  },
  size: {
    type: Number, // in square meters
    min: 0
  },
  minimum_nights: {
    type: Number,
    default: 1,
    min: 1
  },
  maximum_nights: {
    type: Number,
    min: 1
  },
  cancellation_policy: {
    type: String,
    default: 'moderate',
    enum: ['flexible', 'moderate', 'strict', 'super_strict']
  },
  // Status and availability
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive', 'maintenance', 'sold_out']
  }
}, {
  timestamps: true
});

// Index for better query performance
chaletSchema.index({ 'location.city': 1 });
chaletSchema.index({ 'location.country': 1 });
chaletSchema.index({ price_per_night: 1 });
chaletSchema.index({ capacity: 1 });
chaletSchema.index({ hostex_id: 1 });

export default mongoose.model('Chalet', chaletSchema);
