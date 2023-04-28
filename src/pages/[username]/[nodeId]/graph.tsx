/**
 * Main Graph component
 * Creates and sets all the global props that go into Context wrappers
 */

import React, { useEffect, useState } from 'react';
import Graph from '../../../packages/graph/components/Graph';

const Graph2: React.FC = () => {
  const [windowVar, setWindow] = useState<Window>();
  const [documentVar, setDocument] = useState<Document>();
  useEffect(() => {
    setWindow(window);
    setDocument(document);
  });
  return <Graph window={windowVar} document={documentVar} />;
};

export default Graph2;
