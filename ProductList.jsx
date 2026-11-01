```jsx
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice';
import './ProductList.css';

const PLANT_CATEGORIES = [
  {
    name: 'Air Purifying Plants',
    plants: [
      {
        id: 'air-1',
        name: 'Snake Plant',
        price: 499,
        image: 'https://images.unsplash.com/photo-1593482892290-f27e2b7d3c3b?auto=format&fit=crop&w=700&q=85',
        description: 'Hardy upright leaves and easy care.',
      },
      {
        id: 'air-2',
        name: 'Peace Lily',
        price: 599,
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=85',
        description: 'Elegant leaves with graceful white blooms.',
      },
      {
        id: 'air-3',
        name: 'Areca Palm',
        price: 699,
        image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=700&q=85',
        description: 'Feathery tropical foliage for bright rooms.',
      },
      {
        id: 'air-4',
        name: 'Spider Plant',
        price: 299,
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=700&q=85',
        description: 'A cheerful, beginner-friendly classic.',
      },
      {
        id: 'air-5',
        name: 'Rubber Plant',
        price: 899,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=85',
        description: 'Glossy deep-green leaves make a statement.',
      },
      {
        id: 'air-6',
        name: 'Dracaena',
        price: 649,
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=85',
        description: 'A sculptural plant with striking foliage.',
      },
    ],
  },
  {
    name: 'Succulents & Cacti',
    plants: [
      {
        id: 'succ-1',
        name: 'Aloe Vera',
        price: 249,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=85',
        description: 'A sun-loving succulent with fleshy leaves.',
      },
      {
        id: 'succ-2',
        name: 'Echeveria',
        price: 199,
        image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=700&q=85',
        description: 'A compact rosette-shaped succulent.',
      },
      {
        id: 'succ-3',
        name: 'Jade Plant',
        price: 299,
        image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=700&q=85',
        description: 'A succulent with rounded green leaves.',
      },
      {
        id: 'succ-4',
        name: 'Golden Barrel Cactus',
        price: 349,
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=700&q=85',
        description: 'A sculptural cactus for a sunny spot.',
      },
      {
        id: 'succ-5',
        name: 'Haworthia',
        price: 279,
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=85',
        description: 'A small succulent with patterned leaves.',
      },
      {
        id: 'succ-6',
        name: 'String of Pearls',
        price: 449,
        image: 'https://images.unsplash.com/photo-1616690247605-b3e3e9a7c7c4?auto=format&fit=crop&w=700&q=85',
        description: 'Trailing bead-like foliage for shelves.',
      },
    ],
  },
  {
    name: 'Tropical & Statement Plants',
    plants: [
      {
        id: 'trop-1',
        name: 'Monstera Deliciosa',
        price: 799,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=85',
        description: 'Iconic split leaves with a tropical feel.',
      },
      {
        id: 'trop-2',
        name: 'Golden Pothos',
        price: 349,
        image: 'https://images.unsplash.com/photo-1616690247605-b3e3e9a7c7c4?auto=format&fit=crop&w=700&q=85',
        description: 'Trailing heart-shaped leaves for corners.',
      },
      {
        id: 'trop-3',
        name: 'Bird of Paradise',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=85',
        description: 'Large leaves for a bold indoor look.',
      },
      {
        id: 'trop-4',
        name: 'Fiddle Leaf Fig',
        price: 1199,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=85',
        description: 'Large violin-shaped leaves.',
      },
      {
        id: 'trop-5',
        name: 'ZZ Plant',
        price: 549,
        image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=700&q=85',
        description: 'Shiny leaves and an easy watering routine.',
      },
      {
        id: 'trop-6',
        name: 'Calathea',
        price: 749,
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=85',
        description: 'Decorative patterned foliage.',
      },
    ],
  },
];

function PlantCard({ plant, added, onAdd }) {
  return (
    <article className="pn-plant-card">
      <div className="pn-plant-image">
        <img src={plant.image} alt={plant.name} loading="lazy" />
      </div>

      <div className="pn-plant-details">
        <h3>{plant.name}</h3>

        <p className="pn-plant-description">
          {plant.description}
        </p>

        <div className="pn-plant-bottom">
          <strong>
            ₹{plant.price.toLocaleString('en-IN')}
          </strong>

          <button
            type="button"
            className="pn-add-button"
            onClick={() => onAdd(plant)}
            disabled={added}
          >
            {added ? 'Added to Cart ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProductList({
  onShop,
  onHome,
  onCart,
}) {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart?.items ?? []
  );

  const [activePage, setActivePage] = useState('plants');
  const [addedToCart, setAddedToCart] = useState({});

  // Calculate the total quantity of all products in the cart.
  const cartQuantity = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  // Create a flat array containing all category products.
  const plantsArray = useMemo(
    () =>
      PLANT_CATEGORIES.flatMap((category) =>
        category.plants.map((plant) => ({
          ...plant,
          category: category.name,
        }))
      ),
    []
  );

  // Add a product to Redux and disable its button.
  const handleAddToCart = (plant) => {
    if (addedToCart[plant.id]) return;

    dispatch(addItem(plant));

    setAddedToCart((previous) => ({
      ...previous,
      [plant.id]: true,
    }));
  };

  // Navigation handlers for Home, Plants and Cart.
  const navigate = (page) => {
    setActivePage(page);

    if (page === 'home' && typeof onHome === 'function') {
      onHome();
    }

    if (page === 'cart' && typeof onCart === 'function') {
      onCart();
    }

    if (page === 'plants' && typeof onShop === 'function') {
      onShop();
    }
  };

  return (
    <div className="pn-product-page">
      <nav className="navbar" aria-label="Main navigation">
        <button
          className="pn-brand"
          type="button"
          onClick={() => navigate('home')}
        >
          <span className="pn-brand-icon">❀</span>
          <span>Paradise Nursery</span>
        </button>

        <ul className="pn-nav-list">
          <li>
            <button
              type="button"
              className={activePage === 'home' ? 'selected' : ''}
              onClick={() => navigate('home')}
            >
              Home
            </button>
          </li>

          <li>
            <button
              type="button"
              className={activePage === 'plants' ? 'selected' : ''}
              onClick={() => navigate('plants')}
            >
              Plants
            </button>
          </li>

          <li>
            <button
              type="button"
              className={activePage === 'cart' ? 'selected' : ''}
              onClick={() => navigate('cart')}
            >
              <span aria-hidden="true">🛒</span>
              Cart
              <span
                className="pn-cart-badge"
                aria-label={`${cartQuantity} items in cart`}
              >
                {cartQuantity}
              </span>
            </button>
          </li>
        </ul>
      </nav>

      <main className="pn-product-main">
        <header className="pn-shop-heading">
          <p className="pn-eyebrow">
            GROW A LITTLE HAPPINESS
          </p>

          <h1>
            Find your perfect <em>plant</em>
          </h1>

          <p>
            Bring nature home with our hand-picked collection
            of indoor plants.
          </p>

          <div className="pn-cart-summary" aria-live="polite">
            <span aria-hidden="true">🛒</span>
            Your cart contains <strong>{cartQuantity}</strong>
            {' '}
            {cartQuantity === 1 ? 'item' : 'items'}
          </div>
        </header>

        {PLANT_CATEGORIES.map((category) => (
          <section
            className="pn-category-section"
            key={category.name}
          >
            <div className="pn-category-heading">
              <h2>{category.name}</h2>
              <span>{category.plants.length} plants</span>
            </div>

            <div className="pn-plant-grid">
              {category.plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  added={Boolean(addedToCart[plant.id])}
                  onAdd={handleAddToCart}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
```
