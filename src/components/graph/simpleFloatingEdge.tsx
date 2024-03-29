import { useCallback } from 'react';
import { useStore, getBezierPath } from 'reactflow';
import React from 'react';
import { getEdgeParams } from '../../utils/utils';

function SimpleFloatingEdge({ id, source, target, markerEnd, style }: any){
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

  if (!sourceNode || !targetNode) {
    return null;
  }

  try {
    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

    const [edgePath] = getBezierPath({
      sourceX: sx,
      sourceY: sy,
      sourcePosition: sourcePos,
      targetPosition: targetPos,
      targetX: tx,
      targetY: ty
    });

    return (
      <path
        id={id}
        className='react-flow__edge-path'
        d={edgePath}
        strokeWidth={5}
        markerEnd={markerEnd}
        style={style}
      />
    );
  } catch (error) {
    console.log(error);
  }
}

export default SimpleFloatingEdge;