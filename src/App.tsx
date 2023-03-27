import './App.module.scss';
import Header from './components/header/header';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ReactFlowProvider } from 'reactflow';
import UploadButton from './components/uploadButton';
import GraphPage from './components/graph/GraphPage';

function App() {
  const [data, setData] = useState(null);
  const graphWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  function onFileChange(event: { target: { files: any; }; }) {
    const file = event.target.files[0];
    parseFile(file)
      .then(result =>
        setData(result)
      )
      .catch(err =>
        console.log(err)
      );
  }

  async function parseFile(file: any) {
    const formData = new FormData();
    if (!file) return;
    formData.append('file', file);
    const response = await fetch('http://78.141.233.225:8080/parse', {
      method: 'POST',
      body: formData
    });
    return await response.json();
  }

  return (
    <Box>
      <Header onFileChange={onFileChange}/>
      <ReactFlowProvider>
        <Box style={graphWrapperStyle}>
          {
            data ?
              <GraphPage data={data} /> :
              null
          }
        </Box>
      </ReactFlowProvider>
    </Box>
  );
}

export default App;
