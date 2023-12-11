export const calculateAverage = (numbers: number[]) => {
  if (numbers === undefined) {
    return 0;
  }
  const sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return sum / numbers.length;
};
