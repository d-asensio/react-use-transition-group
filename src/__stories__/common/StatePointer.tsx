import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import anime from 'animejs/lib/anime.es.js';

interface PointerProps {
  rotation: number;
  color: string;
  animationDuration: number;
}

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 60px;
  height: 60px;

  border-radius: 50%;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;

    width: 30px;
    height: 30px;

    background: inherit;

    transform-origin: center;
    transform: translate(-50%, -20%) rotate(45deg);
  }
`;

export function StatePointer({ rotation, color, animationDuration }: PointerProps) {
  const pointerRef = useRef(null);

  useEffect(() => {
    const animation = anime({
      targets: pointerRef.current,
      easing: 'linear',
      duration: animationDuration,
      translateX: '-50%',
      translateY: '-50%',
      rotate: rotation,
      background: color,
    });

    return () => {
      animation.seek(animationDuration);
    };
  }, [rotation, color]);

  return <Wrapper ref={pointerRef} />;
}
