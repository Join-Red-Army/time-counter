import React from 'react';
import './interval-item.css';

const IntervalItem = ({ text }) => {
  return (
    <li className='interval-item'>{text}</li>
  );
};

export default IntervalItem;