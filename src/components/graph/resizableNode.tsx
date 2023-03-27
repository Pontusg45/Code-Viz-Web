import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import React from 'react';

type Props = {
  data: any;
  selected: boolean;
  highlightNodes?: Function;
}

const notClicked = { padding: 10, borderRadius: 12, borderColor:"green" }
const clicked = { padding: 10, borderRadius: 12, border: '1px solid green', }

const ResizableNodeSelected = (props: Props) => {
  const {data} = props
  const [isClicked, setClicked] = React.useState(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setClicked(true)
  };

  return (
    <div style={isClicked ? clicked : notClicked} onClick={handleClick}>
      {data.type != "function"?
      <NodeResizer color='white' isVisible={props.selected} minWidth={100} minHeight={30} />
        : null
      }
      <Handle type='target' position={Position.Left} style={{ display: 'none' }} />
      <div
        // make overflow of text epllises
        style={{
          overflow: 'hidden',
          whiteSpace: "nowrap",
          textOverflow: "ellipsis"
        }}
      >
        {props.data.label}
      </div>
      <Handle type='source' position={Position.Right} style={{ display: 'none' }} />
    </div>
  );
};

export default memo(ResizableNodeSelected);