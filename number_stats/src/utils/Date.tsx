import moment from 'moment';
import {FORMAT_DATES} from './Constants';

export const isValidDateTime = (
  value: string,
  format: string = FORMAT_DATES.SIMPLE_DATE,
): boolean => {
  if (value === undefined || format === undefined) {
    return false;
  }
  return moment(value, format, true).isValid();
};

export const stringToDate = (
  value: string | undefined,
  format: string = FORMAT_DATES.SIMPLE_DATE,
): Date | undefined => {
  if (
    value === undefined ||
    format === undefined ||
    !isValidDateTime(value, format)
  ) {
    return undefined;
  }
  return moment(value, format).toDate();
};

export const dateToString = (
  date: Date,
  format: string = FORMAT_DATES.SIMPLE_DATE,
): string => {
  if (date === undefined || format === undefined) {
    return '';
  }
  return moment(date).format(format);
};
