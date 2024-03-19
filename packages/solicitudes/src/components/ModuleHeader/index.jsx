import {
  Card, CardContent, Grid, Typography,
} from '@mui/material';
import { ButtonStyled, StepperComponent, Context } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Modal from '../Modal/ModalObservacion';

export default function ModuleHeader({
  steps,
  type,
  date,
  nextModule,
  module,
  id,
}) {
  const [disabled, setDisabled] = useState(false);
  const [modalState, setModalState] = useState(false);
  const { session } = useContext(Context);
  const { rol } = session;

  const isControlDocumental = rol === 'control_documental';
  const textRol = isControlDocumental ? 'Terminar revisión' : 'Terminar solicitud';

  const submitButton = () => {
    if (isControlDocumental) {
      setModalState({ open: true, title: 'Enviar Observaciones' });
    } else {
      nextModule();
    }
  };
  useEffect(() => {
    if (id !== undefined) {
      setDisabled(true);
    }
  }, [id]);

  const router = useRouter();
  return (
    <>
      <Card sx={{ width: '100%', mt: 5 }}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <StepperComponent steps={steps} position={module} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="p" sx={{ fontWeight: 'bold' }}>
                Tipo de solicitud:
                <span>&nbsp;</span>
              </Typography>
              <Typography variant="p">{type}</Typography>
              <br />
              <Typography variant="p" sx={{ fontWeight: 'bold' }}>
                Fecha de inicio:
                <span>&nbsp;</span>
              </Typography>
              <Typography variant="p">{date}</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right', alignItems: 'end' }}>
              <ButtonStyled
                text={textRol}
                alt={textRol}
                type="success"
                onclick={() => submitButton()}
                disabled={disabled}
              />
              <span>&nbsp;&nbsp;</span>
              <ButtonStyled
                text="Salir"
                alt="Salir"
                type="success"
                onclick={() => router.push('/home')}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Modal id={id} setModalState={setModalState} modalState={modalState} />
    </>
  );
}

ModuleHeader.defaultProps = {
  id: null,
};

ModuleHeader.propTypes = {
  type: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
  nextModule: PropTypes.func.isRequired,
  module: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([undefined])]),
};
