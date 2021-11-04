export default class TimeService {

  getReadableDifference = (start, end) => {
    const dif = this._stringToMinutes(end) - this._stringToMinutes(start);
    
    let hours = this._addZeros( Math.floor(dif / 60) );
    let minutes = this._addZeros(dif % 60);


    return (`${hours}:${minutes}`);
  }

  beautifyUserInput = (str) => {
    return this._useCorrectSeparator(str)
      .split(':')
      .map((num) => this._addZeros(num))
      .join(':')
      .slice(0, 5);
  };

  _stringToMinutes = (str) => {
    const [hours, minutes] = str.split(':').map((item) => Number(item));
    return (hours * 60) + minutes;
  }

  _useCorrectSeparator = (userInput) => {
    const str = userInput.trim();
    if (str.includes(':')) {
      return str;
    } 

    let separators = ['.', '_', '^', '-', ',', ' '];
    let separatorIndex;

    for (let item of separators) {
      const index = str.indexOf(item);
      if (index !== -1) {
        separatorIndex = index;
        break;
      }
    };

    return str.slice(0, separatorIndex) + ':' + str.slice(separatorIndex + 1);
  };

  _addZeros = (value) => {
    value = Number(value);
    return (value < 10) ? `0${value}` : value;
  }

};