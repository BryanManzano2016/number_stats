import {DEFAULT_DECIMALS} from './Constants';

export const stringToDouble = (value: string, decimals: number = 2): number => {
  return parseFloat(parseFloat(value.replace(',', '.')).toFixed(decimals));
};

export const roundDouble = (
  value: number,
  decimals: number = DEFAULT_DECIMALS,
): number => {
  return parseFloat(value.toFixed(decimals));
};

export const roundDoubleString = (
  value: number,
  decimals: number = DEFAULT_DECIMALS,
): string => {
  if (value === undefined) {
    return '';
  }
  return roundDouble(value, decimals).toString().replace('.', ',');
};

export const formatDate = (date: Date, format = 'FULL'): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const fullDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  switch (format) {
    case 'FULL':
      return fullDate;
    case 'DAY':
      return `${day}/${month}/${year}`;
    case 'DAY_YEAR_SHORT':
      return `${day}/${month}/${year.toString().slice(2, 4)}`;
    case 'HOUR':
      return `${hours}:${minutes}`;
    default:
      return fullDate;
  }
};
