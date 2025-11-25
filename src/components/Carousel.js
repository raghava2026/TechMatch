import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import '../styles/Carousel.css';

const INITIAL_ITEMS = [
  {
    id: 1,
    title: '"Lossless Youths"',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7fjDyzpcVSHyO4GMTfMDMOvaeALc4qI_OJg&s',
  },
  {
    id: 2,
    title: '"Estrange Bond"',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZkObc2RFbosrBgArPF0WaUXMsumj7YKb2vQ&s',
  },
  {
    id: 3,
    title: '"The Gate Keeper"',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkVsqZ0-q4-mMxTflamhHqoTKFizuNhQpXt5wHYlkIJLblbZ6nqtPuh2CWnUaD7zLwCyU&usqp=CAU',
  },
  {
    id: 4,
    title: '"Last Trace Of Us"',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF4idU93JXoZxdYxsU-IT_uiYYftv5m9_AEtjZN2AKbH8GStxv8vEoc225Bm9W7ztHgFY&usqp=CAU',
  },
  {
    id: 5,
    title: '"Urban Decay"',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn1PMi23l_V_pVbnVqSpA5mEVYkkdcSnws2A&s',
  },
  {
    id: 6,
    title: '"The Migration"',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD_GIzA9kjeEhfGJAZGQPFqXLXRgvpzrv0kA&s',
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
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-main">
      <ul className="slider">
        {items.map((item, idx) => (
          <li
            className="item"
            key={item.id}
            style={{ backgroundImage: `url('${item.image}')` }}
          >
            <div className="content">
              <h2 className="title">{item.title}</h2>
              <p className="description">{item.description}</p>
              <button>Read More</button>
            </div>
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
