import { internalsSymbol, Position } from 'reactflow';

// returns the position (top,right,bottom or right) passed node compared to
function getParams(nodeA, nodeB) {

  const getNodeHandles = (node) => {
    const { positionAbsolute, width, height } = node;
    const rightHandleY = positionAbsolute.y + height / 2;
    const leftHandleX = positionAbsolute.x;
    const rightHandleX = positionAbsolute.x + width;
    return {
      leftHandle: { x: leftHandleX, y: rightHandleY },
      rightHandle: { x: rightHandleX, y: rightHandleY },
    };
  };

  const NodeA = getNodeHandles(nodeA);
  const NodeB = getNodeHandles(nodeB);

  const distances = [
    Math.hypot(NodeA.leftHandle.x - NodeB.leftHandle.x, NodeA.leftHandle.y - NodeB.leftHandle.y),
    Math.hypot(NodeA.leftHandle.x - NodeB.rightHandle.x, NodeA.leftHandle.y - NodeB.rightHandle.y),
    Math.hypot(NodeA.rightHandle.x - NodeB.leftHandle.x, NodeA.rightHandle.y - NodeB.leftHandle.y),
    Math.hypot(NodeA.rightHandle.x - NodeB.rightHandle.x, NodeA.rightHandle.y - NodeB.rightHandle.y),
  ];

  const minDistance = Math.min(...distances);

  let position;
  if (minDistance === distances[0] || minDistance === distances[1]) {
    position = Position.Left;
  } else {
    position = Position.Right;
  }

  const [x, y] = getHandleCoordsByPosition(nodeA, position);
  return [x, y, position];
}

function getHandleCoordsByPosition(node, handlePosition) {
  // all handles are from type source, that's why we use handleBounds.source here
  const handle = node[internalsSymbol].handleBounds.source.find(
    (h) => h.position === handlePosition
  );
  let offsetX = handle.width / 2;
  let offsetY = handle.height / 2;

  // this is a tiny detail to make the markerEnd of an edge visible.
  // The handle position that gets calculated has the origin top-left, so depending which side we are using, we add a little offset
  // when the handlePosition is Position.Right for example, we need to add an offset as big as the handle itself in order to get the correct position
  switch (handlePosition) {
    case Position.Left:
      offsetX = 0;
      break;
    case Position.Right:
      offsetX = handle.width;
      break;
    case Position.Top:
      offsetY = 0;
      break;
    case Position.Bottom:
      offsetY = handle.height;
      break;
  }

  const x = node.positionAbsolute.x + handle.x + offsetX;
  const y = node.positionAbsolute.y + handle.y + offsetY;

  return [x, y];
}

function getNodeCenter(node) {
  return {
    x: node.positionAbsolute.x + node.width / 2,
    y: node.positionAbsolute.y + node.height / 2,
  };
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source, target) {
  const [sx, sy, sourcePos] = getParams(source, target);
  const [tx, ty, targetPos] = getParams(target, source);

  return {
    sx,
    sy,
    tx,
    ty,
    sourcePos,
    targetPos,
  };
}
