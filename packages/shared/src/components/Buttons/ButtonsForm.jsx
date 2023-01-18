import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonStyled from './ButtonStyled';
import '../../styles/buttons/ButtonForm.css';

export default function UserForm({ confirm, cancel }) {
  return (
    <div style={{ marginTop: 15, marginBottom: -5 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="userFormContainer"
      >
        <div style={{ marginRight: 7 }}>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={cancel}
          />
        </div>
        <div style={{ marginLeft: 7 }}>
          <ButtonStyled
            text="Guardar"
            alt="Guardar"
            design="success"
            type="submit"
            onclick={confirm}
          />
        </div>
      </Grid>
    </div>
  );
}

UserForm.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};
