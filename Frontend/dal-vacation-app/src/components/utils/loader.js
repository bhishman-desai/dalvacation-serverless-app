import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadAnimation = keyframes`
  20% { background-position: 0% 0%, 50% 50%, 100% 50% }
  40% { background-position: 0% 100%, 50% 0%, 100% 50% }
  60% { background-position: 0% 50%, 50% 100%, 100% 0% }
  80% { background-position: 0% 50%, 50% 50%, 100% 100% }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = styled.div`
  width: 60px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #000 90%, #0000);
  background: 
    var(--_g) 0% 50%,
    var(--_g) 50% 50%,
    var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: ${loadAnimation} 1s infinite linear;
`;

const LoaderComponent = () => (
  <LoaderWrapper>
    <Loader />
  </LoaderWrapper>
);

export default LoaderComponent;
