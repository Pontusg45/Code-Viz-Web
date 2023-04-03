import './App.module.scss';
import Header from './components/header/header';
import React, { useEffect, useState } from 'react';
import { Box, createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { ReactFlowProvider } from 'reactflow';
import UploadButton from './components/uploadButton';
import GraphPage from './components/graph/GraphPage';
//import fakeData from './components/graph/mockData.json';
import { FileUploader } from 'react-drag-drop-files';


const fileTypes = ['ZIP'];

const ColorModeContext = React.createContext({
  toggleColorMode: () => {
  }
});

enum PaletteMode {
  light = 'light',
  dark = 'dark'
}

function App() {
  //const [data, setData] = useState(fakeData);
  const [data, setData] = useState(null);
  const graphWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const [mode, setMode] = React.useState(PaletteMode.dark);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === PaletteMode.light ? PaletteMode.dark :  PaletteMode.light));
      }
    }),
    []
  );

  let theme = React.useMemo(
    () => createTheme({

      palette: {
        mode,
        ...(mode === 'light' ? {
            primary: {
              main: '#37506a'
            },
            secondary: {
              main: '#DC823D',
              contrastText: 'rgba(255,255,255,0.89)'
            },
            success: {
              main: '#92A494'
            },
            info: {
              main: '#7E9294'
            },
            text: {
              primary: '#2e4f66'
            },
            typography: {
              fontFamily: 'Montserrat',
              fontWeightLight: 400,
              color: '#000000',
              h5: {
                fontWeight: 600
              }
            }
          } :
          {
            primary: {
              main: '#DC823D'
            },
            secondary: {
              main: '#37506a',
              contrastText: 'rgba(255,255,255,0.89)'
            },
            success: {
              main: '#92A494'
            },
            info: {
              main: '#DC823D'
            },
            text: {
              primary: '#eee',
              secondary: '#DC823D'
            },
            icon: {
              primary: '#DC823D'
            },
            typography: {
              fontFamily: 'Montserrat',
              fontWeightLight: 400,
              color: '#eee',
              h5: {
                fontWeight: 600
              }
            }
          })
      }
    }),
    [mode]
  );

  theme = responsiveFontSizes(theme);

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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openFilter = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function parseFile(file: any) {
    const formData = new FormData();
    if (!file) return;
    formData.append('file', file);
    const response = await fetch('https://api.vinobot.xyz/parse', {
    //const response = await fetch('http://localhost:8080/parse', {
      method: 'POST',
      body: formData
    });
    return await response.json();
  }

  const handleChange = (file: any) => {
    parseFile(file)
      .then(result =>
        setData(result)
      )
      .catch(err =>
        console.log(err)
      );
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <Header onFileChange={onFileChange} openFilter={openFilter} />
          <ReactFlowProvider>
            <Box style={graphWrapperStyle}>
              {
                data ?
                  <GraphPage
                    data={data}
                    setAnchorEl={setAnchorEl}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                  /> :
                  <FileUploader
                    handleChange={handleChange}
                    name='file'
                    types={fileTypes}
                    style={{
                      backgroundColor: '#000'
                    }}
                  />
              }
            </Box>
          </ReactFlowProvider>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
