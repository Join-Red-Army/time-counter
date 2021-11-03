import React from 'react';
import TimeService from '../../services/time-service';
import './interval-item.css';


const IntervalItem = ({data}) => {

  const { start, end } = data;
  const timeService = new TimeService();
  
  const dif = timeService.getReadableDifference(start, end);
  // console.log('intervaItem', start, end, dif);

  return (
    <li className='interval-item'>
      {`${start} - ${end} => ${dif}`}
    </li>
  );
};

export default IntervalItem;