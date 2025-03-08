export const formatTime = (time: number): string => {
  const date = new Date(time);
  return `${date.getDate()} tháng ${
    date.getMonth() + 1
  }, ${date.getFullYear()}`;
};
