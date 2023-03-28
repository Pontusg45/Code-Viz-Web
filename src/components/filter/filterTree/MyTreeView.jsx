import React from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import { withStyles } from '@mui/material';

const MyTreeView = (props) => {
  const { data, expanded, selected, handleToggle, handleSelect } = props;

  const renderTree = (nodes) => {
    if (!nodes || nodes.length === 0) {
      return null;
    }
    return (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {renderTree(data)}
    </TreeView>
  );
};

export default MyTreeView;

/*const TreeItemS = withStyles({
  root: {

    '&.MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label': {
      backgroundColor: '#F5F5F5'
    }
  }
})(TreeItem);*/

