import React, { useContext } from 'react';
import { AppContext } from '../app/app';
import './interval-item.css';

const IntervalItem = ({data}) => {
  const {start, end, formatedInterval, key} = {...data};
  const deleteItem = useContext(AppContext).deleteItem;
  
  return (
    <li className='interval-item'>
      <span className='input-value'>
        <button 
          className='delete-btn'
          type='button'
          onClick={() => deleteItem(key)}>
            <i className="fa fa-trash-o" />
          </button>

        {`${start.formatedTime} - ${end.formatedTime}`}
      </span>

      <span>
        {`=> ${formatedInterval}`}
      </span>

    </li>
  );
};

export default IntervalItem;