const mongoose = require('mongoose')

// ── Product Schema ─────────────────────────────────────────────
const productSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  category: { type: String, required: true },
  price:    { type: Number, required: true },
  stock:    { type: Number, default: 0 },
  image:    { type: String },
  rating:   { type: Number, default: 4 },
  description: String
})

const Product = mongoose.model('Product', productSchema)

// ── Connect + Seed ─────────────────────────────────────────────
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/ecommerce')
    console.log('✅ MongoDB connected')

    const count = await Product.countDocuments()
    if (count === 0) {
      await Product.insertMany([
        // Electronics
        { name: 'iPhone 15 Pro',      category: 'Electronics', price: 79999, stock: 25, rating: 5, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400', description: 'Latest iPhone with A17 chip' },
        { name: 'Samsung Galaxy S24', category: 'Electronics', price: 69999, stock: 18, rating: 4, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', description: 'Flagship Android phone' },
        { name: 'MacBook Air M2',     category: 'Electronics', price: 114900, stock: 12, rating: 5, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400', description: 'Ultra thin laptop' },
        { name: 'Sony WH-1000XM5',   category: 'Electronics', price: 29990, stock: 30, rating: 5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', description: 'Premium noise cancelling headphones' },
        { name: 'iPad Pro 12.9',      category: 'Electronics', price: 89900, stock: 15, rating: 4, image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400', description: 'Professional tablet' },

        // Fashion
        { name: 'Nike Air Max 270',   category: 'Fashion', price: 10995, stock: 45, rating: 4, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', description: 'Comfortable running shoes' },
        { name: 'Levi\'s 511 Jeans',  category: 'Fashion', price: 3999,  stock: 60, rating: 4, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', description: 'Classic slim fit jeans' },
        { name: 'Adidas Hoodie',      category: 'Fashion', price: 2999,  stock: 35, rating: 4, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400', description: 'Comfortable sports hoodie' },

        // Home & Kitchen
        { name: 'Instant Pot Duo',    category: 'Home', price: 8999, stock: 20, rating: 5, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400', description: '7-in-1 pressure cooker' },
        { name: 'Dyson V15',          category: 'Home', price: 52900, stock: 8, rating: 5, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', description: 'Cordless vacuum cleaner' },
        { name: 'Air Fryer 5L',       category: 'Home', price: 4499, stock: 40, rating: 4, image: 'https://images.unsplash.com/photo-1648744748666-040e5c5cfeea?w=400', description: 'Healthy cooking air fryer' },

        // Books
        { name: 'The Alchemist',      category: 'Books', price: 299,  stock: 100, rating: 5, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', description: 'Paulo Coelho bestseller' },
        { name: 'Atomic Habits',      category: 'Books', price: 399,  stock: 85,  rating: 5, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', description: 'James Clear habit guide' },
        { name: 'Clean Code',         category: 'Books', price: 599,  stock: 50,  rating: 4, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', description: 'Robert Martin programming book' },

        // Sports
        { name: 'Yoga Mat Premium',   category: 'Sports', price: 1299, stock: 55, rating: 4, image: 'https://images.unsplash.com/photo-1601925228009-3a0a475a4eae?w=400', description: 'Non-slip yoga mat' },
        { name: 'Dumbbell Set 20kg',  category: 'Sports', price: 3499, stock: 22, rating: 4, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Adjustable dumbbell set' },
      ])
      console.log('✅ MongoDB seeded with 16 products')
    }
  } catch (err) {
    console.error('❌ MongoDB error:', err.message)
    setTimeout(connectMongo, 5000)
  }
}

module.exports = { connectMongo, Product }