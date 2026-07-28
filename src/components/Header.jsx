import React from 'react'

const Header = ({ cartItems = [], cartCount = 0, onIncrease = () => {}, onDecrease = () => {}, onRemove = () => {}, onClear = () => {} }) => {
  const [showPreview, setShowPreview] = React.useState(false)

  return (
    <>
      <header className="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
        <h1 className="m-0">Xstore</h1>
        <div style={{ position: 'relative' }}>
          <button aria-label="toggle cart" onClick={() => setShowPreview(s => !s)} className="btn btn-outline-dark">
            🛒 {cartCount}
          </button>

          {showPreview && (
            <div role="region" aria-label="cart preview" style={{ position: 'absolute', right: 0, top: '2.5rem', width: 300, background: 'white', border: '1px solid #ccc', padding: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 100 }}>
              <div className="d-flex justify-content-between">
                <strong>Cart</strong>
                <button onClick={onClear} aria-label="clear cart">Clear</button>
              </div>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                <div style={{ maxHeight: 240, overflowY: 'auto' }}>
                  {cartItems.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                      <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: '#666' }}>${item.price} • x{item.quantity}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <button onClick={() => onIncrease(item.id)} aria-label={`increase-${item.id}`}>+</button>
                        <button onClick={() => onDecrease(item.id)} aria-label={`decrease-${item.id}`}>-</button>
                        <button onClick={() => onRemove(item.id)} aria-label={`remove-${item.id}`}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default Header