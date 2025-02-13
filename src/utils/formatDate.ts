export const formatDateWithOffset = (date: string, offsetHours: number = 9) => {
  // 입력된 날짜를 UTC 기준으로 변환
  const originalDate = new Date(date);

  // 날짜가 유효하지 않으면 예외 처리
  if (isNaN(originalDate.getTime())) {
    throw new Error(`Invalid date format: ${date}`);
  }

  // UTC 기준으로 변환 후 오프셋 적용
  const adjustedDate = new Date(
    originalDate.getTime() + offsetHours * 60 * 60 * 1000
  );

  // 날짜 포맷
  const year = adjustedDate.getUTCFullYear();
  const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(adjustedDate.getUTCDate()).padStart(2, '0');
  const hours = String(adjustedDate.getUTCHours()).padStart(2, '0');
  const minutes = String(adjustedDate.getUTCMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
