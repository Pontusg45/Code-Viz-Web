import { Button } from '@mui/material';
import React from 'react';

interface UploadButtonProps {
  onFileChange: any;
}

export default function UploadButton(props: UploadButtonProps) {
  const { onFileChange } = props;
  return (
    <Button variant="contained" component="label" style={{
      backgroundColor: "#000",
      marginLeft: "10rem",
    }}>
      UPLOAD
      <input accept=".zip" hidden type="file" onChange={onFileChange} />
    </Button>
  );
}