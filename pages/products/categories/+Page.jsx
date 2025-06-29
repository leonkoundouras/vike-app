import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../components/AuthContext'
import Layout from '../../../components/Layout'
import '../../../styles/responsive.css'

const styles = {
  container: {
    margin: '0 auto',
    maxWidth: '800px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    padding: '1.5rem',
    color: 'white',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
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
  formContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    marginBottom: '2rem',
    border: '1px solid #e1e8ed'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#2c3e50'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1rem'
  },
  addButton: {
    backgroundColor: '#28a745',
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
  cancelButton: {
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
  error: {
    color: '#dc3545',
    marginTop: '0.5rem',
    fontSize: '0.9rem'
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    border: '1px solid #c3e6cb'
  },
  categoriesContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    marginBottom: '2rem',
    border: '1px solid #e1e8ed'
  },
  categoriesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    borderBottom: '1px solid #e9ecef',
    paddingBottom: '1rem'
  },
  categoriesTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  categoryCount: {
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '20px',
    padding: '0.25rem 0.75rem',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  categoryList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem'
  },
  categoryCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '1rem',
    border: '1px solid #e9ecef',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryName: {
    fontWeight: '600',
    color: '#2c3e50'
  },
  categoryItemCount: {
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem'
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem',
    color: '#6c757d'
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#6c757d'
  }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const { isAuthenticated, loading: authLoading, getAuthHeaders, handleApiError } = useAuth()
  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = '/login'
      return
    }
    
    if (isAuthenticated) {
      fetchCategories()
    }
  }, [isAuthenticated, authLoading])
  
  const fetchCategories = async () => {
    try {
      setLoading(true)
      
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
      setError('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }
  
  const handleAddCategory = async (e) => {
    e.preventDefault()
    
    if (!newCategory.trim()) {
      setError('Category name is required')
      return
    }
    
    // Check if category already exists
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      setError('Category already exists')
      return
    }
    
    // Create a product with the new category to add it to the system
    try {
      setLoading(true)
      setError('')
      setSuccess('')
      
      // Create a minimal product with the new category
      const dummyProduct = {
        name: `Category Placeholder - ${newCategory}`,
        description: `This is a placeholder product for the ${newCategory} category.`,
        price: 0.01,
        category: newCategory,
        stock: 0,
        status: 'draft'
      }
      
      const formDataObj = new FormData()
      Object.entries(dummyProduct).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: getAuthHeaders(true), // Skip content-type for FormData
        body: formDataObj
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create category')
      }
      
      // Update categories list
      await fetchCategories()
      
      setNewCategory('')
      setSuccess(`Category "${newCategory}" added successfully!`)
    } catch (err) {
      setError(err.message || 'Failed to add category')
    } finally {
      setLoading(false)
    }
  }
  
  if (authLoading || loading) {
    return (
      <Layout>
        <div style={styles.loading}>
          <div>🔄 Loading categories...</div>
        </div>
      </Layout>
    )
  }
  
  return (
    <Layout>
      <div style={styles.container} className="categories-container">
        {/* Header */}
        <div style={styles.header} className="categories-header">
          <div>
            <h1 style={styles.title}>🏷️ Product Categories</h1>
            <p style={styles.subtitle}>Manage your product categories</p>
          </div>
        </div>
        
        {/* Add Category Form */}
        <div style={styles.formContainer} className="add-category-form">
          {success && <div style={styles.success}>{success}</div>}
          {error && <div style={styles.error}>{error}</div>}
          
          <form onSubmit={handleAddCategory}>
            <div style={styles.formGroup} className="form-group">
              <label style={styles.label} htmlFor="categoryName">New Category Name</label>
              <input
                type="text"
                id="categoryName"
                style={styles.input}
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                required
              />
            </div>
            
            <div style={styles.buttonContainer}>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={() => window.location.href = '/products'}
                disabled={loading}
              >
                Back to Products
              </button>
              <button
                type="submit"
                style={styles.addButton}
                disabled={loading}
              >
                {loading ? '🔄 Adding...' : '➕ Add Category'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Categories List */}
        <div style={styles.categoriesContainer} className="categories-list">
          <div style={styles.categoriesHeader}>
            <div style={styles.categoriesTitle}>Existing Categories</div>
            <div style={styles.categoryCount}>{categories.length}</div>
          </div>
          
          {categories.length === 0 ? (
            <div style={styles.emptyState}>
              No categories found. Add your first category above.
            </div>
          ) : (
            <div style={styles.categoryList}>
              {categories.map(category => (
                <div key={category.name} style={styles.categoryCard}>
                  <div style={styles.categoryName}>{category.name}</div>
                  <div style={styles.categoryItemCount}>{category.count}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}