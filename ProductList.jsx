```jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice';
import PlantCard from './PlantCard';

const DEFAULT_PLANTS = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    category: 'Statement Plants',
    price: 799,
    description: 'A bold tropical beauty with iconic split leaves.',
    image:
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=85',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Snake Plant',
    category: 'Easy Care',
    price: 499,
    description: 'A low-maintenance plant that looks good anywhere.',
    image:
      'https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?auto=format&fit=crop&w=900&q=85',
    badge: 'Easy care',
  },
  {
    id: 3,
    name: 'Golden Pothos',
    category: 'Hanging Plants',
    price: 349,
    description: 'Trailing heart-shaped leaves for shelves and corners.',
    image:
      'https://images.unsplash.com/photo-1616690247605-b3e3e9a7c7c4?auto=format&fit=crop&w=900&q=85',
    badge: 'Popular',
  },
  {
    id: 4,
    name: 'Peace Lily',
    category: 'Flowering Plants',
    price: 599,
    description: 'Elegant green foliage with graceful white blooms.',
    image:
      'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=900&q=85',
    badge: 'Fresh pick',
  },
  {
    id: 5,
    name: 'Rubber Plant',
    category: 'Statement Plants',
    price: 899,
    description: 'Glossy, deep-green leaves that make a statement.',
    image:
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85',
    badge: 'New',
  },
  {
    id: 6,
    name: 'ZZ Plant',
    category: 'Easy Care',
    price: 549,
    description: 'Shiny leaves and a relaxed attitude to watering.',
    image:
      'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=900&q=85',
    badge: 'Beginner friendly',
  },
];

export default function ProductList({
  plants = DEFAULT_PLANTS,
  onAdd,
  onShop,
  compact = false,
}) {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart?.items ?? []
  );

  const handleAddToCart = (plant) => {
    if (typeof onAdd === 'function') {
      onAdd(plant);
    } else {
      dispatch(addItem(plant));
    }
  };

  const getCartQuantity = (plantId) => {
    const item = cartItems.find(
      (cartItem) => cartItem.id === plantId
    );

    return item ? item.quantity : 0;
  };

  return (
    <section
      className={
        compact
          ? 'catalog-section compact-section'
          : 'catalog-section'
      }
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {compact
              ? 'A few leafy favourites'
              : 'Meet your leafy companions'}
          </p>

          <h2>
            {compact ? (
              <>
                Plants we <em>love</em>
              </>
            ) : (
              <>
                Find your kind of <em>green</em>
              </>
            )}
          </h2>
        </div>

        {compact && onShop && (
          <button
            type="button"
            className="text-btn"
            onClick={onShop}
          >
            View all plants <span>→</span>
          </button>
        )}
      </div>

      {plants.length > 0 ? (
        <div className="plant-grid">
          {plants.map((plant) => (
            <article
              className="product-list-item"
              key={plant.id}
            >
              <PlantCard
                plant={plant}
                onAdd={handleAddToCart}
                quantityInCart={getCartQuantity(plant.id)}
              />
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-search" role="status">
          <span>🌱</span>
          <h3>No plants found just yet</h3>
          <p>
            Try another search or choose a different category.
          </p>
        </div>
      )}
    </section>
  );
}
```
