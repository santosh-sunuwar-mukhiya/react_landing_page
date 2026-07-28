import React from 'react';
import FilterBar from './FilterBar';
import Header from './Header';
import { products, categories } from '../data';
import { useParams } from 'react-router-dom';

  const ProductDisplay = () => {
  const { categoryName } = useParams()
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [cart, setCart] = React.useState([])

  // Load cart from localStorage on mount
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('cart')
      if (raw) setCart(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load cart from localStorage', e)
      localStorage.removeItem('cart')
    }
  }, [])

  // Persist cart to localStorage whenever it changes
  React.useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }, [cart])

  // Add product or increase quantity if already in cart
  const addToCart = (product) => {
    setCart(prev => {
      const index = prev.findIndex(item => item.id === product.id)
      if (index !== -1) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }]
    })
  }

  const increaseQuantity = (id) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
  }

  const decreaseQuantity = (id) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id)
      if (!item) return prev
      if (item.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
      }
      // remove item if quantity would go to 0
      return prev.filter(i => i.id !== id)
    })
  }

  const removeItem = (id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const clearCart = () => setCart([])

  React.useEffect(() => {
    const decodedCategory = categoryName ? decodeURIComponent(categoryName) : "All"
    setActiveCategory(decodedCategory)
  }, [categoryName])

  const itemsToDisplay = activeCategory === "All" ? products : products.filter((item) => item.category === activeCategory)
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)

  return (
    <div className='container py-4'>
    <Header
      cartItems={cart}
      cartCount={totalCount}
      onIncrease={increaseQuantity}
      onDecrease={decreaseQuantity}
      onRemove={removeItem}
      onClear={clearCart}
    />
    <FilterBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} categories={categories}/>
      <div className='row g-4 product-grid'>
        {itemsToDisplay.map((product) => (
          <div key={product.id} className='col-12 col-sm-6 col-md-4 col-lg-3'>
            <div className="card h-100 shadow-sm overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top product-card-img"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted mb-2">{product.category}</p>
                <p className="card-text fw-bold mb-4">${product.price}</p>
                <button
                  className="btn btn-primary w-100 mt-auto"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductDisplay