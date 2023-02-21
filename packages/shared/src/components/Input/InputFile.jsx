import React from 'react';
import { TextField } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PropTypes from 'prop-types';
import ButtonStyled from '../Buttons/ButtonStyled';
import '../../styles/Inputs/InputFile.css';

export default function InputFile({ label }) {
  return (
    <TextField
      id="file-upload"
      label={label}
      size="small"
      value=""
      sx={{ width: '100%' }}
      InputProps={{
        endAdornment: (
          <ButtonStyled
            text={<UploadFileIcon />}
            alt="Examinar"
            design="file"
          />
        ),
        style: {
          paddingRight: 0,
        },
      }}
    />
  );
}

InputFile.propTypes = {
  label: PropTypes.string.isRequired,
};
