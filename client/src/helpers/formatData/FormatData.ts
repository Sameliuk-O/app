const FormatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const pad = (number: number) => number.toString().padStart(2, "0");

  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
};

export default FormatDate;
