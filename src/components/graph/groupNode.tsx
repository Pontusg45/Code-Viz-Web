import { memo } from 'react';
import { getRectOfNodes, NodeProps, NodeToolbar, useReactFlow, useStore, useStoreApi } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import { Typography } from '@mui/material';


const lineStyle = { borderColor: 'white' };
const padding = 25;

function GroupNode({ id, data }: NodeProps) {
  const { minWidth, minHeight, hasChildNodes } = useStore((store) => {
    const childNodes = Array.from(store.nodeInternals.values()).filter((n) => n.parentNode === id);
    const rect = getRectOfNodes(childNodes);

    return {
      minWidth: rect.width + padding * 2,
      minHeight: rect.height + padding * 2,
      hasChildNodes: childNodes.length > 0,
    };
  }, isEqual);

  return (
    <div style={{ minWidth, minHeight }}>
      <Typography variant="h6" style={{ padding: 10, backgroundColor: "black", borderRadius:12, zIndex:1 }}>
        {data.label.split('/')[data.label.split('/').length -1]}
      </Typography>
    </div>
  );
}

type IsEqualCompareObj = {
  minWidth: number;
  minHeight: number;
  hasChildNodes: boolean;
};

function isEqual(prev: IsEqualCompareObj, next: IsEqualCompareObj): boolean {
  return (
    prev.minWidth === next.minWidth && prev.minHeight === next.minHeight && prev.hasChildNodes === next.hasChildNodes
  );
}

export default memo(GroupNode);
