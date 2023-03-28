import React from 'react';
import './header.scss';
import { Box, Button } from '@mui/material';
import UploadButton from '../uploadButton';
import { TreeSelect } from 'mui-tree-select';
import Sample from '../filter/treeView/SelectTree';

type HeaderProps = {
    onFileChange: any;
}

function Header(props: HeaderProps) {
    const { onFileChange } = props;

    return (
        <Box className="header">
        <Sample/>
        <h1>Code Viz</h1>
            <UploadButton onFileChange={onFileChange}/>
        </Box>
    )
}

export default Header;