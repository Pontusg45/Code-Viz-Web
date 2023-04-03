import { TreeItem, TreeView } from '@mui/lab';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { ChevronRight, ExpandMore, Visibility, VisibilityOff } from '@mui/icons-material';
import { ClassInterface, FileInterface, Files, LightFunctionInterface } from '../../../interfaces/interface';


export default function RecursiveTreeView(
  props:
    {
      style: any,
      data: Files,
      onClick: any,
      onCheck: any,
      setSelectedNodes: any,
      handleClose: any,
    }
) {
  const { style, data, onClick, onCheck ,setSelectedNodes, handleClose } = props;
  let i = 0;
  i++;
  const keys: string[] = [];
  const [selected, setSelected] = React.useState<string[]>([]);

  function getOnChange(checked: boolean, functionName: string, type: 'file' | 'class' | 'function') {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (checked) {
        setSelectedNodes((prev: string[]) => {
          return prev.filter((value) => value !== functionName);
        });
      } else {
        setSelectedNodes((prev: string[]) => {
          return [...prev, functionName];
        });
      }
      onCheck(event, checked, functionName, type);
    };

  }

  const renderFiles = (file: Files, label: string) => (
    <TreeItem
      {...customTreeItemProps({
        key: label,
        label: label,
        type: 'file'
      })
      }
    >
      {
        Array.isArray(Object.keys(file.children))
          ? Object.keys(file.children).map((pathElement) => {
            if (file.children[pathElement].type !== 'package') {
              return renderClass(file.children[pathElement] as ClassInterface, pathElement);
            } else {
              return renderFiles(file.children[pathElement] as Files, pathElement);
            }
          })
          : null
      }
    </TreeItem>
  );

  const renderClass = (classe: ClassInterface, label: string) => (
    <TreeItem
      {...customTreeItemProps(
        {
          key: classe.id,
          label: label,
          type: 'class'
        }
      )}
    >
      {
        Array.isArray(Object.keys(classe.functions))
          ? Object.keys(classe.functions).map((funName) =>{
            return renderFunction(classe.functions[funName])
          })
          : null
      }
    </TreeItem>
  );

  const renderFunction = (fun: LightFunctionInterface) => (
    <TreeItem
      {...customTreeItemProps({
        key: fun.id,
        label: fun.id.split('#')[1],
        type: 'function'
      })
      }
    >
    </TreeItem>
  );

  function customTreeItemProps(props: any) {
    const { key, label, type } = props;
    if (i == 1 && type !== 'function'){
      keys.push(key);
      //setKeys(oldArray => [...oldArray, key]);
    }
    return {
      key: key,
      nodeId: key,
      onClick: onClick,
      label: (
        <FormControlLabel
          control={
            <Checkbox
              checkedIcon={<VisibilityOff />}
              icon={<Visibility onClick={onCheck} />}
              checked={
                selected.some((item) => item === key)
              }
              onChange={(event) =>
                getOnChange(event.currentTarget.checked, event.target.value, type)
              }
              onClick={(e) => e.stopPropagation()}
            />
          }
          label={<>{label}</>}
          key={key}
        />
      )
    };
  }

  const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleToggle = (event:any, nodeIds:any) => {
    if (event.target.nodeName !== "svg") {
      return;
    }
    setExpanded(nodeIds);
  };

  const handleSelect = (event:any, nodeIds:any) => {
    if (event.target.nodeName === "svg") {
      return;
    }
    const first = nodeIds[0];
    if (selected.includes(first)) {
      setSelected(selected.filter(id => id !== first));
      setSelectedNodes(selected.filter(id => id !== first));
    } else {
      setSelected([first, ...selected]);
      setSelectedNodes([first, ...selected]);
    }
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded: string[]) =>
      oldExpanded.length === 0 ? keys : []
    );
  };

  const handleSelectClick = () => {
    setSelected((oldSelected) =>
      oldSelected.length === 0 ? keys : []
    );

  };

  return (
    <Box>
      <Box sx={{
        mb: 1,
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <Button onClick={handleExpandClick}>
          {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
        <Button onClick={handleSelectClick}>
          {selected.length === 0 ? 'Select all' : 'Unselect all'}
        </Button>
      </Box>
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpanded={['0', '3', '4']}
        defaultExpandIcon={<ChevronRight />}
        style={style}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        multiSelect
      >
        {
          Array.isArray(Object.keys(data))
            ? Object.keys(data).map((fileName) =>
              renderFiles(data , "Program")
            )
            : null
        }
      </TreeView>
      <Button
        onClick={() =>{
          setSelectedNodes(selected);
          handleClose();
        }}
        sx={{
          mt: 1,
          display: 'flex',
          m: "auto"
        }}
      >Apply filter</Button>
    </Box>
  );
}
