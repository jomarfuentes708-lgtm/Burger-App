import { useState } from 'react';
import BurgerCard from './BurgerCard';
import BurgerDetails from './BurgerDetails';

export const defaultBurgers = [
    {
        id: 1,
        name: 'MUSHROOM SWISS BURGER',
        rating: 5,
        description: 'Green bun, veggie patty, sautéed mushrooms, shredded carrots, tomato, fresh lettuce, and jalapeño aioli.',
        price: 139,
        image: 'https://png.pngtree.com/thumb_back/fh260/background/20220623/pngtree-vegetarian-burger-with-mushrooms-on-wooden-background-nutritious-burger-rusty-photo-image_44553894.jpg',
        ingredients: ['Green Bun', 'Veggie Patty', 'Sautéed Mushrooms', 'Shredded Carrots', 'Sliced Tomato', 'Fresh Lettuce', 'Jalapeño Aioli'],
        images: [
            'https://png.pngtree.com/thumb_back/fh260/background/20220623/pngtree-vegetarian-burger-with-mushrooms-on-wooden-background-nutritious-burger-rusty-photo-image_44553894.jpg',
        ],
    },
    {
        id: 2,
        name: 'HAWAIIAN BBQ BURGER',
        rating: 5,
        description: 'Grilled beef patty topped with crispy bacon strips, grilled pineapple, melted cheddar cheese, fresh lettuce, and sweet BBQ sauce.',
        price: 149,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkGQwes-8lfWnZXQLrRslKwfD8-a57bLb4Y9duN9SipR5HrKnVIW29B6s&s=10',
        ingredients: ['Brioche Bun', 'Grilled Beef Patty', 'Crispy Bacon', 'Grilled Pineapple', 'Melted Cheddar Cheese', 'Fresh Lettuce', 'BBQ Sauce'],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkGQwes-8lfWnZXQLrRslKwfD8-a57bLb4Y9duN9SipR5HrKnVIW29B6s&s=10',
        ],
    },
    {
        id: 3,
        name: 'SPICY JALAPEÑO MELT',
        rating: 5,
        description: 'Juicy beef patty, sliced jalapeños, melted pepper jack cheese, crispy lettuce, signature spicy sauce',
        price: 129,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJKLjjfd8nVhEpZRU3gRMdq1Gzeh_5iJmZ1T1f1DR1JlBnLdS2TlTTDgU&s=10',
        ingredients: ['Beef patty', 'Sliced jalapeños', 'Pepper jack cheese', 'Lettuce', 'Spicy sauce', 'Sesame bun'],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJKLjjfd8nVhEpZRU3gRMdq1Gzeh_5iJmZ1T1f1DR1JlBnLdS2TlTTDgU&s=10',
        ],
    },
    {
        id: 4,
        name: 'DOUBLE SMASHBURGER',
        rating: 5,
        description: 'Double smashed beef patties, melted American cheese, pickles, shredded lettuce, onions, and house special sauce.',
        price: 169,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz2wfo7MUu9xqdKPqwxEgU8x2p1vPP4L371zK4GH-EXj01j50P040YYwc&s=10',
        ingredients: ['Brioche Bun', 'Double Smashed Beef Patties', 'Melted American Cheese', 'Sliced Pickles', 'Shredded Lettuce', 'Onions', 'House Special Sauce'],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz2wfo7MUu9xqdKPqwxEgU8x2p1vPP4L371zK4GH-EXj01j50P040YYwc&s=10',
        ],
    },
];

export default function BurgerGrid({ burgers = defaultBurgers, onToggleFavorite, favorites = {}, cartItems = [], onRemoveItem, onAddToOrder }) {
    const [selectedBurger, setSelectedBurger] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleOpenDetails = (burger) => {
        setSelectedBurger(burger);
        setQuantity(1);
    };

    const handleCloseDetails = () => {
        setSelectedBurger(null);
        setQuantity(1);
    };

    return (
        <>
            <section className="burger-grid" aria-label="Burger menu">
                <div className="burger-grid__intro">
                    <p className="burger-grid__subtitle burger-grid__subtitle--main">
                        JOMAR BURGER
                    </p>
                </div>

                <div className="burger-grid__items">
                    {burgers.map((burger) => (
                        <BurgerCard
                            key={burger.id}
                            burger={burger}
                            onSelect={handleOpenDetails}
                            onToggleFavorite={onToggleFavorite}
                            isFavorite={Boolean(favorites[burger.id])}
                        />
                    ))}
                </div>
            </section>

            {selectedBurger && (
                <BurgerDetails
                    burger={selectedBurger}
                    onClose={handleCloseDetails}
                    cartItems={cartItems}
                    onRemoveItem={onRemoveItem}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={Boolean(favorites[selectedBurger.id])}
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    onAddToOrder={onAddToOrder}
                />
            )}
        </>
    );
}