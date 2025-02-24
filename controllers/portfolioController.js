const Portfolio = require('../models/Portfolio');

exports.createPortfolio = async (req, res) => {
  const { title, description, img, codeLink, liveLink } = req.body;
  try {
    const portfolio = await Portfolio.create({
      user: req.user.id,
      title,
      description,
      img,
      codeLink,
      liveLink
    });
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPortfolios = async (req, res) => {
  try {
    // Optionally filter by user: { user: req.user.id }
    const portfolios = await Portfolio.find({ user: req.user.id });
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    // Check if the portfolio belongs to the logged in user
    if (portfolio.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    // Check if the portfolio belongs to the logged in user
    if (portfolio.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await portfolio.remove();
    res.status(200).json({ message: 'Portfolio removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
