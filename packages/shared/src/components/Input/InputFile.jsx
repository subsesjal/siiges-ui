import React from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ButtonStyled from '../Buttons/ButtonStyled';
import '../../styles/Inputs/InputFile.css';

export default function InputFile() {
  return (
    <FormControl className='formInputFile' variant="outlined">
      <InputLabel htmlFor="file-upload" className='formInputLabel'>Subir Archivos...</InputLabel>
      <OutlinedInput
        id="file-upload"
        type="text"
        className='OutlinedInput'
        endAdornment={(
          <InputAdornment position="end">
            <ButtonStyled text={<UploadFileIcon />} alt="Examinar" />
          </InputAdornment>
        )}
      />
    </FormControl>
  );
}
