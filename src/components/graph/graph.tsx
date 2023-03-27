import { useCallback, useState } from 'react';
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import generatGraphData from './generatGraphData.js';
import FloatingEdge from './floatingEdge.js';
import FloatingConnectionLine from './floatingConnecctionLine.js';
import resizableNode from './resizableNode';
import './floating.css';
import { Box, Button } from '@mui/material';
import { CallTree } from '../../interfaces/interface';

const edgeTypes = {
  floating: FloatingEdge
};

const nodeTypes = {
  resizableNode
};

const flowKey = 'example-flow';

interface GraphProps {
  onClick: any;
  data: CallTree;
}

export default function Graph(props: GraphProps) {
  const { onClick, data } = props;
  const graphData = generatGraphData(data);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const reactFlowInstance = useReactFlow();


  const onNodeClick = (node: Node) => {
    onClick(node);
  };

  const [nodes, setNodes] = useState<Node[]>(graphData.nodes);
  const [edges, setEdges] = useState<Edge[]>(graphData.edges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      console.log(changes[0]);
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) =>
      applyEdgeChanges(changes, eds))
      console.log(changes[0]);
    },

    [setEdges]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      // @ts-ignore
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey) ?? "");

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      elementsSelectable={true}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      minZoom={0.01}
      connectionLineComponent={FloatingConnectionLine}
      onNodeClick={(event, node) => onNodeClick(node)}
      attributionPosition='bottom-left'

    >
      <Box className="save__controls" sx={{
        position: 'absolute',
        right: "10px",
        top: "10px",
        zIndex: 4,
        fontSize:"12px"
      }}>
        <Button key="save" onClick={onSave}>
          Save
        </Button>
        <Button key="restore" onClick={onRestore}>
          Restore
        </Button>
      </Box>
      <Controls />
      <Background />
      <MiniMap zoomable pannable />
    </ReactFlow>
  );
}
