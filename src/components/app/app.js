import React, { useState, useEffect, createContext } from 'react';
import './app.css';

import IntervalList from '../interval-list';
import FormTransmitter from '../form-transmitter/form-transmitter';


export const AppContext = createContext();


const App = () => {

  // state
  const [timeIntervals, setTimeIntervals] = useState([
    {start: '12:00', end: '13:00'},
    {start: '15:00', end: '18:00'},
  ]);

  // добавить новый интервал
  const onItemAdded = (item) => {
    setTimeIntervals((oldState) => {
      console.log('onItemAdded');
      return [...oldState, item];
    })
  };

  // удалить интервал
  // 

  // отрисовывает страницу
  const update = () => {
    return (
      <AppContext.Provider value={ {timeIntervals, onItemAdded} }>
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