import React, { useState, useContext } from 'react';
import { AppContext } from '../app/app';

  // проверять ввод на корректность

const FormTransmitter = () => {
  
  const addTimeObject = useContext(AppContext).addUserInput;
  const [userInputData, setUserInputData] = useState({ startInput: '', endInput: '' });


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

    if (userInputData.startInput === '' && userInputData.endInput === '') {
      return;
    }

    addTimeObject(userInputData);
    setUserInputData({ startInput: '', endInput: '' });
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
        name = {'startInput'}
        onChange={onInputChange}
      />
      <span> - </span> 
      <input 
        type="text"
        maxLength={5}
        placeholder="14:00"
        name={'endInput'}
        onChange={onInputChange}
      />
      
      <button>посчитать интервал</button>
    
    </form>
  );
};

export default FormTransmitter;