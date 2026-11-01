import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';

export default function CartItem({ onShop }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="page-wrap cart-page">
      <div className="page-heading">
        <p className="eyebrow">Your leafy picks</p>
        <h1>Your <em>cart</em></h1>
        <p>Almost there — your next favourite plant is waiting.</p>
      </div>
      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🪴</div>
          <h2>Your cart is growing… just not yet!</h2>
          <p>You haven’t added any plants. Let’s find one you love.</p>
          <button className="primary-btn" onClick={onShop}>Explore plants <span>→</span></button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <p className="plant-category">{item.category}</p>
                  <h3>{item.name}</h3>
                  <p>₹{item.price} each</p>
                  <button className="remove-btn" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                </div>
                <div className="quantity-control">
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} aria-label={`Decrease ${item.name} quantity`}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} aria-label={`Increase ${item.name} quantity`}>＋</button>
                </div>
                <strong className="line-total">₹{item.price * item.quantity}</strong>
              </article>
            ))}
          </div>
          <aside className="order-summary">
            <p className="eyebrow">The little details</p>
            <h2>Order summary</h2>
            <div className="summary-line"><span>Items ({itemCount})</span><span>₹{subtotal}</span></div>
            <div className="summary-line"><span>Delivery</span><span className="free-delivery">FREE</span></div>
            <div className="summary-total"><span>Total</span><strong>₹{subtotal}</strong></div>
            <button className="primary-btn checkout-btn" onClick={() => window.alert('Thank you! This demo checkout is ready for project evaluation.')}>Continue to checkout <span>→</span></button>
            <button className="continue-shopping" onClick={onShop}>← Continue shopping</button>
          </aside>
        </div>
      )}
    </main>
  );
}
