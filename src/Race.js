import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import c1 from './chow.jpg';
import c2 from './kiser2.jpg';
import rd from './road.jpg';

const movement = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100vw);
  }
`;

const animation = props =>
  css`
    ${movement} ${props.speed}s linear infinite;
  `;

const Translate = styled.div`
  display: inline-block;
  animation: ${props => animation(props)};
  padding: 2rem 1rem;
  font-size: 1.2rem;
  height: auto;
  align-self: flex-end;
`;

const Kachow = styled.img`
  height: 200px;
  width: 300px;
`;

const RaceTrack = styled.div`
  display: flex;
  background-image: url(${rd});
  flex-direction: column-reverse:
  alight-items: flex-end;
  width: 100vw;
  height: 720px;
`;

function Race(props) {
  return (
    <RaceTrack>
      <Translate speed={props.speed}>
        <Kachow src={c1} />
      </Translate>
      <Translate speed={20}>
        <Kachow src={c2} />
      </Translate>
    </RaceTrack>
  );
}

export default Race;
