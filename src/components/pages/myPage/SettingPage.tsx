import React from 'react';
import { styled } from 'styled-components';
import GS from './GS';
import Sidemenu from './SideMenu';

const SettingPage = () => {
  return (
    <GS.Wrapper>
      <Sidemenu />
      <GS.Content>
        <ProfileWrapper>
          <img src="/images/origin.png" width={80} height={80} />
        </ProfileWrapper>
      </GS.Content>
    </GS.Wrapper>
  );
};

const ProfileWrapper = styled.div``;

export default SettingPage;
