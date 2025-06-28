import React, { useState, useEffect } from 'react'
import { useAuth } from '../../components/AuthContext'
import Layout from '../../components/Layout'

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    color: 'white',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: 0,
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },
  subtitle: {
    fontSize: '1.1rem',
    opacity: 0.9,
    marginTop: '0.5rem'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e1e8ed',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  statIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem'
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '0.25rem'
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '600'
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e9ecef'
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    maxWidth: '400px'
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '2px solid #e9ecef',
    borderRadius: '25px',
    fontSize: '1rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none'
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6c757d',
    fontSize: '1.2rem'
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
    cursor: 'pointer'
  },
  productCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
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
  productActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  actionButton: {
    flex: 1,
    padding: '0.75rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  viewButton: {
    backgroundColor: '#3498db',
    color: 'white'
  },
  editButton: {
    backgroundColor: '#f39c12',
    color: 'white'
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #e9ecef'
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#6c757d',
    padding: '0.5rem',
    borderRadius: '50%',
    transition: 'background-color 0.2s'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#2c3e50'
  },
  input: {
    padding: '0.75rem',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none'
  },
  textarea: {
    padding: '0.75rem',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '1rem',
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none'
  },
  fileInput: {
    padding: '0.75rem',
    border: '2px dashed #e9ecef',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background-color 0.2s'
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '1rem'
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
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [stats, setStats] = useState({ total: 0, totalValue: 0 })
  const [searchTerm, setSearchTerm] = useState('')

  const { isAuthenticated, loading: authLoading } = useAuth()

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null
  })

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = '/login'
      return
    }

    if (isAuthenticated) {
      fetchProducts()
      fetchStats()
    }
  }, [isAuthenticated, authLoading])

  useEffect(() => {
    // Filter products based on search term
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [products, searchTerm])

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
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

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/products/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      
      if (data.success) {
        setStats(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('token')
      const formDataToSend = new FormData()
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key])
        }
      })

      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      })

      const data = await response.json()

      if (data.success) {
        alert(editingProduct ? 'Product updated successfully!' : 'Product created successfully!')
        setShowCreateForm(false)
        setEditingProduct(null)
        resetForm()
        fetchProducts()
        fetchStats()
      } else {
        alert(data.message || 'Operation failed')
      }
    } catch (err) {
      console.error('Error:', err)
      alert('Operation failed')
    }
  }

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        alert('Product deleted successfully!')
        fetchProducts()
        fetchStats()
      } else {
        alert(data.message || 'Failed to delete product')
      }
    } catch (err) {
      console.error('Error deleting product:', err)
      alert('Failed to delete product')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: null
    })
    setShowCreateForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: null
    })
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

  return (
    <Layout>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>🛍️ Product Management</h1>
            <p style={styles.subtitle}>Manage your product inventory with ease</p>
          </div>
        </div>

        {/* Statistics */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📦</div>
            <div style={styles.statValue}>{stats.total || 0}</div>
            <div style={styles.statLabel}>Total Products</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>💰</div>
            <div style={styles.statValue}>${(stats.totalValue || 0).toFixed(2)}</div>
            <div style={styles.statLabel}>Inventory Value</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📊</div>
            <div style={styles.statValue}>{products.filter(p => p.stock > 0).length}</div>
            <div style={styles.statLabel}>In Stock</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⚠️</div>
            <div style={styles.statValue}>{products.filter(p => p.stock <= 10 && p.stock > 0).length}</div>
            <div style={styles.statLabel}>Low Stock</div>
          </div>
        </div>

        {/* Action Bar */}
        <div style={styles.actionBar}>
          <div style={styles.searchContainer}>
            <div style={styles.searchIcon}>🔍</div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <button
            onClick={() => {
              setShowCreateForm(true)
              setEditingProduct(null)
              resetForm()
            }}
            style={styles.createButton}
          >
            ➕ Add Product
          </button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📦</div>
            <h3 style={styles.emptyTitle}>
              {searchTerm ? 'No products found' : 'No products yet'}
            </h3>
            <p style={styles.emptyDescription}>
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Start by creating your first product'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => {
                  setShowCreateForm(true)
                  setEditingProduct(null)
                  resetForm()
                }}
                style={styles.createButton}
              >
                ➕ Create Your First Product
              </button>
            )}
          </div>
        ) : (
          <div style={styles.productsGrid}>
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock)
              return (
                <div
                  key={product.id}
                  style={styles.productCard}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.productCardHover)
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Product Image */}
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={styles.productImage}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div style={{
                    ...styles.productImagePlaceholder,
                    display: product.image ? 'none' : 'flex'
                  }}>
                    📦
                  </div>

                  {/* Product Content */}
                  <div style={styles.productContent}>
                    <h3 style={styles.productName}>{product.name}</h3>
                    <p style={styles.productDescription}>{product.description}</p>
                    
                    <div style={styles.productMeta}>
                      <div style={styles.productPrice}>${product.price?.toFixed(2)}</div>
                      <div style={styles.productCategory}>{product.category}</div>
                    </div>

                    <div style={styles.productStock}>
                      <span>Stock: {product.stock} units</span>
                      <div style={{...styles.stockBadge, ...stockStatus.style}}>
                        {stockStatus.text}
                      </div>
                    </div>

                    <div style={styles.productActions}>
                      <a
                        href={`/products/${product.id}`}
                        style={{...styles.actionButton, ...styles.viewButton, textDecoration: 'none'}}
                      >
                        👁️ View
                      </a>
                      <button
                        onClick={() => handleEdit(product)}
                        style={{...styles.actionButton, ...styles.editButton}}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        style={{...styles.actionButton, ...styles.deleteButton}}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Create/Edit Modal */}
        {showCreateForm && (
          <div style={styles.modal} onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCreateForm(false)
              setEditingProduct(null)
            }
          }}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>
                  {editingProduct ? '✏️ Edit Product' : '➕ Create New Product'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateForm(false)
                    setEditingProduct(null)
                  }}
                  style={styles.closeButton}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    style={styles.textarea}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Category *</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Stock Quantity *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                    style={styles.fileInput}
                  />
                </div>

                <button type="submit" style={styles.submitButton}>
                  {editingProduct ? '💾 Update Product' : '➕ Create Product'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}