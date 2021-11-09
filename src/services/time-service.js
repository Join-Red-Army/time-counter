export default class TimeService {

  getCompleteDataObject = ({startInput, endInput}) => {

    const dataObject = {
      start: this.getDetailedData(startInput),
      end: this.getDetailedData(endInput)
    };

    const intervalObject = this._getInterval(
      dataObject.start.timeInMinutes,
      dataObject.end.timeInMinutes
    );

    return { ...dataObject, ...intervalObject };
  }

  // получить детальную информацию из формата hh:mm
  /* Объект на выходе:
    numHours
    numMinutes
    strHours
    strMinutes
    formatedTime
    timeInMinutes
  */
  getDetailedData = (str) => {
    const values = {};
    const separatedArray = str.split(this._getSeparator(str));


    const separatedNumbers = separatedArray.map((el) => Number(el));
    const separatedStrings = separatedArray.map((el) => this._addZeros(el));

    [values.numHours = 0, values.numMinutes = 0] = separatedNumbers;
    [values.strHours = '00', values.strMinutes = '00'] = separatedStrings;
    
    values.formatedTime = values.strHours + ':' + values.strMinutes;
    values.timeInMinutes = this._getTimeInMinutes(values.numHours, values.numMinutes);

    return values;
  }

  // getFormatedTimeFromInput = (value) => {
  //   const separatedArray = value.split(this._getSeparator(value));
  //   const separatedNumbers = separatedArray.map((el) => Number(el));
  //   const separatedStrings = separatedArray.map((el) => this._addZeros(el));
  // }

  getFormatedTimeFromIntervals = (intervals) => {
    const allMinutes = intervals.reduce(
      (acc, {minutesInterval}) => acc += minutesInterval, 0);
    
    const hours = this._addZeros(Math.floor(allMinutes / 60));
    const minutes = this._addZeros(allMinutes % 60);

    return `${hours}:${minutes}`;
  }

  // пересчитать часы и минуты в только минуты
  _getTimeInMinutes = (hours = 0, minutes = 0) => (hours * 60) + minutes;

  // добавить недостающие нули строкам, если надо
  // чтобы было 01, 02...
  _addZeros = (value) => {
    value = String(value);

    if (value.length < 2) {
      return '0' + value;
    }
    else if (value > 2) {
      return value.slice(0, 3);
    }
    return value;
  };

  // найти символ, которым пользователь разделил часы и минуты
  // на вход подаётся строка с возмодным разделителем
  _getSeparator = (str) => {
    for (let char of str) {
      const convertedChar = Number(char);
      if (Number.isNaN(convertedChar) || char === ' ') {
        return char;
      };
    }
    return -1;
  }

  // получить разницу между началом и концом события
  // на вход подаются значения в минутах
  _getInterval = (start, end) => {
    const minutesInterval = start < end ? (end - start) : (24 * 60 - start) + end;
    
    const hours = Math.floor(minutesInterval / 60);
    const minutes = minutesInterval % 60;

    const formatedInterval = [hours, minutes]
      .map(value => this._addZeros(value))
      .join(':');

    return { minutesInterval, formatedInterval };
  }

};