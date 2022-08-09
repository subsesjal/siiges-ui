import React from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ButtonStyled from '../Buttons/ButtonStyled';

export default function InputFile() {
  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor="file-upload" sx={{ position: 'relative', alignSelf: 'left' }}>Subir Archivos...</InputLabel>
      <OutlinedInput
        id="file-upload"
        type="text"
        sx={{
          position: 'fixed',
          mt: 1,
          p: 0,
          width: '240px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        endAdornment={(
          <InputAdornment position="end">
            <ButtonStyled text={<UploadFileIcon />} alt="Examinar" />
          </InputAdornment>
        )}
      />
    </FormControl>
  );
}
