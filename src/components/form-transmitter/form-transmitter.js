import React, { useState, useContext } from 'react';
import { AppContext } from '../app/app';


const FormTransmitter = () => {
  // проверять ввод на корректность
  // ограничить ввод в поле от 1 до 4 цифр
  // переменная-массив separators, в котором символы для разбивки строки
  const onItemAdded = useContext(AppContext).onItemAdded;
  const [formData, setFormData] = useState({ start: '', end: '' });


  // ввод значений в инпуты
  const onInputChange = (ev) => {
    const {name, value} = ev.target;

    setFormData((oldState) => {
      return {...oldState, [name]: value};
    });
    console.log('inputChange', formData);
  };


  // отправка формы
  const onFormSubmit = (ev) => {
    ev.preventDefault();
    onItemAdded(formData);
    setFormData({ start: '', end: '' });
    ev.target.reset();
    console.log('submit', formData);
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
        // value = {() => formData[this.name]}
      />
      <span> - </span> 
      <input 
        type="text"
        maxLength={5}
        placeholder="14:00"
        name={'end'}
        // value = {() => formData[this.name]}
        onChange={onInputChange}
      />
      
      <button>добавить интервал</button>
    
    </form>
  );
};


export default FormTransmitter;