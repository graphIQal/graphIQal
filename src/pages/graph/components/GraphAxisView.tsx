import React, { useContext, useState } from 'react';
import { getConnectionInfo } from '../../../helpers/backend/dataHelpers';
import { nodesData } from '../../../schemas/Data_structures/DS_schema';
import GraphViewContext from '../GraphViewContext';

export const GraphAxisView: React.FC<{
  xCategory: string;
  yCategory: string;
}> = ({ xCategory, yCategory }) => {
  const context = useContext(GraphViewContext);
  let nodesX = context?.allNodes[xCategory].connections;
  let nodesY = context?.allNodes[yCategory].connections;

  if (!nodesX || !nodesY) return <div></div>;
  let numCellsX = Object.keys(nodesX).length;
  let numCellsY = Object.keys(nodesY).length;

  const drawGrid = () => {
    const grid = document.getElementById('graphview')
      ? document.getElementById('graphview')
      : document.body;
    const cellWidth = (grid as any).clientWidth / numCellsX;
    const cellHeight = (grid as any).clientHeight / numCellsY;

    const propX = 100 / numCellsX;
    const propY = 100 / numCellsY;

    return (
      <>
        {Object.keys(nodesX as any).map((row, i) => {
          return (
            <div
              key={i}
              className='flex flex-row w-full '
              style={{ height: cellHeight * 0.85 }}
            >
              <div className=' w-16 flex flex-row justify-center items-center'>
                <span className='-rotate-90'>{row}</span>
              </div>
              <div className='flex flex-row w-full'>
                {Object.keys(nodesY as any).map((col, j) => {
                  return (
                    <div
                      className={'flex flex-col'}
                      style={{
                        width: cellWidth * 0.95,
                      }}
                    >
                      <div
                        style={
                          {
                            // width: cellWidth,
                            // maxWidth: cellWidth,
                            // minWidth: cellWidth,
                          }
                        }
                        className={'border-2 m-1 overflow-hidden h-full p-3'}
                        key={j}
                      >
                        <span className=''>
                          {getConnectionInfo(row, col, context)}
                        </span>
                      </div>
                      {i == Object.values(nodesX as any).length - 1 && (
                        <div className='h-16 flex flex-row justify-center items-center'>
                          {col}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
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
