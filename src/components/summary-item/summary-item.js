import React, { useContext } from 'react';
import './summary-item.css';
import { AppContext } from '../app/app';


const SummaryItem = () => {
  const sumIntervals = useContext(AppContext).sumIntervals;

  return (
    <li className='summary-item'>
      {`итого => ${sumIntervals}`}
    </li>
  );
};

export default SummaryItem;