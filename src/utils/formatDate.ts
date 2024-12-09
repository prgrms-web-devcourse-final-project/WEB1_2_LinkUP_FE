export const formatDateWithOffset = (date: string, offsetHours: number = 9) => {
  const originalDate = new Date(date);
  const adjustedDate = new Date(
    originalDate.getTime() + offsetHours * 60 * 60 * 1000
  );
  return adjustedDate.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
