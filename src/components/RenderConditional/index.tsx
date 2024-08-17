"use cliente"
import React, { ReactNode } from 'react';
interface IRenderCondtionalProps {
  children: ReactNode
  isTrue: boolean
}

const RenderConditional: React.FC<IRenderCondtionalProps> = ({ children,isTrue}) => {
  return isTrue ? children : null;
};

export default RenderConditional;
