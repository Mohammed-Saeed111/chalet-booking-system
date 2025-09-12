import express from 'express';
import Booking from '../models/Booking.js';
import auth from '../middleware/auth.js';
import { updateBookingStatus, getBookingDetails } from '../services/hostex.js';

const router = express.Router();

// All routes are protected by auth middleware
router.use(auth);

// GET /api/bookings - Get all bookings for the logged-in user
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.user.id })
      .populate('chalet_id', 'name location price_per_night')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
  try {
    const { chalet_id, date_from, date_to, total_price, guests, special_requests } = req.body;

    // Validate required fields
    if (!chalet_id || !date_from || !date_to || !total_price) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: chalet_id, date_from, date_to, total_price'
      });
    }

    // Validate dates
    const fromDate = new Date(date_from);
    const toDate = new Date(date_to);
    
    if (fromDate >= toDate) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date'
      });
    }

    if (fromDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Check-in date cannot be in the past'
      });
    }

    const booking = new Booking({
      user_id: req.user.id,
      chalet_id,
      date_from: fromDate,
      date_to: toDate,
      total_price,
      guests: guests || 1,
      special_requests: special_requests || ''
    });

    await booking.save();
    
    // Populate chalet details for response
    await booking.populate('chalet_id', 'name location price_per_night');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
});

// PUT /api/bookings/:id - Update booking details or status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find booking and ensure it belongs to the user
    const booking = await Booking.findOne({ _id: id, user_id: req.user.id });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or you do not have permission to update it'
      });
    }

    // Validate dates if being updated
    if (updates.date_from || updates.date_to) {
      const fromDate = updates.date_from ? new Date(updates.date_from) : booking.date_from;
      const toDate = updates.date_to ? new Date(updates.date_to) : booking.date_to;
      
      if (fromDate >= toDate) {
        return res.status(400).json({
          success: false,
          message: 'Check-out date must be after check-in date'
        });
      }
    }

    // Update booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('chalet_id', 'name location price_per_night');

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking',
      error: error.message
    });
  }
});

// PUT /api/bookings/:id/status - Update booking status (integrates with Hostex API)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, payment_ref } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    // Find booking and ensure it belongs to the user
    const booking = await Booking.findOne({ _id: id, user_id: req.user.id });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or you do not have permission to update it'
      });
    }

    // Update status in Hostex API
    try {
      const hostexBooking = await updateBookingStatus(booking.hostex_booking_id || id, status);
      console.log('Hostex API status update successful:', hostexBooking);
    } catch (hostexError) {
      console.warn('Hostex API status update failed:', hostexError.message);
      // Continue with local update even if Hostex fails
    }

    // Update local booking status
    const updateData = { status };
    if (payment_ref) {
      updateData.payment_ref = payment_ref;
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('chalet_id', 'name location price_per_night');

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message
    });
  }
});

// GET /api/bookings/:id/details - Get detailed booking information from Hostex API
router.get('/:id/details', async (req, res) => {
  try {
    const { id } = req.params;

    // Find booking and ensure it belongs to the user
    const booking = await Booking.findOne({ _id: id, user_id: req.user.id });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or you do not have permission to view it'
      });
    }

    // Get detailed information from Hostex API
    try {
      const hostexDetails = await getBookingDetails(booking.hostex_booking_id || id);
      
      res.status(200).json({
        success: true,
        data: {
          local_booking: booking,
          hostex_details: hostexDetails
        }
      });
    } catch (hostexError) {
      console.warn('Hostex API details fetch failed:', hostexError.message);
      
      // Return local booking if Hostex fails
      res.status(200).json({
        success: true,
        data: {
          local_booking: booking,
          hostex_details: null,
          warning: 'Could not fetch details from Hostex API'
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking details',
      error: error.message
    });
  }
});

// DELETE /api/bookings/:id - Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find booking and ensure it belongs to the user
    const booking = await Booking.findOne({ _id: id, user_id: req.user.id });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or you do not have permission to delete it'
      });
    }

    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting booking',
      error: error.message
    });
  }
});

export default router;
