// src/pages/country/index.js

import React, { useRef } from 'react';
import Sidebar from '../../components2/Sidebar';
import './Mycloth.css';

const Mycloth = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const outerRef = useRef(null);

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <Sidebar>
      <div className="mycloth-container">
        <div className="clothing-section">
          <h3>● 상의</h3>
          <div className="arrow left" onClick={() => scrollLeft(topRef)}>
            ◀
          </div>
          <div className="clothing-box" ref={topRef}>
            {[...Array(10)].map((_, index) => (
              <div className="clothing-item" key={index}>
                <img src={`/images/top-${index + 1}.jpg`} alt={`상의 ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="arrow right" onClick={() => scrollRight(topRef)}>
            ▶
          </div>
        </div>

        <div className="clothing-section">
          <h3>● 하의</h3>
          <div className="arrow left" onClick={() => scrollLeft(bottomRef)}>
            ◀
          </div>
          <div className="clothing-box" ref={bottomRef}>
            {[...Array(10)].map((_, index) => (
              <div className="clothing-item" key={index}>
                <img src={`/images/bottom-${index + 1}.jpg`} alt={`하의 ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="arrow right" onClick={() => scrollRight(bottomRef)}>
            ▶
          </div>
        </div>

        <div className="clothing-section">
          <h3>● 아우터</h3>
          <div className="arrow left" onClick={() => scrollLeft(outerRef)}>
            ◀
          </div>
          <div className="clothing-box" ref={outerRef}>
            {[...Array(10)].map((_, index) => (
              <div className="clothing-item" key={index}>
                <img src={`/images/outer-${index + 1}.jpg`} alt={`아우터 ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="arrow right" onClick={() => scrollRight(outerRef)}>
            ▶
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Mycloth;
