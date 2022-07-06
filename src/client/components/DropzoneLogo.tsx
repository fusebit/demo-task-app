import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCustomColorsContext } from './useCustomColorsContext';

const DropzoneLogo = () => {
  const [logo, setLogo] = useState('');
  const { colors } = useCustomColorsContext();

  useEffect(() => {
    const logo = localStorage.getItem('logo');
    if (logo) {
      setLogo(logo);
    }
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((image: Blob) => {
      const reader = new FileReader();
      reader.onabort = () => alert('file reading was aborted');
      reader.onerror = () => alert('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        localStorage.setItem('logo', String(binaryStr));
        setLogo(String(binaryStr));
      };
      reader.readAsDataURL(image);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpg': [],
      'image/svg+xml': [],
    },
  });

  const dropzoneText = useMemo(() => {
    if (isDragReject) {
      return 'Invalid Image Type';
    } else if (isDragActive) {
      return 'Drop Your Logo Here';
    }

    return 'Drag Your Logo Here';
  }, [isDragActive, isDragReject]);

  return (
    <>
      {logo ? (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Box
              className="drawer-logo-container drawer-logo-container-dragging"
              sx={{
                width: '260px !important',
                color: `${colors.sidebarText} !important`,
                borderColor: `${colors.sidebarText} !important`,
                background: isDragActive && 'rgba(0,0,0,0.05) !important',
              }}
            >
              <Typography fontSize="18px" lineHeight="21px" sx={{ width: 'fit-content' }}>
                {dropzoneText}
              </Typography>
            </Box>
          ) : (
            <img src={logo} className="logo" alt="logo" />
          )}
        </div>
      ) : (
        <Box
          className="drawer-logo-container"
          {...getRootProps()}
          sx={{
            border: `1px dotted ${colors.sidebarText} !important`,
            color: `${colors.sidebarText} !important`,
            background: isDragActive && 'rgba(0,0,0,0.05) !important',
          }}
        >
          <input {...getInputProps()} />
          <Typography fontSize="18px" lineHeight="21px" sx={{ width: 'fit-content' }}>
            {dropzoneText}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default DropzoneLogo;
