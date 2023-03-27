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
            <Typography variant="body2">
              Parameters:
            </Typography>
            
            {functionInfo.parameters ?  functionInfo.parameters.map((parameter: any) => {
              return (
                <ListItem disablePadding style={{ padding: 0, paddingLeft: "10px" }}>
                  <Typography variant="body2">
                    - {parameter.name}: {parameter.type}
                  </Typography>
                </ListItem>
              );
            }) : null
            }
          </List>
          <Typography variant="body2">
            InComing: {functionInfo.inComing}
          </Typography>
          <Typography variant="body2">
            OutGoing: {functionInfo.outGoing}
          </Typography>
          <Typography variant="body2">
            Recursive: {functionInfo.recursive ? "Yes" : "No"}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
