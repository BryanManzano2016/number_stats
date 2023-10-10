export const stringToDouble = (value: string, decimals: number = 2): number => {
  return parseFloat(parseFloat(value).toFixed(decimals));
};

export const roundDouble = (value: number, decimals: number = 2): number => {
  return parseFloat(value.toFixed(decimals));
};
