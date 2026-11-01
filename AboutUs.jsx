import React from 'react';

export default function AboutUs() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div><p className="eyebrow">A greener kind of everyday</p><h1>Rooted in nature.<br /><em>Made for your home.</em></h1><p>At Paradise Nursery, we believe a plant is more than décor. It’s a small reminder to pause, care, and watch something wonderful grow.</p></div>
        <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1100&q=85" alt="A collection of lush green houseplants" />
      </section>
      <section className="about-story"><div className="story-number">01 <span>— OUR STORY</span></div><div><h2>A little green can change <em>everything.</em></h2><p>Paradise Nursery began with one simple idea: bringing nature indoors should feel joyful, not complicated. We curate beautiful, healthy houseplants for first-time plant parents and lifelong collectors alike.</p><p>From statement-making leaves to easy-care favourites, every plant in our collection is chosen to help you make your space feel a little more like you.</p></div></section>
      <section className="values-grid"><article><span>✿</span><h3>Chosen with care</h3><p>We focus on lovely, healthy plants that are ready to settle into their new homes.</p></article><article><span>☀</span><h3>Growing together</h3><p>Plant care should be approachable. Start small, learn as you go, and enjoy the process.</p></article><article><span>♡</span><h3>More life indoors</h3><p>We want every corner, shelf, and sunny window to have room for a little green.</p></article></section>
      <section className="about-bottom"><p className="eyebrow">Ready to grow?</p><h2>Your next plant is <em>waiting.</em></h2><p>Find a leafy friend that feels right at home with you.</p></section>
    </main>
  );
}
