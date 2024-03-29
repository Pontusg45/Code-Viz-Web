import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  FormControlLabel,
  FormGroup,
  Modal,
  Switch,
  Typography
} from '@mui/material';
import CustomizedTreeView from '../filter/treeView/treeView';
import FunctionInfoBox from '../functionInfo/functionInfo';
import { ReactFlowProvider, useReactFlow, useStoreApi } from 'reactflow';
import { FunctionInterface, CallTree } from '../../interfaces/interface';
import Graph from '../graph/graph';
import { functionInfoWrapperStyle, totalWrapperStyle, treeWrapperStyle } from '../../styles/graphPageStyles';
import PropTypes from 'prop-types';

interface Props {
  data: CallTree;
  setAnchorEl: any;
  anchorEl: any;
  handleClose: any;
}

const style = {};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}


export default function GraphPage(props: Props) {
  const { data, anchorEl, handleClose } = props;
  const [functionInfo, setFunctionInfo] = useState<FunctionInterface>({
    name: '',
    returnType: '',
    inComing: 0,
    outGoing: 0,
    parents: [],
    children: []
  });
  const [displayFunctionInfo, setDisplayFunctionInfo] = useState(true);
  const [filteredData, setFilteredData] = useState<string[] | null>(null);
  const [showUnconnected, setShowUnconnected] = useState(false);
  const store = useStoreApi();

  useEffect(() => {
    console.log('filteredData: ', filteredData);
  }, [filteredData]);

  const { zoomIn, zoomOut, setCenter } = useReactFlow();

  const focusNode = () => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);

    if (nodes.length > 0) {
      const node = nodes[0];
      if (!node.width || !node.height) return;

      const x = node.position.x + node.width / 2;
      const y = node.position.y + node.height / 2;
      const zoom = 1.85;

      setCenter(x, y, { zoom, duration: 1000 });
    }
  };

  const onClick = (node: any) => {
    let functionName = '';
    if (node.data !== undefined) {
      functionName = node.id;
    } else {
      functionName = node.target.textContent;
    }
    console.log('functionName', functionName);
    focusNode();

    const isSame = functionInfo.name === functionName;

    const functions = data.functions as { [key: string]: FunctionInterface };

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

  function onCheck(e: any) {

    console.log('check');
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box className='totalWrapperStyle' style={totalWrapperStyle}>
      <Box className='leftSide'>
        <Drawer
          id={id}
          open={open}
          anchor={'left'}
          onClose={handleClose}
        >
          <Filter
            anchorEl={anchorEl}
            handleClose={handleClose}
            showUnconnected={showUnconnected}
            setShowUnconnected={setShowUnconnected}
            data={data}
            onClick={onClick}
            onCheck={onCheck}
            setFilteredData={setFilteredData}
          />
        </Drawer>
        <FunctionInfoBox
          functionInfo={functionInfo}
          style={functionInfoWrapperStyle}
          display={displayFunctionInfo}
        />
      </Box>
      {filteredData ?
        <Box className='rightSide'>
          <Box id='diagramContainer' style={{ height: '90vh', width: '100vw' }}>
            <ReactFlowProvider>
              <Graph
                onClick={onClick}
                data={data}
                filteredData={filteredData}
                showUnConnectedNodes={showUnconnected}
              />
            </ReactFlowProvider>
          </Box>
        </Box> :
        <Modal
          open={true}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              pt: 2,
              px: 4,
              pb: 3
            }}
          >
            <Filter
              anchorEl={anchorEl}
              handleClose={handleClose}
              showUnconnected={showUnconnected}
              setShowUnconnected={setShowUnconnected}
              data={data}
              onClick={onClick}
              onCheck={onCheck}
              setFilteredData={setFilteredData}
            />
            <Button
              onClick={() =>{
                setFilteredData([]);
                handleClose();
              }}
              sx={{
                mt: 1,
                display: 'flex',
                m: 'auto'
              }}
            >
              Generate Graph
            </Button>
          </Box>
        </Modal>
      }
    </Box>
  );
}

function Filter(
  {
    handleClose,
    showUnconnected,
    setShowUnconnected,
    data,
    onClick,
    onCheck,
    setFilteredData
  }: any) {
  return (
    <Box sx={style}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography
          id='modal-modal-title'
          variant='h4'
          component='h2'
          style={{
            margin: 'auto',
            padding: '10px'
          }}
        >
          Filter
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={showUnconnected} />
            }
            onChange={() => setShowUnconnected(!showUnconnected)}
            label='Hide unused methods'
          />
        </FormGroup>
      </Box>
      <Box sx={{
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
      </Box>
      <CustomizedTreeView
        style={treeWrapperStyle}
        data={data.tree}
        onClick={onClick}
        onCheck={onCheck}
        handleClose={handleClose}
        setSelectedNodes={setFilteredData}
      />
    </Box>
  );
}
