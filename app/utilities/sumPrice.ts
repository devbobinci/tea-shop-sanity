export const sum = (array: number[]) => {
  let sum = 0;

  array.forEach((item: number) => {
    sum += item;
  });
  return sum;
};
