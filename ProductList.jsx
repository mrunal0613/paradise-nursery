import React from 'react';
import PlantCard from './PlantCard';

export default function ProductList({ plants, onAdd, onShop, compact = false }) {
  return (
    <section className={compact ? 'catalog-section compact-section' : 'catalog-section'}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{compact ? 'A few leafy favourites' : 'Meet your leafy companions'}</p>
          <h2>{compact ? <>Plants we <em>love</em></> : <>Find your kind of <em>green</em></>}</h2>
        </div>
        {compact && <button className="text-btn" onClick={onShop}>View all plants <span>→</span></button>}
      </div>
      {plants.length > 0 ? (
        <div className="plant-grid">
          {plants.map((plant) => <PlantCard key={plant.id} plant={plant} onAdd={onAdd} />)}
        </div>
      ) : (
        <div className="empty-search"><span>🌱</span><h3>No plants found just yet</h3><p>Try another search or choose a different category.</p></div>
      )}
    </section>
  );
}
