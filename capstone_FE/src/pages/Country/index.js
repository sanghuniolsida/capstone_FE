// src/pages/country/index.js

import React from 'react';
import Sidebar from '../../components2/Sidebar';
import './Country.css';

const Country = () => {
  return (
    <Sidebar>
      <div className="country-content">
        {/* 여기에 country 페이지의 주요 컨텐츠를 추가하세요 */}
        <h2>Country Page Content</h2>
      </div>
    </Sidebar>
  );
};

export default Country;
