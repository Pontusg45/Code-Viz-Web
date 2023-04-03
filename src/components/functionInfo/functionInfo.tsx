import { Functions } from "@mui/icons-material";
import { Card, CardContent, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { useState } from "react";
import FolderIcon from '@mui/icons-material/Folder';

export default function FunctionInfoBox(props: any) {
  const [dense, setDense] = useState(false);
  const { functionInfo, display, style } = props;
  const newStyle = {
    ...style,
    "display": display ? "flex" : "none"
  };
  if (functionInfo.name === "") {
    return null;
  }
  console.log("functionInfo", functionInfo);
  return (
    <>
      <Card style={newStyle}>
        <CardContent>
          <Typography variant="h5" >
            Function Info
          </Typography>
          <Typography variant="body2">
            Function: {functionInfo.name}
          </Typography>
          <Typography variant="body2">
            Return Type: {functionInfo.returnType}
          </Typography>
          <List dense={dense} disablePadding>
            {Array.isArray(Object.keys(functionInfo.parameters)) && Object.keys(functionInfo.parameters).length > 0 ?
            <Typography variant="body2">
              Parameters:
            </Typography> : null}
            {Array.isArray(Object.keys(functionInfo.parameters)) && Object.keys(functionInfo.parameters).length > 0
              ? Object.keys(functionInfo.parameters).map((fileName) =>
                  <ListItem disablePadding style={{ padding: 0, paddingLeft: "10px" }}>
                    <Typography variant="body2">
                      - {fileName} : {functionInfo.parameters[fileName]}
                    </Typography>
                  </ListItem>
                )
              : null
            }

              {/*functionInfo.parameters ?  functionInfo.parameters.map((parameter: any) =>
                <ListItem disablePadding style={{ padding: 0, paddingLeft: "10px" }}>
                  <Typography variant="body2">
                    - {parameter.name}: {parameter.type}
                  </Typography>
                </ListItem>
              );
            }) : null
            }*/}
          </List>
        </CardContent>
      </Card>
    </>
  );
}
