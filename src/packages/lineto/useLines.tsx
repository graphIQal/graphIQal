import React, { useEffect, useState } from 'react';
import LineTo from '.';

type Coord = {
  x: number;
  y: number;
};
type Line = {
  start: Coord;
  end: Coord;
};
type LineRefs = {
  start: string;
  end: string;
};
export const useLines = (l: LineRefs[]) => {
  const [lines, setLines] = useState<LineRefs[]>(l);
  let linesToRender;
  const updateLines = (newLines: LineRefs[]) => {
    setLines(newLines);
    console.log('in here');
    console.log('new Lines ' + JSON.stringify(newLines));
  };

  useEffect(() => {
    console.log('in here' + JSON.stringify(lines));
  }, [lines]);

  return {
    lines: lines,
    updateLines: updateLines,
  };
  //for the set of lines, update function should return react component with all the lines to render
};
