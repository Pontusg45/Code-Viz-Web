import React from 'react';
import './header.scss';
import { Box, Button, Typography } from '@mui/material';
import UploadButton from '../uploadButton';
import { TreeSelect } from 'mui-tree-select';
import Sample from '../filter/treeView/SelectTree';

type HeaderProps = {
    onFileChange: any;
    openFilter: any;
};

export default function Header(props: HeaderProps) {
    const { onFileChange, openFilter } = props;

    return (
        <Box className="header">
            <Button aria-describedby={'simple-popover'} variant="outlined" onClick={openFilter}>
                Filter
            </Button>
            <Typography variant='h2'>Code Viz</Typography>
            <UploadButton onFileChange={onFileChange} />
        </Box>
    );
}
