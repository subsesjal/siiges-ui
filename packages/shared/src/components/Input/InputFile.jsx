import React from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PropTypes from 'prop-types';
import ButtonStyled from '../Buttons/ButtonStyled';
import '../../styles/Inputs/InputFile.css';

export default function InputFile({ label }) {
  return (
    <FormControl className="formInputFile" variant="outlined" sx={{ width: '100%' }}>
      <InputLabel htmlFor="file-upload" className="formInputLabel" sx={{ mt: 0.7 }}>
        {label}
        ...
      </InputLabel>
      <OutlinedInput
        id="file-upload"
        type="text"
        className="OutlinedInput"
        sx={{ width: 350, height: 44 }}
        endAdornment={(
          <InputAdornment position="end">
            <ButtonStyled text={<UploadFileIcon />} alt="Examinar" />
          </InputAdornment>
        )}
      />
    </FormControl>
  );
}

InputFile.propTypes = {
  label: PropTypes.string.isRequired,
};
