import React, { useState, useEffect, createContext } from 'react';
import './app.css';

import IntervalList from '../interval-list';
import FormTransmitter from '../form-transmitter/form-transmitter';


export const AppContext = createContext();


const App = () => {
  const [timeIntervals, setTimeIntervals] = useState([
    `12:00 - 14:00 => 02:00`,
    `17:00 - 20:00 => 03:00`,
  ]);

  const onItemAdded = (item) => {
    setTimeIntervals((oldState) => {
      console.log('onItemAdded');
      return [...oldState, item];
    })
  }

  // отрисовывает страницу
  const update = () => {
    return (
      <AppContext.Provider value={ {timeIntervals, onItemAdded} }
      >
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