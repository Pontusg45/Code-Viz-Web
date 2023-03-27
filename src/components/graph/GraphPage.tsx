import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Tab, Tabs, Typography } from '@mui/material';
import CustomizedTreeView from '../filter/treeView/treeView';
import files from './mockData.json';
import FunctionInfoBox from '../functionInfo/functionInfo';
import { ReactFlowProvider, useReactFlow, useStoreApi } from 'reactflow';
import { FunctionInterface, CallTree } from '../../interfaces/interface';
import Graph from '../graph/graph';
import { functionInfoWrapperStyle, totalWrapperStyle, treeWrapperStyle } from '../../styles/graphPageStyles';
import PropTypes from 'prop-types';

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

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24
};

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
  const [filteredData, setFilteredData] = useState(null);
  const store = useStoreApi();

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { zoomIn, zoomOut, setCenter } = useReactFlow();

  const focusNode = () => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);

    console.log('Noded:' + nodes);
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box className='totalWrapperStyle' style={totalWrapperStyle}>
      <Box className='leftSide'>
        <Button onClick={handleOpen}>Filter</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography
              id='modal-modal-title'
              variant='h4'
              component='h2'
              style={{
                margin: 'auto',
                padding: '10px',
              }}
            >
              Filter
            </Typography>
            <Box sx={{
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
                style={{
                  display: 'flex',
                  margin: 'auto',
                }}
              >
                <Tab label='Package View' {...a11yProps(0)} />
                <Tab label='Project View' {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <CustomizedTreeView
                style={treeWrapperStyle}
                data={data.tree}
                onClick={onClick}
                onCheck={onCheck}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CustomizedTreeView
                style={treeWrapperStyle}
                data={data.tree}
                onClick={onClick}
                onCheck={onCheck}
              />
            </TabPanel>

          </Box>
        </Modal>
        <FunctionInfoBox
          functionInfo={functionInfo}
          style={functionInfoWrapperStyle}
          display={displayFunctionInfo}
        />
      </Box>
      {filteredData ?
        <Box className='rightSide'>
          <Box id='diagramContainer' style={{ height: '85vh', width: '70vw' }}>
            <ReactFlowProvider>
              <Graph
                onClick={onClick}
                data={data}
              />
            </ReactFlowProvider>
          </Box>
        </Box> :
        null
      }
    </Box>
  );
}
