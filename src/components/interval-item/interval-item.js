import React, { useContext } from 'react';
import { AppContext } from '../app/app';
import './interval-item.css';

const IntervalItem = ({data}) => {
  const {start, end, formatedInterval, key} = {...data};
  const deleteItem = useContext(AppContext).deleteItem;
  
  return (
    <li className='interval-item'>
      <button 
        type='button'
        onClick={() => deleteItem(key)}
        >delete</button>
      {`${start.formatedTime} - ${end.formatedTime} => ${formatedInterval}`}
    </li>
  );
};

export default IntervalItem;