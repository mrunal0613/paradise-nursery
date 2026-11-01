import React from 'react';

export default function PlantCard({ plant, onAdd }) {
  return (
    <article className="plant-card">
      <div className="plant-image-wrap"><img src={plant.image} alt={plant.name} loading="lazy" /><span className="plant-badge">{plant.badge}</span><button className="heart-btn" aria-label={`Save ${plant.name}`} onClick={(e) => { e.currentTarget.classList.toggle('hearted'); }}>♡</button></div>
      <div className="plant-info"><p className="plant-category">{plant.category}</p><div className="plant-title-row"><h3>{plant.name}</h3><strong>₹{plant.price}</strong></div><p className="plant-description">{plant.description}</p><button className="add-btn" onClick={() => onAdd(plant)}><span>＋</span> Add to cart</button></div>
    </article>
  );
}
