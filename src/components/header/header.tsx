import React from 'react';
import './header.scss';
import { Box, Button, Typography } from '@mui/material';

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
          <Box sx={{
            width: 300,
            height: 50,
          }}>
            <svg viewBox="0 0 300 50" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="14" x2="40" y2="14" stroke="green" stroke-width="3" stroke-dasharray="6"  />
              <text x="50" y="18" font-size="20" fill={"white"}>Methods calling</text>
              <line x1="0" y1="38" x2="40" y2="38" stroke="red" stroke-width="3" stroke-dasharray="6" />
              <text x="50" y="42" font-size="20" fill={"white"}>Method getting called</text>
            </svg>
          </Box>
        </Box>
    );
}
