import ReactDOM from "react-dom";
import mermaid from "mermaid";
import React, { useEffect, useState } from 'react';
// @ts-ignore
import Cookies from "js-cookie";
import { Button, Card, CardActions, CardContent, CircularProgress, Typography } from "@mui/material";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { stringify } from "querystring";
const flowchartConfig = {
  startOnLoad: true,
  theme: "dark",
  flowchart: {
    useMaxWidth: true,
    padding: 50
  }
}

const modules = [
  {
    name: 'm1',
    classes: [
      {
        name: "c1",
        methods: [
          {
            name: "f1",
            returnType: "void"
          },
          {
            name: 'f2',
            'returnType': "void"
          },
          {
            name: 'f3',
            'returnType': "void"
          }
        ],
        connections: [
          {
            "from": "f1",
            "to": "f3"
          },
          {
            "from": "f2",
            "to": "f4"
          }
        ]
      }
    ]
  },
  {
    "name": "m2",
    "classes": [
      {
        "name": "c2",
        "methods": [
          {
            "name": "f3",
            "returnType": "void"
          },
          {
            "name": "f4",
            "returnType": "void"
          },
          {
            "name": "f5",
            "returnType": "void"
          }
        ]
      }
    ]
  }
]

interface FunctionInfo {
  name: string;
  returnType: string;
}

const functions = new Map<string, FunctionInfo>();
functions.set("f1", { name: "f1", returnType: "void" });
functions.set("f2", { name: "f2", returnType: "void" });
functions.set("f3", { name: "f3", returnType: "void" });
functions.set("f4", { name: "f4", returnType: "void" });
functions.set("f5", { name: "f5", returnType: "void" });
functions.set("f6", { name: "f6", returnType: "void" });
functions.set("f7", { name: "f7", returnType: "void" });

const contections = [
  { "from": "f1", "to": "f3" },
  { "from": "f2", "to": "f4" },
  { "from": "f2", "to": "f5" },
  { "from": "f5", "to": "f1" },
  { "from": "f5", "to": "f2" },
  { "from": "f5", "to": "f3" },
  { "from": "f5", "to": "f4" },
  { "from": "f5", "to": "f5" },
  { "from": "f5", "to": "f7" },
]


function UMLDiagramGenerator() {
  const [file, setFile] = useState(null);
  const [functionInfo, setFunctionInfo] = useState({ name: "", returnType: "" });
  const [displayFunctionInfo, setDisplayFunctionInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    mermaid.initialize(flowchartConfig);
  }, []);

  useEffect(() => {
    console.log(file);
    uploadFile();
  }, [file])

  function onFileChange(event: { target: { files: any; }; }) {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  }

  async function uploadFile() {
    const formData = new FormData();
    if (!file) return;
    formData.append("file", file);
    console.log(formData);
    const response = await fetch("http://localhost:4545/getFile", {
      method: "POST",
      body: formData
    });
    const jsonData = await response.json();
    console.log(jsonData.savedFile);
    createGraph(jsonData.savedFile);
  }

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    const graphCode = generateGraphCode();
    createGraph(graphCode);
    console.log(graphCode);
    
  }

  async function createGraph(code: string) {
    if (!document) return;
    const diagramContainer = document.getElementById("diagramContainer");
    if (!diagramContainer) return;
    diagramContainer.removeAttribute("data-processed");

    diagramContainer.innerHTML = code;

    mermaid.contentLoaded();

    await new Promise(r => setTimeout(r, 50));

    const nodes = diagramContainer.getElementsByClassName("nodes").item(0)?.children;

    if (nodes) {
      for (const node of nodes) {
        const rect = node.children[0] as SVGRectElement;
        rect.onclick = (e) => {
          const functionName = node.id.split("-")[1];
          setFunctionInfo(functions.get(functionName) as FunctionInfo);
          setDisplayFunctionInfo(current => !current);
        }
      }
    }
  }

  const wrapperStyle = {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-direction": "column",
    "background-color": "#282c34",
    "padding": "20px",
    "border-radius": "10px",
    "box-shadow": "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    "border": "1px solid #e0e0e0",
    "margin-left": "20px",
  }
  const buttonWrapperStyle = {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-direction": "row",
    "background-color": "#282c34",
  }

  const buttonStyle = {
    "margin": "10px"
  }

  const totalWrapperStyle = {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-direction": "column",
    "background-color": "#282c34",
    "padding": "20px",
    "border-radius": "10px",
    "box-shadow": "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    "margin": "20px",
    "border": "1px solid #e0e0e0"
  }

  const subWrapperStyle = {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-direction": "row",
    "background-color": "#282c34",
    "padding": "20px",
    "border-radius": "10px",
    "margin": "10px",
  }

  return (
    <>
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div style={totalWrapperStyle}>
              <div className="tools" style={buttonWrapperStyle}>
                <Button variant="contained" onClick={() => zoomIn()} style={buttonStyle}>
                  <ZoomInIcon />
                </Button>
                <Button variant="contained" onClick={() => zoomOut()} style={buttonStyle}>
                  <ZoomOutIcon />
                </Button>
                <Button variant="contained" onClick={() => resetTransform()} style={buttonStyle}>
                  Reset
                </Button>
                <Button variant="contained" type="submit" onClick={handleSubmit} style={buttonStyle}>
                  Generate Diagram
                </Button>
                <Button variant="contained" component="label" style={buttonStyle}>
                  UPLOAD
                  <input accept=".zip" hidden type="file" onChange={onFileChange} />
                </Button>
              </div>
              <div style={subWrapperStyle}>
                <div className="wrapper" style={wrapperStyle}>
                  <TransformComponent>
                    <pre className="mermaid" id="diagramContainer" />
                  </TransformComponent>
                </div>
                <FunctionInfoBox
                  name={functionInfo.name}
                  returnType={functionInfo.returnType}
                  display={displayFunctionInfo ? "block" : "none"}
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </TransformWrapper>
    </>
  );

  function generateGraphCode() {
    let code = " flowchart LR\n";

    for (const module_ of modules) {
      code += `subgraph ${module_.name}\n`;
      for (const class_ of module_.classes) {
        code += `subgraph ${class_.name}\n`;
        for (const method of class_.methods) {
          code += `${method.name}\n`;
        }
        code += `end\n`;
      }
      code += `end\n`;
    }
    for (const connection of contections) {
      code += `${connection.from}:::someclass --> ${connection.to}\n`;
    }
    code += `classDef someclass fill:#f96\n`;
    return code;
  }
}

function FunctionInfoBox(props: any) {
  const cardStyle = {
    display: props.display
  }
  return (
    <><Card style={cardStyle}>
      <CardContent>
        <Typography variant="h5" >
          Function Info
        </Typography>
        <Typography variant="body2">
          Function Name: {props.name}
        </Typography>
        <Typography variant="body2">
          Return Type: {props.returnType}
        </Typography>
      </CardContent>
    </Card></>
  );
}

export default UMLDiagramGenerator;
