import { Button } from '@mui/material';
import React from 'react';

interface UploadButtonProps {
  onFileChange: any;
}

export default function UploadButton(props: UploadButtonProps) {
  const { onFileChange } = props;
  return (
    <Button variant="outlined" component="label">
      UPLOAD
      <input accept=".zip" hidden type="file" onChange={onFileChange} />
    </Button>
  );
}