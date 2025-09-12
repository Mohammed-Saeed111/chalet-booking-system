import express from 'express';
import { getAllChalets, checkChaletAvailability } from '../services/hostex.js';
import auth from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/chalets
 * Fetch all chalets from Hostex API
 * Public route - no authentication required
 */
router.get('/', async (req, res) => {
  try {
    const chalets = await getAllChalets();
    res.json({
      success: true,
      count: chalets.length,
      data: chalets,
    });
  } catch (error) {
    console.error('Error fetching chalets:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * GET /api/chalets/:id/availability
 * Check availability for a specific chalet
 * Query params: check_in (YYYY-MM-DD), check_out (YYYY-MM-DD)
 */
router.get('/:id/availability', async (req, res) => {
  try {
    const { id } = req.params;
    const { check_in, check_out } = req.query;

    if (!check_in || !check_out) {
      return res.status(400).json({
        success: false,
        message: 'check_in and check_out query parameters are required (YYYY-MM-DD format)',
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(check_in) || !dateRegex.test(check_out)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD format',
      });
    }

    const availability = await checkChaletAvailability(id, check_in, check_out);
    res.json({
      success: true,
      data: availability,
    });
  } catch (error) {
    console.error(`Error checking availability for chalet ${req.params.id}:`, error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * GET /api/chalets/:id
 * Get details for a specific chalet
 * This would typically fetch from Hostex API by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // For now, fetch all chalets and find the one with matching ID
    // In a real implementation, you'd have a specific endpoint for single chalet
    const chalets = await getAllChalets();
    const chalet = chalets.find(c => c.id === id || c.hostex_id === id);
    
    if (!chalet) {
      return res.status(404).json({
        success: false,
        message: 'Chalet not found',
      });
    }

    res.json({
      success: true,
      data: chalet,
    });
  } catch (error) {
    console.error(`Error fetching chalet ${req.params.id}:`, error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
