export const resolveWithDelay = <T>(value: T, time: number = 1000) => new Promise(
  (resolve) => setTimeout(() => resolve(value), time)
);

export const rangeQueryString = (count: number, pageNumber?: number) =>
  `limit=${count}&offset=${pageNumber ? pageNumber * count : 0}`;

export const removeKeys = <T>(payload: T, keys: Array<keyof T>) => {
  keys.forEach((key) => {
    delete payload[key];
  });

  return payload;
};
