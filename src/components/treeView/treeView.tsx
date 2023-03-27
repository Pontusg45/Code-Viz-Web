import { TreeItem, TreeView } from '@mui/lab';
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { ChevronRight, ExpandMore, Visibility, VisibilityOff } from '@mui/icons-material';
import { ClassInterface, FileInterface, Files, LightFunctionInterface } from '../../interfaces/interface';


export default function RecursiveTreeView(
  props:
    {
      style: any,
      data: Files,
      onClick: any,
      onCheck: any
    }
) {
  const { style, data, onClick, onCheck } = props;
  const [selected, setSelected] = React.useState<string[]>([]);

  function getOnChange(checked: boolean, functionName: string, type: 'file' | 'class' | 'function') {

  }

  const renderFiles = (file: Files, label: string) => (

    <TreeItem
      key={label}
      nodeId={label}
      onClick={onClick}
      label={
        <FormControlLabel
          control={
            <Checkbox
              checkedIcon={<VisibilityOff />}
              icon={<Visibility
                onClick={onCheck}
              />}
              checked={selected.some(item => item === label)}
              onChange={event =>
                getOnChange(event.currentTarget.checked, event.target.value, 'file')
              }
              onClick={e => e.stopPropagation()}
            />
          }
          label={<>{label}</>}
          key={label}
        />
      }
    >
      {
        Array.isArray(Object.keys(file))
          ? Object.keys(file).map((pathElement) => {
            if (file[pathElement].name !== undefined) {
              return renderClass(file[pathElement] as ClassInterface);
            } else {
              return renderFiles(file[pathElement] as Files, pathElement);
            }
          })
          : null
      }
    </TreeItem>
  );

  const renderClass = (classe: ClassInterface) => (
    <TreeItem
      key={classe.name}
      nodeId={classe.name}
      onClick={onClick}
      label={
        <FormControlLabel
          control={
            <Checkbox
              checkedIcon={<VisibilityOff />}
              icon={<Visibility
                onClick={onCheck}
              />}
              checked={selected.some(item => item === classe.name)}
              onChange={event =>
                getOnChange(event.currentTarget.checked, event.target.value, 'file')
              }
              onClick={e => e.stopPropagation()}
            />
          }
          label={<>{classe.name}</>}
          key={classe.name}
        />
      }
    >
      {
        Array.isArray(Object.keys(classe.class.functions))
          ? Object.keys(classe.class.functions).map((funName) =>
            renderFunction(classe.class.functions[funName]))
          : null
      }
    </TreeItem>
  );

  const renderFunction = (fun: LightFunctionInterface) => (
    <TreeItem
      key={fun.id}
      nodeId={fun.id}
      onClick={onClick}
      label={
        <FormControlLabel
          control={
            <Checkbox
              checkedIcon={<VisibilityOff />}
              icon={<Visibility
                onClick={onCheck}
              />}
              checked={selected.some(item => item === fun.id)}
              onChange={event =>
                getOnChange(event.currentTarget.checked, event.target.value, 'file')
              }
              onClick={e => e.stopPropagation()}
            />
          }
          label={<>{fun.id.split('#')[1]}</>}
          key={fun.id}
        />
      }
    >
    </TreeItem>
  );

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpanded={['0', '3', '4']}
      defaultExpandIcon={<ChevronRight />}
      style={style}
    >
      {
        Array.isArray(Object.keys(data))
          ? Object.keys(data).map((fileName) =>
            renderFiles(data[fileName] as Files, fileName)
          )
          : null
      }
    </TreeView>
  );
}
