import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  ConnectionMode,
  Controls,
  Edge,
  EdgeChange,
  MarkerType,
  MiniMap,
  Node,
  NodeChange,
  ReactFlowProvider, useEdgesState, useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {generateEdges, generateNodes} from './generatGraphData.js';
import resizableNode from './resizableNode';
import './floating.css';
import { Box } from '@mui/material';
import { CallTree } from '../../interfaces/interface';
import GroupNode from './groupNode';
import SimpleFloatingEdge from './simpleFloatingEdge';
import CustomNode from './CustomNode.jsx';

const edgeTypes = {
  floating: SimpleFloatingEdge,
};

const nodeTypes = {
  resizableNode: resizableNode,
  groupNode: GroupNode,
  custom: CustomNode
};

interface GraphProps {
  onClick: any;
  data: CallTree;
  filteredData: string[];
  showUnConnectedNodes: boolean;
}

const functionColor = 'rgba(50, 50, 50, 1)';
const textColor = "white";

const boxStyle = {
  borderRadius: 12,
  color: textColor,
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
}


export default function Graph(props: GraphProps) {
  const { onClick, data, filteredData, showUnConnectedNodes } = props;

  const [nodes, setNodes] = useNodesState<Node[]>(generateNodes(data, filteredData, showUnConnectedNodes));
  const [edges, setEdges] = useEdgesState<Edge[]>(generateEdges(data));

  useEffect(() => {
    setNodes(generateNodes(data, filteredData, showUnConnectedNodes));
    setEdges(generateEdges(data));
  }, [data, filteredData, showUnConnectedNodes]);


  const onNodeClick = (clickedNode: Node) => {
    if(clickedNode.id.includes('/')){
      return;
    }
    onClick(clickedNode);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === clickedNode.id) {
          // when you update a simple type you can just update the value
          node.style = {
            border: '3px solid green',
            backgroundColor: 'rgba(50, 50, 50, 1)',
            ...boxStyle
          };
        }
        else if (!node.id.includes('/')) {
          node.style = {
            border: "none",
            backgroundColor: 'rgba(50, 50, 50, 1)',
            ...boxStyle
          };
        }
        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        const edgeId = edge.id.split('-');
        if (edgeId[0] === clickedNode.id) {
          // when you update a simple type you can just update the value
          edge.style = {
            stroke: 'green',
            strokeWidth: 3
          };
          edge.animated = true;
          edge.markerEnd ={
            type: MarkerType.ArrowClosed,
              color: 'green',
          }
        }
        else if (edgeId[1] === clickedNode.id) {
          // when you update a simple type you can just update the value
          edge.style = {
            stroke: 'red',
            strokeWidth: 3
          };
          edge.animated = true;
          edge.markerEnd ={
            type: MarkerType.ArrowClosed,
            color: 'red',
          }
        }
        else {
          edge.style = {
            stroke: '#b1b1b7',
            strokeWidth: 3
          };
          edge.animated = false;
          edge.markerEnd ={
            type: MarkerType.ArrowClosed,
            color: '#b1b1b7',
          }
        }

        return edge;
      })
    );
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) =>
        applyEdgeChanges(changes, eds));
    },

    [setEdges]
  );

  const onConnect = useCallback(
    (params:any) =>
      setEdges((eds) =>
        addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
      ),
    []
  );

  // @ts-ignore
  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        elementsSelectable={true}
        fitView
        nodeTypes={nodeTypes}
        // @ts-ignore
        edgeTypes={edgeTypes}
        minZoom={0.1}
        onNodeClick={(event, node) => onNodeClick(node)}
        proOptions={{
          hideAttribution: true,
        }}
        connectionMode={ConnectionMode.Loose}
      >
        <Box className='save__controls' sx={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          zIndex: 4,
          fontSize: '12px'
        }}>
        </Box>
        <Controls />
        <Background />
        <MiniMap zoomable pannable />
      </ReactFlow>
    </ReactFlowProvider>
  );
}
