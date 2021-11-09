import React, { useState, useContext } from 'react';
import './form-transmitter.css';

import { AppContext } from '../app/app';
import TimeService from '../../services/time-service';

const timeService = new TimeService();

const FormTransmitter = () => {
  
  const addTimeObject = useContext(AppContext).addUserInput;
  const [userInputData, setUserInputData] = useState({ startInput: '', endInput: '' });

  // когда пользователь вбивает данные в инпуты,
  // данные записываются в state
  const onInputBlur = (ev) => {
    // ev.target.value = timeService.getDetailedData(ev.target.value.trim()).formatedTime;
    const {name, value} = ev.target;
    setUserInputData((oldState) => {
      return {...oldState, [name]: value};
    });
  };

  // при событии submit, данные из state передаются в app.js
  // форма и state компонента очищаются
  const onFormSubmit = (ev) => {
    ev.preventDefault();
    if (userInputData.startInput === '' && userInputData.endInput === '') {
      return;
    } 
    
    addTimeObject(userInputData);
    setUserInputData({ startInput: '', endInput: '' });
    ev.target.reset();
  };


  return (
    <form
      className='form-transmitter'
      onSubmit={onFormSubmit}>
    
      <span className="input-group">
        <input 
          type="text"
          maxLength={5}
          placeholder="12:00"
          name = {'startInput'}
          onBlur={onInputBlur}
        />
        <span> - </span> 
        <input 
          type="text"
          maxLength={5}
          placeholder="14:00"
          name={'endInput'}
          onBlur={onInputBlur}
        />
      </span>
      
      <button>посчитать интервал</button>
    
    </form>
  );
};

export default FormTransmitter;