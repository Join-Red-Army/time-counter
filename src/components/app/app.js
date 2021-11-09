import React, { useState, useEffect, createContext } from 'react';
import './app.css';

import IntervalList from '../interval-list';
import FormTransmitter from '../form-transmitter/form-transmitter';
import TimeService from '../../services/time-service';

export const AppContext = createContext();

let maxKey = 100;
const timeService = new TimeService();

const App = () => {

  // state
  // обновляется только этот массив с userInputs,
  // всё остальное - рассчитывается при каждом update
  const [userInputs, setUserInputs] = useState([
    {startInput: '12:00', endInput: '13:00', key: 1},
    {startInput: '14:00', endInput: '17:00', key: 2}
  ]);

  // добавить новые данные от пользователя в userInputs
  // и назначить им key
  const addUserInput = (userInputData) => {
    setUserInputs((oldInputs) => {
      userInputData.key = ++maxKey;
      console.log('key', userInputData);
      return [...oldInputs, userInputData];
    });
  };

  let sumIntervals = 0;
  

  // timeObjects - это обработанный массив userInputs,
  // в котором распаршены инпуты пользователя
  // и возвращён массив объектов с детальной информацией
  let timeObjects = userInputs.map((item) => {
    return {...timeService.getCompleteDataObject(item), key: item.key};
  });


  // удалить интервал
  const deleteItem = (key) => {

    setUserInputs((oldInputs) => {
      const deletedIndex = oldInputs.findIndex((el) => el.key === key);
      
      return [
        ...oldInputs.slice(0, deletedIndex),
        ...oldInputs.slice(deletedIndex + 1)]
    });
  };

  // отрисовывает страницу
  const update = () => {
    sumIntervals = timeService.getFormatedTimeFromIntervals(timeObjects);

    return (
      <div className='app'>
        <AppContext.Provider value={ {timeObjects, addUserInput, deleteItem, sumIntervals} }>
          <IntervalList />
          <FormTransmitter />
        </AppContext.Provider>
      </div>
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