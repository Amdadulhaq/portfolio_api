const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { createPortfolio, getPortfolios, updatePortfolio, deletePortfolio } = require('../controllers/portfolioController');

// All portfolio routes are protected
router.use(protect);

router.post('/', createPortfolio);
router.get('/', getPortfolios);
router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

module.exports = router;
