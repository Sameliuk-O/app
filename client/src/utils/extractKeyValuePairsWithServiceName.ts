export interface ICounter {
  day: number;
  month: number;
  year: number;
  [key: string]: number | string;
}

export const extractKeyValuePairsWithServiceName = (
  counters: ICounter[],
  serviceName: string,
): ICounter[] => {
  const result: ICounter[] = [];
  counters.forEach((counter) => {
    Object.keys(counter).forEach((key) => {
      const lowerCaseKey = key.toLowerCase();
      const lowerCaseServiceName = serviceName.toLowerCase();
      if (lowerCaseKey.endsWith(lowerCaseServiceName)) {
        const newObject: ICounter = {
          [key]: counter[key] !== null ? counter[key] : 0,
          day: counter.day,
          month: counter.month,
          year: counter.year,
        };
        result.push(newObject);
      }
    });
  });
  return result;
};
