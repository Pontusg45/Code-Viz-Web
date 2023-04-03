import { useCallback } from 'react';
import { useStore, getBezierPath } from 'reactflow';
import './floating.css'

import { getEdgeParams } from '../../utils/utils.js';

function FloatingEdge({ id, source, target, markerEnd, style }: any) {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

  if (!sourceNode || !targetNode) {
    return null;
  }

  function handleEdgeClick(event:any) {
    const element = event.target;
    element.style.stroke = "green";
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <path
      onClick={handleEdgeClick}
      id={id}
      className="react-flow__edge-path lines"
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  );
}

export default FloatingEdge;
