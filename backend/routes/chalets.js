import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// Mock data for testing
const MOCK_CHALETS = [
  {
    id: "1",
    name: "Seaside Chalet",
    location: "Beach Front, Alexandria",
    price: 2500,
    backgroundImage: "assets/chalets/seaside.jpg",
    bedrooms: 3
  },
  {
    id: "2",
    name: "Mountain View Chalet",
    location: "Saint Catherine, Sinai",
    price: 1800,
    backgroundImage: "assets/chalets/mountain.jpg",
    bedrooms: 2
  }
];

/**
 * GET /api/chalets
 * Get all chalets (mock data for testing)
 */
router.get('/', async (req, res) => {
  try {
    res.json({
      status: 'success',
      count: MOCK_CHALETS.length,
      data: MOCK_CHALETS
    });
  } catch (error) {
    console.error('Error fetching chalets:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch chalets'
    });
  }
});

/**
 * GET /api/chalets/:id
 * Get a specific chalet by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const chalet = MOCK_CHALETS.find(c => c.id === req.params.id);
    
    if (!chalet) {
      return res.status(404).json({
        status: 'error',
        message: 'Chalet not found'
      });
    }

    res.json({
      status: 'success',
      data: chalet
    });
  } catch (error) {
    console.error('Error fetching chalet:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch chalet'
    });
  }
});

export default router;