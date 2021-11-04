import React, { useState, useEffect, createContext } from 'react';
import './app.css';

import IntervalList from '../interval-list';
import FormTransmitter from '../form-transmitter/form-transmitter';
import TimeService from '../../services/time-service';

export const AppContext = createContext();

const App = () => {
  // state
  const [userInputs, setUserInputs] = useState([
    {startInput: '12:00', endInput: '13:00'},
    {startInput: '14:00', endInput: '17:00'}
  ]);


  const timeService = new TimeService();
  let maxKey = 0;

  const timeObjects = userInputs.map((item) => {
    const key = ++maxKey;
    return {...timeService.getCompleteDataObject(item), key };
  });
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