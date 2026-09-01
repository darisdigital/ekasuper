import React from 'react';
import { LandingPage } from './components/LandingPage';
import { INITIAL_PRODUCTS } from './data/initialData';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <LandingPage
        products={INITIAL_PRODUCTS}
      />
    </div>
  );
}
