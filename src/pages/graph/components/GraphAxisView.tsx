/**
 * 2D information viewing: a set of grouped nodes (categories) on the X-axis and the Y-axis and each cell shows the connection information of them
 */
import React, { useContext } from 'react';
import {
  getConnectionInfo,
  getNodeConnections,
} from '../../../helpers/backend/getHelpers';

import GraphViewContext from '../context/GraphViewContext';

export const GraphAxisView: React.FC<{
  xCategory: string;
  yCategory: string;
}> = ({ xCategory, yCategory }) => {
  const context = useContext(GraphViewContext);
  let nodesX = getNodeConnections(context, xCategory);
  let nodesY = getNodeConnections(context, yCategory);

  if (!nodesX || !nodesY) return <div></div>;
  let numCellsX = nodesX.length;
  let numCellsY = nodesX.length;

  const drawGrid = () => {
    const grid = document.getElementById('graphview')
      ? document.getElementById('graphview')
      : document.body;
    const cellWidth = (grid as any).clientWidth / numCellsX;
    const cellHeight = (grid as any).clientHeight / numCellsY;

    return (
      <>
        {nodesX.map((row, i) => {
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
                {nodesY.map((col, j) => {
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
                      {i == nodesX.length - 1 && (
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
