import React, { useState } from 'react';
import { getConnectionInfo } from '../../../helpers/backend/dataHelpers';
import { nodesData } from '../../../schemas/Data_structures/DS_schema';

export const GraphAxisView: React.FC<{
  xCategory: string;
  yCategory: string;
}> = ({ xCategory, yCategory }) => {
  let nodesX = (nodesData as any)[xCategory].connections;
  let nodesY = (nodesData as any)[yCategory].connections;

  let numCellsX = Object.keys(nodesX).length;
  let numCellsY = Object.keys(nodesY).length;

  const drawGrid = () => {
    const grid = document.getElementById('graphview')
      ? document.getElementById('graphview')
      : document.body;
    const cellWidth = (grid as any).clientWidth / numCellsX;
    const cellHeight = (grid as any).clientHeight / numCellsY;
    console.log(
      'document body ' + document.getElementById('graphview')?.clientHeight
    );
    return (
      <>
        {Object.keys(nodesX).map((row, i) => {
          return (
            <div
              key={i}
              style={{ height: cellHeight }}
              className='flex flex-row'
            >
              <div className='w-16'>{row}</div>
              {Object.keys(nodesY).map((col, j) => {
                return (
                  <div className='flex flex-col'>
                    <div
                      style={{
                        width: cellWidth,
                        maxWidth: cellWidth,
                        minWidth: cellWidth,
                        height: cellHeight,
                      }}
                      className=' border-2 m-2 overflow-hidden'
                      key={j}
                    >
                      {getConnectionInfo(row, col)}
                    </div>
                    {i == Object.values(nodesX).length - 1 && <div>{col}</div>}
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div id='graphview' className=' absolute w-full h-full flex flex-col'>
      {drawGrid()}
    </div>
  );
};
