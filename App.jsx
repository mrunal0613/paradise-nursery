import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';
import { addItem } from './CartSlice';

const plants = [
  { id: 1, name: 'Monstera Deliciosa', category: 'Statement Plants', price: 799, description: 'A bold tropical beauty with iconic split leaves.', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=85', badge: 'Bestseller' },
  { id: 2, name: 'Snake Plant', category: 'Easy Care', price: 499, description: 'A low-maintenance plant that looks good anywhere.', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?auto=format&fit=crop&w=900&q=85', badge: 'Easy care' },
  { id: 3, name: 'Golden Pothos', category: 'Hanging Plants', price: 349, description: 'Trailing heart-shaped leaves for shelves and corners.', image: 'https://images.unsplash.com/photo-1616690247605-b3e3e9a7c7c4?auto=format&fit=crop&w=900&q=85', badge: 'Popular' },
  { id: 4, name: 'Peace Lily', category: 'Flowering Plants', price: 599, description: 'Elegant green foliage with graceful white blooms.', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=900&q=85', badge: 'Fresh pick' },
  { id: 5, name: 'Rubber Plant', category: 'Statement Plants', price: 899, description: 'Glossy, deep-green leaves that make a statement.', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85', badge: 'New' },
  { id: 6, name: 'ZZ Plant', category: 'Easy Care', price: 549, description: 'Shiny leaves and a relaxed attitude to watering.', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=900&q=85', badge: 'Beginner friendly' }
];

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All plants');
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const goTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const filteredPlants = plants.filter((plant) =>
    (category === 'All plants' || plant.category === category) &&
    `${plant.name} ${plant.description}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => goTo('home')} aria-label="Paradise Nursery home">
          <span className="brand-mark">✿</span>
          <span>paradise<span className="brand-light">nursery</span><small>GROW A LITTLE HAPPINESS</small></span>
        </button>
        <nav className="main-nav" aria-label="Main navigation">
          <button className={activePage === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => goTo('home')}>Home</button>
          <button className={activePage === 'shop' ? 'nav-link active' : 'nav-link'} onClick={() => goTo('shop')}>Shop plants</button>
          <button className={activePage === 'about' ? 'nav-link active' : 'nav-link'} onClick={() => goTo('about')}>About us</button>
        </nav>
        <button className="cart-nav" onClick={() => goTo('cart')} aria-label={`Shopping cart with ${cartCount} items`}>
          <span className="cart-icon">🛒</span><span>Cart</span><b>{cartCount}</b>
        </button>
      </header>

      {activePage === 'home' && (
        <main>
          <section className="hero">
            <div className="hero-content">
              <p className="eyebrow">A little green goes a long way</p>
              <h1>Bring home a<br /><em>little paradise.</em></h1>
              <p className="hero-copy">Thoughtfully chosen plants to make your space feel calmer, brighter, and more alive.</p>
              <button className="primary-btn" onClick={() => goTo('shop')}>Get Started <span>→</span></button>
              <div className="hero-note"><span>✦</span> Carefully packed · Happy plants · Happy homes</div>
            </div>
            <div className="hero-sticker"><span>GROW</span><strong>good<br />things</strong><span>EVERY DAY</span></div>
          </section>
          <section className="promise-row">
            <div><span className="promise-icon">☀</span><span><b>Plants for every space</b><small>From sunny windows to cozy corners</small></span></div>
            <div><span className="promise-icon">♡</span><span><b>Picked with care</b><small>Healthy plants, ready for home</small></span></div>
            <div><span className="promise-icon">♧</span><span><b>Beginner friendly</b><small>Helpful tips for your plant journey</small></span></div>
          </section>
          <ProductList plants={plants.slice(0, 3)} onAdd={handleAddToCart} onShop={() => goTo('shop')} compact />
          <section className="quote-band"><span>“</span><p>Take a breath. Water your plants. Let the little things grow.</p><small>YOUR DAILY REMINDER TO SLOW DOWN</small></section>
        </main>
      )}

      {activePage === 'shop' && (
        <main className="page-wrap">
          <div className="page-heading"><p className="eyebrow">Find your new favourite</p><h1>Shop the <em>greenery</em></h1><p>Good plants, good energy, and a little more life in every room.</p></div>
          <div className="catalog-controls">
            <label className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search plants..." /></label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
              <option>All plants</option><option>Statement Plants</option><option>Easy Care</option><option>Hanging Plants</option><option>Flowering Plants</option>
            </select>
          </div>
          <ProductList plants={filteredPlants} onAdd={handleAddToCart} />
        </main>
      )}

      {activePage === 'cart' && <CartItem onShop={() => goTo('shop')} />}
      {activePage === 'about' && <AboutUs />}
      <footer className="footer"><div className="footer-brand">✿ paradise nursery</div><p>Making room for a little more green, one plant at a time.</p><small>© 2026 Paradise Nursery · Made with care and a little sunshine.</small></footer>
    </div>
  );
}
