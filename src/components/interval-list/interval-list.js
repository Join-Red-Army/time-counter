import React, { useState, useContext } from 'react';
import './interval-list.css';

import { AppContext } from '../app/app';
import IntervalItem from '../interval-item';


const IntervalList = () => {

  const items = useContext(AppContext).timeIntervals
    .map((item) => <IntervalItem text={item} />
    );

  

  return (
    <ul className='interval-list'>
      {items}
    </ul>
  );
};

export default IntervalList;