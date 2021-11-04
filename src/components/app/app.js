import React, { useState, useEffect, createContext } from 'react';
import './app.css';

import IntervalList from '../interval-list';
import FormTransmitter from '../form-transmitter/form-transmitter';
import TimeService from '../../services/time-service';

export const AppContext = createContext();


const App = () => {
  // state
  const [userInputs, setUserInputs] = useState([
    {start: '12:00', end: '13:00'},
    {start: '14:00', end: '17:00'}
  ]);

  const timeService = new TimeService();

  const timeObjects = userInputs.map((item) => timeService.getCompleteDataObject(item));
    /* Объект на выходе:
    numHours, numMinutes
    strHours, strMinutes
    formatedTime, timeInMinutes */


  // добавить новые данные от пользователя
  const addUserInput = (userInputData) => {
    setUserInputs((oldInputs) => {
      console.log('addUserInput');
      return [...oldInputs, userInputData];
    });
  };

  // удалить интервал
  // 

  // отрисовывает страницу
  const update = () => {
    return (
      <AppContext.Provider value={ {timeObjects,  setUserInputs} }>
        <IntervalList />
        <FormTransmitter />
      </AppContext.Provider>
    );
  };

  // рендер страницы, когда изменяется состав userInputs
  useEffect( () => {
    update();
    console.log('useEffect');
  }, [userInputs] );

  // первый запуск - вручную
  return update();
};


export default App;