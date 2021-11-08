import React, { useState, useEffect, createContext } from 'react';
import './app.css';

import IntervalList from '../interval-list';
import FormTransmitter from '../form-transmitter/form-transmitter';
import TimeService from '../../services/time-service';

export const AppContext = createContext();


const App = () => {

  let sumIntervals = 0;

  // state
  const [userInputs, setUserInputs] = useState([
    {startInput: '12:00', endInput: '13:00'},
    {startInput: '14:00', endInput: '17:00'}
  ]);


  const timeService = new TimeService();
  
  let maxKey = 0;

  let timeObjects = userInputs.map((item) => {
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
    sumIntervals = timeService.getFormatedTimeFromIntervals(timeObjects);

    return (
      <AppContext.Provider value={ {timeObjects, addUserInput, sumIntervals} }>
        <IntervalList />
        <FormTransmitter />
      </AppContext.Provider>
    );
  };

  // рендер страницы, когда изменяется состав userInputs
  useEffect( () => {
    update();
  }, [userInputs] );

  // первый запуск - вручную
  return update();
};


export default App;