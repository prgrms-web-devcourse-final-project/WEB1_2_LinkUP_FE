// 반응형 웹 속성 모듈화
// 아래처럼 사용
// @media ${({ media }) => media.device.tablet}
const deviceSizes = {
  mobile: '375px',
  tablet: '768px',
  laptop: '1024px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

const media = {
  device,
};

export default media;
