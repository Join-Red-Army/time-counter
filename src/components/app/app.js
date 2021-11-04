import React, { useState, useEffect, createContext } from 'react';
import './app.css';

import IntervalList from '../interval-list';
import FormTransmitter from '../form-transmitter/form-transmitter';
import TimeService from '../../services/time-service';

export const AppContext = createContext();


const App = () => {

  // state
  const [timeIntervals, setTimeIntervals] = useState([
    {start: '12:00', end: '13:00'},
    {start: '15:00', end: '18:00'},
  ]);


  const timeService = new TimeService();

  // добавить новый интервал
  const onItemAdded = ({start, end}) => {

    const formatedInput = {
      start: timeService.beautifyUserInput(start),
      end: timeService.beautifyUserInput(end)
    };

    setTimeIntervals((oldState) => {
      console.log('onItemAdded');
      return [...oldState, formatedInput];
    })
  };

  // удалить интервал
  // 

  // отрисовывает страницу
  const update = () => {
    return (
      <AppContext.Provider value={ {timeIntervals, onItemAdded } }>
        <IntervalList />
        <FormTransmitter />
      </AppContext.Provider>
    );
  };

  // новый рендер, когда изменяется состав timeIntervals
  useEffect( () => {
    update();
    console.log('update');
  }, [timeIntervals] );

  // первый запуск - вручную
  return update();
};


export default App;