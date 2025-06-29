import React, { useState, useEffect } from 'react'
import { useAuth } from '../../components/AuthContext'
import Layout from '../../components/Layout'
import '../../styles/responsive.css'

const styles = {
  container: {
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    color: 'white',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    flexDirection: 'column',
    textAlign: 'center',
    gap: '1rem'
  },
  title: {
    fontWeight: 'bold',
    margin: 0,
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },
  subtitle: {
    opacity: 0.9,
    marginTop: '0.5rem'
  },
  filtersContainer: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    marginBottom: '2rem',
    border: '1px solid #e1e8ed'
  },
  filtersTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  filtersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    alignItems: 'end'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  filterLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#2c3e50'
  },
  filterSelect: {
    padding: '0.75rem',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none'
  },
  filterInput: {
    padding: '0.75rem',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none'
  },
  filterButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  clearButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  activeFilters: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '1rem'
  },
  activeFilter: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '0.25rem 0.75rem',
    borderRadius: '15px',
    fontSize: '0.8rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  removeFilter: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#1976d2',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '0',
    display: 'flex',
    alignItems: 'center'
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  resultsCount: {
    fontSize: '1rem',
    color: '#6c757d',
    fontWeight: '600'
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  sortLabel: {
    fontSize: '0.9rem',
    color: '#6c757d',
    fontWeight: '600'
  },
  sortSelect: {
    padding: '0.5rem',
    border: '1px solid #e9ecef',
    borderRadius: '6px',
    fontSize: '0.9rem',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  productCard: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    position: 'relative'
  },
  productCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
  },
  featuredBadge: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    zIndex: 10
  },
  productImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    transition: 'transform 0.3s'
  },
  productImagePlaceholder: {
    width: '100%',
    height: '250px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    color: '#dee2e6',
    border: '2px dashed #dee2e6'
  },
  productContent: {
    padding: '1.5rem'
  },
  productName: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '0.5rem',
    lineHeight: '1.3'
  },
  productDescription: {
    color: '#6c757d',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    marginBottom: '1rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  productMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  productPrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#27ae60'
  },
  productCategory: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '0.25rem 0.75rem',
    borderRadius: '15px',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  productStock: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  stockBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  stockInStock: {
    backgroundColor: '#d4edda',
    color: '#155724'
  },
  stockLowStock: {
    backgroundColor: '#fff3cd',
    color: '#856404'
  },
  stockOutOfStock: {
    backgroundColor: '#f8d7da',
    color: '#721c24'
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#6c757d'
  },
  error: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '8px',
    border: '1px solid #f5c6cb',
    marginBottom: '2rem'
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#6c757d'
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem'
  },
  emptyTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  emptyDescription: {
    fontSize: '1rem',
    marginBottom: '2rem'
  },
  createButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '25px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
  },
  productActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e9ecef'
  },
  viewBtn: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    flex: 1,
    justifyContent: 'center'
  },
  editBtn: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    flex: 1,
    justifyContent: 'center'
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  
  // Filter states
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  const { isAuthenticated, loading: authLoading, getAuthHeaders, handleApiError } = useAuth()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = '/login'
      return
    }

    if (isAuthenticated) {
      // Parse URL parameters
      const urlParams = new URLSearchParams(window.location.search)
      const initialFilters = {
        category: urlParams.get('category') || '',
        minPrice: urlParams.get('minPrice') || '',
        maxPrice: urlParams.get('maxPrice') || '',
        search: urlParams.get('search') || '',
        sortBy: urlParams.get('sortBy') || 'createdAt',
        sortOrder: urlParams.get('sortOrder') || 'desc'
      }
      setFilters(initialFilters)
      
      fetchCategories()
      fetchProducts(initialFilters)
    }
  }, [isAuthenticated, authLoading])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/products/categories', {
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        handleApiError(response)
        return
      }
      
      const data = await response.json()
      
      if (data.success) {
        setCategories(data.data.categories)
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }

  const fetchProducts = async (currentFilters = filters) => {
    try {
      setLoading(true)
      
      // Build query parameters
      const params = new URLSearchParams()
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value && value !== '') {
          params.append(key, value)
        }
      })

      const response = await fetch(`/api/products?${params.toString()}`, {
        headers: getAuthHeaders()
      })
      
      if (!response.ok) {
        handleApiError(response)
        setLoading(false)
        return
      }
      
      const data = await response.json()
      
      if (data.success) {
        setProducts(data.data.products)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    // Update URL
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v && v !== '') {
        params.append(k, v)
      }
    })
    
    const newUrl = `/products${params.toString() ? '?' + params.toString() : ''}`
    window.history.pushState({}, '', newUrl)
    
    fetchProducts(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    }
    setFilters(clearedFilters)
    window.history.pushState({}, '', '/products')
    fetchProducts(clearedFilters)
  }

  const getActiveFilters = () => {
    const active = []
    if (filters.category) active.push({ key: 'category', label: `Category: ${filters.category}`, value: filters.category })
    if (filters.minPrice) active.push({ key: 'minPrice', label: `Min Price: $${filters.minPrice}`, value: filters.minPrice })
    if (filters.maxPrice) active.push({ key: 'maxPrice', label: `Max Price: $${filters.maxPrice}`, value: filters.maxPrice })
    if (filters.search) active.push({ key: 'search', label: `Search: "${filters.search}"`, value: filters.search })
    return active
  }

  const removeFilter = (key) => {
    handleFilterChange(key, '')
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', style: styles.stockOutOfStock }
    if (stock <= 10) return { text: 'Low Stock', style: styles.stockLowStock }
    return { text: 'In Stock', style: styles.stockInStock }
  }

  if (authLoading || loading) {
    return (
      <Layout>
        <div style={styles.loading}>
          <div>🔄 Loading products...</div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div style={styles.container}>
          <div style={styles.error}>
            ❌ {error}
          </div>
        </div>
      </Layout>
    )
  }

  const activeFilters = getActiveFilters()

  return (
    <Layout>
      <div style={styles.container} className="products-container">
        {/* Header */}
        <div style={styles.header} className="products-header">
          <div>
            <h1 style={styles.title} className="products-title">🛍️ Product Catalog</h1>
            <p style={styles.subtitle}>Browse and filter your product inventory</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              style={styles.createButton}
              onClick={() => window.location.href = '/products/create'}
            >
              ➕ Add Product
            </button>
            <button 
              style={{...styles.createButton, backgroundColor: '#007bff'}}
              onClick={() => window.location.href = '/products/categories'}
            >
              🏷️ Manage Categories
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filtersContainer} className="products-filters">
          <div style={styles.filtersTitle}>
            🔍 Filters & Search
          </div>
          
          <div style={styles.filtersGrid} className="products-filter-row">
            <div style={styles.filterGroup} className="products-filter-group">
              <label style={styles.filterLabel}>Category</label>
              <select
                style={styles.filterSelect}
                className="products-filter-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.filterGroup} className="products-filter-group">
              <label style={styles.filterLabel}>Min Price</label>
              <input
                type="number"
                style={styles.filterInput}
                className="products-filter-input"
                placeholder="$0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
            </div>

            <div style={styles.filterGroup} className="products-filter-group">
              <label style={styles.filterLabel}>Max Price</label>
              <input
                type="number"
                style={styles.filterInput}
                className="products-filter-input"
                placeholder="$999999"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>

            <div style={styles.filterGroup} className="products-filter-group">
              <label style={styles.filterLabel}>Search</label>
              <input
                type="text"
                style={styles.filterInput}
                className="products-filter-input"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <div style={styles.filterGroup} className="products-filter-group">
              <label style={styles.filterLabel}>Sort By</label>
              <select
                style={styles.filterSelect}
                className="products-filter-select"
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-')
                  setFilters(prev => ({ ...prev, sortBy, sortOrder }))
                  handleFilterChange('sortBy', sortBy)
                  handleFilterChange('sortOrder', sortOrder)
                }}
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="category-asc">Category: A to Z</option>
                <option value="stock-desc">Stock: High to Low</option>
              </select>
            </div>

            <button style={styles.clearButton} onClick={clearFilters}>
              🗑️ Clear All
            </button>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div style={styles.activeFilters}>
              {activeFilters.map(filter => (
                <div key={filter.key} style={styles.activeFilter}>
                  {filter.label}
                  <button
                    style={styles.removeFilter}
                    onClick={() => removeFilter(filter.key)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Results Header */}
        <div style={styles.resultsHeader}>
          <div style={styles.resultsCount}>
            📊 Showing {products.length} product{products.length !== 1 ? 's' : ''}
            {activeFilters.length > 0 && ' (filtered)'}
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📦</div>
            <div style={styles.emptyTitle}>
              {activeFilters.length > 0 ? 'No products match your filters' : 'No products found'}
            </div>
            <div style={styles.emptyDescription}>
              {activeFilters.length > 0 
                ? 'Try adjusting your filters to see more results.'
                : 'Start by adding your first product to the inventory.'
              }
            </div>
            {activeFilters.length > 0 ? (
              <button style={styles.clearButton} onClick={clearFilters}>
                🗑️ Clear Filters
              </button>
            ) : (
              <button 
                style={styles.createButton}
                onClick={() => window.location.href = '/products/create'}
              >
                ➕ Add Your First Product
              </button>
            )}
          </div>
        ) : (
          <div style={styles.productsGrid} className="products-grid">
            {products.map(product => {
              const stockStatus = getStockStatus(product.stock)
              return (
                <div
                  key={product.id}
                  style={styles.productCard}
                  className="product-card"
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.productCardHover)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.productCard)}
                  onClick={() => window.location.href = `/products/${product.id}`}
                >
                  {product.featured && (
                    <div style={styles.featuredBadge}>⭐ Featured</div>
                  )}
                  
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={styles.productImage}
                      className="product-image"
                    />
                  ) : (
                    <div style={styles.productImagePlaceholder} className="product-image">
                      📷
                    </div>
                  )}
                  
                  <div style={styles.productContent}>
                    <h3 style={styles.productName}>{product.name}</h3>
                    <p style={styles.productDescription}>{product.description}</p>
                    
                    <div style={styles.productMeta}>
                      <span style={styles.productPrice}>${product.price}</span>
                      {product.category && (
                        <span style={styles.productCategory}>{product.category}</span>
                      )}
                    </div>
                    
                    <div style={styles.productStock}>
                      <span style={{...styles.stockBadge, ...stockStatus.style}}>
                        {stockStatus.text}
                      </span>
                      <span style={{color: '#6c757d', fontSize: '0.9rem'}}>
                        {product.stock} units
                      </span>
                    </div>
                    
                    <div style={styles.productActions} className="product-actions">
                      <button
                        style={styles.viewBtn}
                        className="product-action-btn"
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/products/${product.id}`
                        }}
                      >
                        👁️ View
                      </button>
                      <button
                        style={styles.editBtn}
                        className="product-action-btn"
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/products/${product.id}/edit`
                        }}
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}