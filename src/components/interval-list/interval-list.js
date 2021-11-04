import React, { useState, useContext } from 'react';
import './interval-list.css';

import { AppContext } from '../app/app';
import IntervalItem from '../interval-item';


const IntervalList = () => {

  // получить объекты из контекста
  const timeIntervals = useContext(AppContext).timeObjects;

  // сделать из объектов li-элементы
  timeIntervals.map( (data) => <IntervalItem data={data}/> );

  return (
    <ul className='interval-list'>
      {timeIntervals}
    </ul>
  );
};

export default IntervalList;