import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Card, CardContent, Grid, Typography,
} from '@mui/material';
import {
  StepperComponent,
  Context,
  updateRecord,
  DefaultModal,
  ButtonSimple,
} from '@siiges-ui/shared';
import Modal from '../Modal/ModalObservacion';

export default function ModuleHeader({
  steps,
  type,
  date,
  prevModule,
  nextModule,
  module,
  id,
  isEditOrView,
  switchModule,
}) {
  const [disabled, setDisabled] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalRepresentante, setModalRepresentante] = useState(false);
  const [lastStepReached, setLastStepReached] = useState(false);
  const { session, setNoti, setLoading } = useContext(Context);
  const { rol } = session;
  const router = useRouter();

  const isControlDocumental = rol === 'control_documental';
  const isFinalModule = module === steps.length - 1;
  const textIsControlDocumental = isFinalModule
    ? 'Terminar revisión'
    : 'Siguiente módulo';
  const textNormal = isFinalModule ? 'Terminar solicitud' : 'Siguiente módulo';
  const textRol = isControlDocumental ? textIsControlDocumental : textNormal;

  const handleLastStepAction = async () => {
    setModalRepresentante(false);
    setLoading(true);
    const endpoint = `/solicitudes/${id}`;
    const data = {
      estatusSolicitudId: 2,
    };
    try {
      const result = await updateRecord({ data, endpoint });
      if (result?.statusCode === 200) {
        setNoti({
          open: true,
          message: '¡Se completó la solicitud exitosamente!',
          type: 'success',
        });
        router.push('/solicitudes');
        setLoading(false);
      } else {
        throw new Error('¡Error al completar la solicitud!');
      }
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || '¡Hubo un error al completar la solicitud!',
        type: 'error',
      });
      setLoading(false);
    }
  };

  const submitButton = () => {
    if (lastStepReached && rol === 'representante') {
      if (id) {
        setModalRepresentante(true);
      } else {
        setNoti({
          open: true,
          message: '¡Por Favor llenar la solicitud!',
          type: 'error',
        });
      }
    } else if (isControlDocumental) {
      if (isFinalModule) {
        setModalState({ open: true, title: 'Enviar Observaciones' });
      } else {
        nextModule();
      }
    } else {
      nextModule();
    }
  };

  const prevButton = () => {
    prevModule();
  };

  useEffect(() => {
    if (id !== undefined) {
      setDisabled(true);
    }
  }, [id]);

  useEffect(() => {
    if (module === steps.length - 1) {
      setLastStepReached(true);
    } else {
      setLastStepReached(false);
    }
  }, [module, steps]);

  const showFinishButton = isEditOrView !== 'consultar' && isFinalModule;

  return (
    <>
      <Card sx={{ width: '100%', mt: 5 }}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <StepperComponent
                steps={steps}
                position={module}
                onStepClick={switchModule}
              />
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
          </Grid>
          <Grid container spacing={1} justifyContent="right">
            {module >= 1 && (
              <Grid item>
                <ButtonSimple
                  text="Módulo anterior"
                  alt="Módulo anterior"
                  type="success"
                  onClick={() => prevButton()}
                  disabled={disabled}
                />
              </Grid>
            )}
            {showFinishButton && (
              <Grid item>
                <ButtonSimple
                  text={textRol}
                  alt={textRol}
                  type="success"
                  onClick={() => submitButton()}
                  disabled={disabled}
                />
              </Grid>
            )}
            {!showFinishButton && !isFinalModule && (
              <Grid item>
                <ButtonSimple
                  text="Siguiente módulo"
                  alt="Siguiente módulo"
                  type="success"
                  onClick={() => submitButton()}
                  disabled={disabled}
                />
              </Grid>
            )}
            <Grid item>
              <ButtonSimple
                text="Salir"
                alt="Salir"
                type="success"
                onClick={() => router.push('/home')}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Modal id={id} setModalState={setModalState} modalState={modalState} />
      <DefaultModal
        title="Completar solicitud"
        open={modalRepresentante}
        setOpen={setModalRepresentante}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              ¿Deseas completar la solicitud? Esta acción no podrá deshacerse.
            </Typography>
          </Grid>
          <Grid container justifyContent="right" spacing={2} sx={{ mt: 1 }}>
            <Grid item>
              <ButtonSimple
                text="Cancelar"
                design="cancel"
                onClick={() => setModalRepresentante(false)}
              />
            </Grid>
            <Grid item>
              <ButtonSimple
                text="Aceptar"
                type="success"
                onClick={() => handleLastStepAction()}
              />
            </Grid>
          </Grid>
        </Grid>
      </DefaultModal>
    </>
  );
}

ModuleHeader.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.number).isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  prevModule: PropTypes.func.isRequired,
  nextModule: PropTypes.func.isRequired,
  module: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isEditOrView: PropTypes.string.isRequired,
  switchModule: PropTypes.func.isRequired,
};
