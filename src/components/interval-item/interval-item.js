import React, { useContext } from 'react';
import { AppContext } from '../app/app';
import './interval-item.css';

/* Объект на вход:
  numHours, numMinutes
  strHours, strMinutes
  formatedTime, timeInMinutes
*/

const IntervalItem = ({data}) => {
  const {start, end, formatedInterval} = {...data};
  
  return (
    <li className='interval-item'>
      <button type='button'>delete</button>
      {`${start.formatedTime} - ${end.formatedTime} => ${formatedInterval}`}
    </li>
  );
};

export default IntervalItem;