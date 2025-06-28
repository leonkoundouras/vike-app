import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../components/AuthContext'
import Layout from '../../../components/Layout'
import '../../../styles/responsive.css'

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    fontSize: '0.95rem',
    color: '#6c757d'
  },
  breadcrumbLink: {
    color: '#3498db',
    textDecoration: 'none',
    transition: 'color 0.2s'
  },
  breadcrumbSeparator: {
    color: '#adb5bd'
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#3498db',
    textDecoration: 'none',
    marginBottom: '1rem',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.2s',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e1e8ed',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  productHeader: {
    marginBottom: '2rem',
    padding: '1.5rem',
    borderRadius: '12px',
    backgroundColor: 'white',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e1e8ed'
  },
  productContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    marginBottom: '3rem'
  },
  imageSection: {
    position: 'relative'
  },
  productImage: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer'
  },
  productImageHover: {
    transform: 'scale(1.02)'
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
  imagePlaceholder: {
    width: '100%',
    height: '500px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    color: '#6c757d',
    border: '2px dashed #dee2e6'
  },
  productInfo: {
    padding: '1rem 0'
  },
  categoryTag: {
    display: 'inline-block',
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  productName: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '1rem',
    lineHeight: '1.2'
  },
  price: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  priceLabel: {
    fontSize: '1rem',
    color: '#6c757d',
    fontWeight: 'normal'
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e9ecef'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '2rem'
  },
  detailItem: {
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  detailItemHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 15px rgba(0,0,0,0.1)'
  },
  detailLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '0.5rem'
  },
  detailValue: {
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#2c3e50'
  },
  stockBadge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  stockInStock: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
  },
  stockLowStock: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    border: '1px solid #ffeaa7'
  },
  stockOutOfStock: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  },
  specificationsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e1e8ed'
  },
  tableRow: {
    borderBottom: '1px solid #e9ecef'
  },
  tableHeader: {
    padding: '1rem',
    textAlign: 'left',
    backgroundColor: '#f8f9fa',
    color: '#495057',
    fontWeight: '600',
    fontSize: '1rem'
  },
  tableCell: {
    padding: '1rem',
    color: '#495057',
    fontSize: '1rem'
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem'
  },
  editButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)'
  },
  relatedProductsSection: {
    marginTop: '3rem',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #e1e8ed'
  },
  relatedProductsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '1.5rem'
  },
  relatedProductCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer'
  },
  relatedProductCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
  },
  relatedProductImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover'
  },
  relatedProductContent: {
    padding: '1rem'
  },
  relatedProductName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '0.5rem'
  },
  relatedProductPrice: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#27ae60'
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#6c757d'
  },
  error: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#e74c3c',
    backgroundColor: '#f8d7da',
    borderRadius: '8px',
    border: '1px solid #f5c6cb'
  },
  imageModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem'
  },
  modalImage: {
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  },
  closeModalButton: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '2rem',
    cursor: 'pointer'
  }
}

export default function ProductDetailPage() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [productId, setProductId] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])
  const [showImageModal, setShowImageModal] = useState(false)
  const [hoveredDetail, setHoveredDetail] = useState(null)
  const [hoveredImage, setHoveredImage] = useState(false)

  useEffect(() => {
    // Get product ID from URL on client side
    if (typeof window !== 'undefined') {
      const id = window.location.pathname.split('/').pop()
      setProductId(id)
    }
  }, [])

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
      return
    }

    if (isAuthenticated && productId) {
      fetchProduct()
    }
  }, [isAuthenticated, authLoading, productId])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      const response = await fetch(`/api/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        setProduct(data.data.product)
        fetchRelatedProducts(data.data.product.category)
      } else {
        setError(data.message || 'Failed to fetch product')
      }
    } catch (err) {
      console.error('Error fetching product:', err)
      setError('Failed to fetch product')
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async (category) => {
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch(`/api/products`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        // Filter products by category and exclude current product
        const related = data.data.products
          .filter(p => p.category === category && p.id !== productId)
          .slice(0, 4) // Limit to 4 related products
        setRelatedProducts(related)
      }
    } catch (err) {
      console.error('Error fetching related products:', err)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
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
        if (typeof window !== 'undefined') {
          window.location.href = '/products'
        }
      } else {
        alert(data.message || 'Failed to delete product')
      }
    } catch (err) {
      console.error('Error deleting product:', err)
      alert('Failed to delete product')
    }
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', style: styles.stockOutOfStock }
    if (stock <= 10) return { text: 'Low Stock', style: styles.stockLowStock }
    return { text: 'In Stock', style: styles.stockInStock }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (authLoading || loading) {
    return (
      <Layout>
        <div style={styles.loading}>
          <div>🔄 Loading product details...</div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div style={styles.container}>
          <a href="/products" style={styles.backButton}>
            ← Back to Products
          </a>
          <div style={styles.error}>
            ❌ {error}
          </div>
        </div>
      </Layout>
    )
  }

  if (!product) {
    return (
      <Layout>
        <div style={styles.container}>
          <a href="/products" style={styles.backButton}>
            ← Back to Products
          </a>
          <div style={styles.error}>
            Product not found
          </div>
        </div>
      </Layout>
    )
  }

  const stockStatus = getStockStatus(product.stock)

  return (
    <Layout>
      <div style={styles.container}>
        {/* Breadcrumbs */}
        <div style={styles.breadcrumbs}>
          <a href="/" style={styles.breadcrumbLink}>Home</a>
          <span style={styles.breadcrumbSeparator}>/</span>
          <a href="/products" style={styles.breadcrumbLink}>Products</a>
          <span style={styles.breadcrumbSeparator}>/</span>
          <span>{product.name}</span>
        </div>

        <a href="/products" style={styles.backButton}>
          ← Back to Products
        </a>

        {/* Product Header */}
        <div style={styles.productHeader}>
          <div style={styles.categoryTag}>{product.category || 'Uncategorized'}</div>
          <h1 style={styles.productName}>{product.name}</h1>
        </div>

        <div style={styles.productContainer}>
          {/* Product Image */}
          <div style={styles.imageSection}>
            {product.featured && (
              <div style={styles.featuredBadge}>✨ Featured</div>
            )}
            
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                style={{
                  ...styles.productImage,
                  ...(hoveredImage ? styles.productImageHover : {})
                }}
                onMouseEnter={() => setHoveredImage(true)}
                onMouseLeave={() => setHoveredImage(false)}
                onClick={() => setShowImageModal(true)}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <div style={{
              ...styles.imagePlaceholder,
              display: product.image ? 'none' : 'flex'
            }}>
              📦
            </div>
          </div>

          {/* Product Information */}
          <div style={styles.productInfo}>
            <div style={styles.price}>
              <span style={styles.priceLabel}>Price:</span>
              ${product.price?.toFixed(2)}
            </div>
            
            <div style={styles.description}>
              {product.description}
            </div>

            <h3 style={styles.sectionTitle}>Product Details</h3>
            <div style={styles.detailsGrid}>
              <div 
                style={{
                  ...styles.detailItem,
                  ...(hoveredDetail === 'category' ? styles.detailItemHover : {})
                }}
                onMouseEnter={() => setHoveredDetail('category')}
                onMouseLeave={() => setHoveredDetail(null)}
              >
                <div style={styles.detailLabel}>Category</div>
                <div style={styles.detailValue}>{product.category || 'Uncategorized'}</div>
              </div>

              <div 
                style={{
                  ...styles.detailItem,
                  ...(hoveredDetail === 'sku' ? styles.detailItemHover : {})
                }}
                onMouseEnter={() => setHoveredDetail('sku')}
                onMouseLeave={() => setHoveredDetail(null)}
              >
                <div style={styles.detailLabel}>SKU</div>
                <div style={styles.detailValue}>{product.sku || 'N/A'}</div>
              </div>

              <div 
                style={{
                  ...styles.detailItem,
                  ...(hoveredDetail === 'stock' ? styles.detailItemHover : {})
                }}
                onMouseEnter={() => setHoveredDetail('stock')}
                onMouseLeave={() => setHoveredDetail(null)}
              >
                <div style={styles.detailLabel}>Stock</div>
                <div style={styles.detailValue}>
                  {product.stock} units
                  <div style={{...styles.stockBadge, ...stockStatus.style, marginTop: '0.5rem'}}>
                    {stockStatus.text}
                  </div>
                </div>
              </div>

              <div 
                style={{
                  ...styles.detailItem,
                  ...(hoveredDetail === 'created' ? styles.detailItemHover : {})
                }}
                onMouseEnter={() => setHoveredDetail('created')}
                onMouseLeave={() => setHoveredDetail(null)}
              >
                <div style={styles.detailLabel}>Created</div>
                <div style={styles.detailValue}>{formatDate(product.createdAt)}</div>
              </div>
            </div>

            {/* Specifications Table */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <>
                <h3 style={styles.sectionTitle}>Specifications</h3>
                <table style={styles.specificationsTable}>
                  <thead>
                    <tr style={styles.tableRow}>
                      <th style={styles.tableHeader}>Specification</th>
                      <th style={styles.tableHeader}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} style={styles.tableRow}>
                        <td style={styles.tableCell}>{key}</td>
                        <td style={styles.tableCell}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            <div style={styles.actionButtons}>
              <a 
                href="/products"
                style={styles.editButton}
              >
                ↩️ Back to Products
              </a>
              <button 
                onClick={handleDelete}
                style={styles.deleteButton}
              >
                🗑️ Delete Product
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div style={styles.relatedProductsSection}>
            <h3 style={styles.sectionTitle}>Related Products</h3>
            <div style={styles.relatedProductsGrid}>
              {relatedProducts.map(relatedProduct => (
                <a 
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div 
                    style={styles.relatedProductCard}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.relatedProductCardHover)
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                  >
                    {relatedProduct.image ? (
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        style={styles.relatedProductImage}
                      />
                    ) : (
                      <div style={{
                        ...styles.relatedProductImage,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f8f9fa',
                        fontSize: '2rem'
                      }}>
                        📦
                      </div>
                    )}
                    <div style={styles.relatedProductContent}>
                      <div style={styles.relatedProductName}>{relatedProduct.name}</div>
                      <div style={styles.relatedProductPrice}>${relatedProduct.price?.toFixed(2)}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showImageModal && (
          <div style={styles.imageModal} onClick={() => setShowImageModal(false)}>
            <button style={styles.closeModalButton} onClick={() => setShowImageModal(false)}>✕</button>
            <img 
              src={product.image} 
              alt={product.name}
              style={styles.modalImage}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}