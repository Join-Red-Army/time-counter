import React, { useState, useEffect, createContext } from 'react';
import './app.css';

import IntervalList from '../interval-list';
import FormTransmitter from '../form-transmitter/form-transmitter';
import TimeService from '../../services/time-service';

export const AppContext = createContext();


const App = () => {

  // state
  // обновляется только этот массив с userInputs,
  // всё остальное - рассчитывается при каждом update
  const [userInputs, setUserInputs] = useState([
    {startInput: '12:00', endInput: '13:00'},
    {startInput: '14:00', endInput: '17:00'}
  ]);

  // добавить новые данные от пользователя в userInputs
  // и назначить им key
  const addUserInput = (userInputData) => {
    setUserInputs((oldInputs) => {
      userInputData.key = ++maxKey 
      return [...oldInputs, userInputData];
    });
  };

  let maxKey = 100;
  let sumIntervals = 0;
  const timeService = new TimeService();  

  // timeObjects - это обработанный массив userInputs,
  // в котором распаршены инпуты пользователя
  // и возвращён массив объектов с детальной информацией
  let timeObjects = userInputs.map((item) => {
    return {...timeService.getCompleteDataObject(item), key: item['key'] };
  });


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