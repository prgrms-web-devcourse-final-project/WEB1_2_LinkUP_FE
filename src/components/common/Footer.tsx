import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => (
  <FooterWrapper>
    <FooterText>© 2024 LinkUp. All Rights Reserved.</FooterText>
  </FooterWrapper>
);

const FooterWrapper = styled.footer`
  width: 100%;

  color: white;
  background-color: black;
  text-align: center;
  padding: 1rem 0;
  margin-top: auto;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1rem;
`;

export default Footer;
