import React, { useState, useContext } from 'react';
import { AppContext } from '../app/app';
import TimeService from '../../services/time-service';

  // проверять ввод на корректность

const FormTransmitter = () => {
  
  const addTimeObject = useContext(AppContext).addTimeObject;
  const [userInputData, setUserInputData] = useState({ start: '', end: '' });


  // когда пользователь вбивает данные в инпуты,
  // данные записываются в state
  const onInputChange = (ev) => {
    const {name, value} = ev.target;
    setUserInputData((oldState) => {
      return {...oldState, [name]: value};
    });
  };


  // при событии submit, данные из state передаются в app.js
  // форма и state компонента очищаются
  const onFormSubmit = (ev) => {
    ev.preventDefault();

    if (userInputData.start === '' || userInputData.end === '') {
      return;
    }

    addTimeObject(userInputData);
    setUserInputData({ start: '', end: '' });
    ev.target.reset();
    console.log('submit', userInputData);
  };


  return (
    <form
      onSubmit={onFormSubmit}>
    
      <input 
        type="text"
        maxLength={5}
        placeholder="12:00"
        name = {'start'}
        onChange={onInputChange}
      />
      <span> - </span> 
      <input 
        type="text"
        maxLength={5}
        placeholder="14:00"
        name={'end'}
        onChange={onInputChange}
      />
      
      <button>посчитать интервал</button>
    
    </form>
  );
};

export default FormTransmitter;