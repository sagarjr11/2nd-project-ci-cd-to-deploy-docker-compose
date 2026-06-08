const express = require('express')
const { Product } = require('../config/mongodb')
const router = express.Router()

// ── Get all categories with product count ──────────────────────
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id:           '$category',
          totalProducts: { $sum: 1 },
          totalStock:    { $sum: '$stock' },
          avgPrice:      { $avg: '$price' },
          image:         { $first: '$image' }
        }
      },
      { $sort: { _id: 1 } }
    ])
    res.json({ success: true, data: categories })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ── Get products by category ───────────────────────────────────
router.get('/products/:category', async (req, res) => {
  try {
    const { category } = req.params
    const products = await Product.find({ category })
    const total    = await Product.countDocuments({ category })
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0)

    res.json({
      success: true,
      category,
      totalProducts: total,
      totalStock,
      data: products
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ── Get all products ───────────────────────────────────────────
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
    const total    = await Product.countDocuments()
    res.json({ success: true, total, data: products })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ── Health ─────────────────────────────────────────────────────
router.get('/health', (req, res) => {
  res.json({ status: 'ok', db: 'MongoDB' })
})

module.exports = router