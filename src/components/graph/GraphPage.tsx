import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CustomizedTreeView from '../treeView/treeView';
import files from './mockData.json';
import FunctionInfoBox from '../functionInfo/functionInfo';
import Flow from '../graph/graph';
import { ReactFlowProvider, useReactFlow, useStoreApi } from 'reactflow';
import { FunctionInterface, CallTree } from '../../interfaces/interface';
import Graph from '../graph/graph';
import { functionInfoWrapperStyle, totalWrapperStyle, treeWrapperStyle } from '../../styles/graphPageStyles';

interface FunctionInfo {
  name: string;
  returnType: string;
  parameters?: {
    name: string;
    type: string;
  }[];
  inComing?: number;
  outGoing?: number;
  recursive?: boolean;
}

interface Props {
  data: CallTree;
}

export default function GraphPage(props: Props) {
  const { data } = props;
  const [functionInfo, setFunctionInfo] = useState<FunctionInterface>({
    name: '',
    returnType: '',
    inComing: 0,
    outGoing: 0,
    parents: [],
    children: []
  });
  const [displayFunctionInfo, setDisplayFunctionInfo] = useState(false);
  const store = useStoreApi();
  const { zoomIn, zoomOut, setCenter } = useReactFlow();

  const focusNode = () => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);

    console.log("Noded:" + nodes);
    if (nodes.length > 0) {
      const node = nodes[0];
      if(!node.width || !node.height) return;

      const x = node.position.x + node.width / 2;
      const y = node.position.y + node.height / 2;
      const zoom = 1.85;

      setCenter(x, y, { zoom, duration: 1000 });
    }
  };

  const onClick = (node: any) => {
    let functionName = '';
    if (node.data !== undefined) {
      functionName = node.data.name;
    } else {
      functionName = node.target.textContent;
    }
    focusNode();

    const isSame = functionInfo.name === functionName;

    const functions = files.functions as { [key: string]: FunctionInterface };

    const newFunctionInfo = functions[functionName];
    if (newFunctionInfo) {
      setFunctionInfo(newFunctionInfo);
      if (!isSame) {
        setDisplayFunctionInfo(true);
      } else {
        setDisplayFunctionInfo(!displayFunctionInfo);
      }
    }
  };

  function onCheck() {
    console.log('check');
  }

  return (
    <Box className='totalWrapperStyle' style={totalWrapperStyle}>
      <Box className='leftSide'>
        <CustomizedTreeView
          style={treeWrapperStyle}
          data={data.tree}
          onClick={onClick}
          onCheck={onCheck}
        />
        <FunctionInfoBox
          functionInfo={functionInfo}
          style={functionInfoWrapperStyle}
          display={displayFunctionInfo}
        />
      </Box>
      <Box className='rightSide'>
        <Box id='diagramContainer' style={{ height: '85vh', width: '70vw' }}>
          <ReactFlowProvider>
            <Graph
              onClick={onClick}
              data={data}
            />
          </ReactFlowProvider>
        </Box>
      </Box>
    </Box>
  );
}
