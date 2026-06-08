import { useState, useEffect } from 'react'
import axios from 'axios'

const API = '/api'

const CATEGORY_ICONS = {
  Electronics: '📱',
  Fashion:     '👗',
  Home:        '🏠',
  Books:       '📚',
  Sports:      '⚽'
}

const CATEGORY_COLORS = {
  Electronics: { bg: '#EFF6FF', border: '#3B82F6', btn: '#2563EB', badge: '#DBEAFE', badgeText: '#1D4ED8' },
  Fashion:     { bg: '#FDF4FF', border: '#A855F7', btn: '#7C3AED', badge: '#F3E8FF', badgeText: '#6D28D9' },
  Home:        { bg: '#F0FDF4', border: '#22C55E', btn: '#16A34A', badge: '#DCFCE7', badgeText: '#15803D' },
  Books:       { bg: '#FFFBEB', border: '#F59E0B', btn: '#D97706', badge: '#FEF3C7', badgeText: '#B45309' },
  Sports:      { bg: '#FFF1F2', border: '#F43F5E', btn: '#E11D48', badge: '#FFE4E6', badgeText: '#BE123C' }
}

// ── Star Rating ────────────────────────────────────────────────
const Stars = ({ rating }) => (
  <span style={{ color: '#F59E0B', fontSize: 13 }}>
    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
  </span>
)

// ── Homepage ───────────────────────────────────────────────────
const HomePage = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    axios.get(`${API}/categories`).then(res => {
      setCategories(res.data.data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {/* ── Hero Banner ───────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a, #7c3aed)',
        color: '#fff', padding: '60px 40px', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 42, margin: 0, fontWeight: 800 }}>
          🛒 ShopKart
        </h1>
        <p style={{ fontSize: 18, opacity: 0.85, margin: '12px 0 0' }}>
          Discover Amazing Products at Best Prices
        </p>
        <div style={{
          display: 'inline-block',
          background: '#fff', borderRadius: 30,
          padding: '10px 24px', marginTop: 24,
          color: '#1e3a8a', fontWeight: 700, fontSize: 14
        }}>
          🎉 Free Shipping on Orders Above ₹999
        </div>
      </div>

      {/* ── Categories Section ────────────────────────────── */}
      <div style={{ padding: '40px 24px', background: '#f8fafc' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, margin: '0 0 8px', color: '#1e293b' }}>
          Shop by Category
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', margin: '0 0 32px' }}>
          Click on any category to see all available products
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            ⏳ Loading categories from MongoDB...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20, maxWidth: 1100, margin: '0 auto'
          }}>
            {categories.map(cat => {
              const colors = CATEGORY_COLORS[cat._id] || CATEGORY_COLORS.Electronics
              const icon   = CATEGORY_ICONS[cat._id]  || '🛍️'
              return (
                <div
                  key={cat._id}
                  onClick={() => onCategoryClick(cat._id)}
                  style={{
                    background: colors.bg,
                    border: `2px solid ${colors.border}`,
                    borderRadius: 16,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  {/* Category Image */}
                  <div style={{ position: 'relative' }}>
                    <img
                      src={cat.image}
                      alt={cat._id}
                      style={{ width: '100%', height: 180, objectFit: 'cover' }}
                      onError={e => e.target.src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400'}
                    />
                    <div style={{
                      position: 'absolute', top: 10, right: 10,
                      background: colors.badge, color: colors.badgeText,
                      borderRadius: 20, padding: '4px 12px',
                      fontSize: 12, fontWeight: 700
                    }}>
                      {cat.totalProducts} Products
                    </div>
                  </div>

                  {/* Category Info */}
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 24 }}>{icon}</span>
                      <h3 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>{cat._id}</h3>
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
                      {cat.totalProducts} items &nbsp;•&nbsp; {cat.totalStock} in stock
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 14 }}>
                      Avg price: <strong style={{ color: '#1e293b' }}>₹{Math.round(cat.avgPrice).toLocaleString()}</strong>
                    </div>
                    <button style={{
                      width: '100%',
                      background: colors.btn, color: '#fff',
                      border: 'none', borderRadius: 8,
                      padding: '10px', fontSize: 14,
                      cursor: 'pointer', fontWeight: 600
                    }}>
                      View All {cat.totalProducts} Products →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Products Page ──────────────────────────────────────────────
const ProductsPage = ({ category, onBack }) => {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.Electronics
  const icon   = CATEGORY_ICONS[category]  || '🛍️'

  useEffect(() => {
    axios.get(`${API}/products/${category}`).then(res => {
      setData(res.data)
      setLoading(false)
    })
  }, [category])

  return (
    <div>
      {/* ── Back + Header ──────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.border}, ${colors.btn})`,
        color: '#fff', padding: '28px 32px'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: '#fff', border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: 8, padding: '8px 16px',
            cursor: 'pointer', fontSize: 14, marginBottom: 16
          }}
        >
          ← Back to Home
        </button>

        {data && (
          <div>
            <h1 style={{ margin: 0, fontSize: 32 }}>
              {icon} {category}
            </h1>
            {/* ── MongoDB Stats ─────────────────────────── */}
            <div style={{
              display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap'
            }}>
              {[
                { label: 'Total Products',  value: data.totalProducts, icon: '📦' },
                { label: 'Total Stock',     value: data.totalStock,    icon: '🏪' },
                { label: 'Retrieved From',  value: 'MongoDB',          icon: '🍃' }
              ].map(stat => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: 10, padding: '12px 20px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>
                    {stat.icon} {stat.value}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Products Grid ──────────────────────────────────── */}
      <div style={{ padding: '32px 24px', background: '#f8fafc' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            ⏳ Fetching products from MongoDB...
          </div>
        ) : (
          <>
            <h2 style={{ margin: '0 0 24px', color: '#1e293b' }}>
              Showing all {data.totalProducts} products in {category}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 20
            }}>
              {data.data.map(product => (
                <div key={product._id} style={{
                  background: '#fff',
                  borderRadius: 12,
                  border: `1px solid ${colors.border}44`,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'transform 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: 200, objectFit: 'cover' }}
                    onError={e => e.target.src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400'}
                  />
                  <div style={{ padding: 16 }}>
                    <h3 style={{ margin: '0 0 6px', fontSize: 16, color: '#1e293b' }}>
                      {product.name}
                    </h3>
                    <div style={{ marginBottom: 8 }}>
                      <Stars rating={product.rating} />
                    </div>
                    <p style={{ margin: '0 0 12px', fontSize: 12, color: '#64748b' }}>
                      {product.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 20, fontWeight: 800, color: colors.btn }}>
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span style={{
                        background: product.stock > 20 ? '#DCFCE7' : '#FEF3C7',
                        color:      product.stock > 20 ? '#15803D' : '#B45309',
                        borderRadius: 20, padding: '3px 10px', fontSize: 12
                      }}>
                        {product.stock} in stock
                      </span>
                    </div>
                    <button style={{
                      width: '100%',
                      background: colors.btn, color: '#fff',
                      border: 'none', borderRadius: 8,
                      padding: '10px', fontSize: 14,
                      cursor: 'pointer', fontWeight: 600
                    }}>
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: '100vh', background: '#f8fafc' }}>

      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav style={{
        background: '#1e293b', color: '#fff',
        padding: '14px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div
          style={{ fontWeight: 800, fontSize: 20, cursor: 'pointer' }}
          onClick={() => setSelectedCategory(null)}
        >
          🛒 ShopKart
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 14, color: '#94a3b8' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory(null)}>Home</span>
          <span>Orders</span>
          <span>Cart 🛍️</span>
        </div>
      </nav>

      {/* ── Pages ──────────────────────────────────────────── */}
      {selectedCategory ? (
        <ProductsPage
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
        />
      ) : (
        <HomePage onCategoryClick={setSelectedCategory} />
      )}

      {/* ── Footer ─────────────────────────────────────────── */}
      <div style={{
        background: '#1e293b', color: '#94a3b8',
        textAlign: 'center', padding: '20px',
        fontSize: 13, marginTop: 40
      }}>
        ShopKart © 2026 | Powered by React + Node.js + MongoDB
      </div>

    </div>
  )
}