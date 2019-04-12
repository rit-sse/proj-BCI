import React from 'react';
import styled, { css, keyframes } from 'styled-components'
import img from './spinner.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const animation = props =>
  css`
    ${rotate} ${props.speed}s linear infinite;
  `

  const Rotate = styled.div`
  display: inline-block;
  animation: ${props => animation(props)};
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;  

class FidgetSpinner extends React.Component{

  constructor(props){
      super(props);
  };

    render(){
      return(
        <div>
          <Rotate speed = {this.props.speed}> <img src={img}/> </Rotate>
        </div>
      )
    };
};

export default FidgetSpinner;