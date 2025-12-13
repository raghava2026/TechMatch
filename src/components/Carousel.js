import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import '../styles/Carousel.css';

const INITIAL_ITEMS = [
  {
    id: 1,
    src: 'C:\Users\kanth\OneDrive\Desktop\TechMatch\public\assets\car1.png',
  },
  {
    id: 2,
    image: 'https://drive.google.com/file/d/13TVaG6g5hbGDmMnOTuXIpAWy8JxeEERz/view?usp=sharing',
  },
  {
    id: 3,
    image: 'https://drive.google.com/file/d/1uycY8nNI7ptjw6vFe5nIVTg2Ipysl_Z6/view?usp=sharing',
  },
  {
    id: 4,
    image: 'https://drive.google.com/file/d/1ZGG2l_JwydK4Yb0uawxckbWoNhRbZqT5/view?usp=sharing',
  },
  {
    id: 5,
    image: 'https://drive.google.com/file/d/105kGU4XPhkq31JrWYPX-uNlktc7m3VhD/view?usp=sharing',
  },
  {
    id: 6,
    image: 'https://drive.google.com/file/d/1JWpIt3k8MCl0lKtPwAaCiJLF43eN1Var/view?usp=sharing',
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