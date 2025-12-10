import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import '../styles/Carousel.css';

const INITIAL_ITEMS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
];

export default function Carousel() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const next = () => {
    setItems((prev) => {
      const newItems = [...prev];
      const first = newItems.shift();
      newItems.push(first);
      return newItems;
    });
  };

  const prev = () => {
    setItems((prev) => {
      const newItems = [...prev];
      const last = newItems.pop();
      newItems.unshift(last);
      return newItems;
    });
  };

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-main">
      <ul>
        {items.map((item, idx) => (
          <li
            className="item"
            key={item.id}
            style={{ backgroundImage: `url('${item.image}')` }}
          >
            {/* Image only - no overlay cards */}
          </li>
        ))}
      </ul>
      <nav className="nav">
        <div className="btn prev" onClick={prev} aria-label="Previous">
          <IoArrowBackOutline />
        </div>
        <div className="btn next" onClick={next} aria-label="Next">
          <IoArrowForwardOutline />
        </div>
      </nav>
    </div>
  );
}
