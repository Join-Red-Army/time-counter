export default class TimeService {

  getCompleteDataObject = ({startInput, endInput}) => {

    const dataObject = {
      start = this.getDetailedData(startInput),
      end = this.getDetailedData(endInput)
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
    
    values.formatedTime = values.strHours + values.strMinutes;
    values.timeInMinutes = _getTimeInMinutes(values.numHours, values.numMinutes);

    console.log('getDetailedData', values);
    return values;
  }

  // пересчитать часы и минуты в минуты
  _getTimeInMinutes = (hours = 0, minutes = 0) => (hours * 60) + minutes;

  // добавить недостающие нули строкам, если надо
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
  _getSeparator = (str) => {
    for (let char of str) {
      const char = Number(char);

      if (Number.isNaN(char)) {
        return char;
      };
    }
    return -1;
  }

  // получить разницу между началом и концом события
  _getInterval = (start, end) => {
    const interval = start < end ? (end - start) : (24 - start) + end;
    const readableInterval = Math.floor(interval / 24) + ':' + interval % 60;
    return { interval, readableInterval };
  }

};