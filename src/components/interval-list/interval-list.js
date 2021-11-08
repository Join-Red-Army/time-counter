import React, { useContext } from 'react';
import './interval-list.css';

import { AppContext } from '../app/app';
import IntervalItem from '../interval-item';
import SummaryItem from '../summary-item';


const IntervalList = () => {

  // получить объекты из контекста
  // сделать из объектов li-элементы
  let timeIntervals = useContext(AppContext).timeObjects
    .map( (data) => <IntervalItem data={data} key={data.key}/> );

  return (
    <ul className='interval-list'>
      {timeIntervals}
      <SummaryItem />
    </ul>
  );
};

export default IntervalList;