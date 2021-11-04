import React, { useContext } from 'react';
import TimeService from '../../services/time-service';
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
      {`${start.formatedTime} - ${end.formatedTime} => ${formatedInterval}`}
    </li>
  );
};

export default IntervalItem;