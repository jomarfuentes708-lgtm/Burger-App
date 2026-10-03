import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BurgerGrid, { defaultBurgers } from './components/BurgerGrid';

export default function App() {
  const [favorites, setFavorites] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddToOrder = (item) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (cartItem) => (cartItem.id ?? cartItem.name) === (item.id ?? item.name),
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        const currentItem = updated[existingIndex];
        const nextQuantity = Number(currentItem.quantity || 0) + Number(item.quantity || 0);

        updated[existingIndex] = {
          ...currentItem,
          quantity: nextQuantity,
          subtotal: nextQuantity * Number(item.price || currentItem.price || 0),
        };

        return updated;
      }

      return [...prev, { ...item, subtotal: Number(item.subtotal || item.price * item.quantity || 0) }];
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => (item.id ?? item.name) !== id));
  };

  return (
    <div className="app-shell">
      <Header cartCount={cartItems.length} />

      <main id="shop" className="burger-shop">
        <section id="our-menu">
          <BurgerGrid
            burgers={defaultBurgers}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
            cartItems={cartItems}
            onRemoveItem={handleRemoveItem}
            onAddToOrder={handleAddToOrder}
          />
        </section>
      </main>

      <section id="contact" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
        <h2>Contact</h2>
        <p>Email: jomarfuentes708@gmail.com PHONE; 09386314157</p>
      </section>
    </div>
  );
}
