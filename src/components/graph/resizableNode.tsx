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
    <div style={notClicked} onClick={handleClick}>
      <Handle type='source' position={Position.Left} id="a"/>
      <div>
        {data.label}
      </div>
      <Handle type='source' position={Position.Right} id="b"/>
    </div>
  );
};

export default memo(ResizableNodeSelected);