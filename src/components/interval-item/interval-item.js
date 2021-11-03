import React from 'react';
import './interval-item.css';

const IntervalItem = ({data}) => {

  // вытащить интервалы из data
  console.log('intervaItem', data)
  const { start, end } = data;

  // высчитать разницу во времени

  const stringToMinutes = (str) => {
    const [hours, minutes] = str.split(':').map((item) => Number(item));
    return (hours * 60) + minutes;
  };

  const dif = stringToMinutes(end) - stringToMinutes(start);
  
  
  console.log('intervaItem', start, end, dif);

  return (
    <li className='interval-item'>
      {`${start} - ${end} => ${dif}`}
    </li>
  );
};

export default IntervalItem;