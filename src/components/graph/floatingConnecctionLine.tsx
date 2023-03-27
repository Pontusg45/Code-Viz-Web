import React from 'react';
import { getBezierPath } from 'reactflow';

import { getEdgeParams } from '../../utils/nodeUtils.js';

function FloatingConnectionLine({ targetX, targetY, sourcePosition, targetPosition, sourceNode }: any) {
  if (!sourceNode) {
    return null;
  }

  const targetNode = {
    id: 'connection-target',
    width: 3,
    height: 3,
    position: { x: targetX, y: targetY },
  };

  const { sx, sy } = getEdgeParams(sourceNode, targetNode);
  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition,
    targetPosition,
    targetX,
    targetY,

  });

  return (
    <g>
      <path fill="#fff" stroke="#222" strokeWidth={5} className="animated lines" d={edgePath} />
      <circle cx={targetX} cy={targetY} fill="#ddd" r={3} stroke="#222" strokeWidth={4} />
    </g>
  );
}

export default FloatingConnectionLine;
