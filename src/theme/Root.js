import React from 'react';
import AiHelper from '@site/src/components/AiHelper';

// Wraps the entire site to inject global components
export default function Root({ children }) {
  return (
    <>
      {children}
      <AiHelper />
    </>
  );
}
