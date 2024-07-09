import {
  Card, CardContent, Grid, Typography,
} from '@mui/material';
import {
  ButtonStyled,
  StepperComponent,
  Context,
  updateRecord,
  DefaultModal,
  ButtonsForm,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Modal from '../Modal/ModalObservacion';

export default function ModuleHeader({
  steps,
  type,
  date,
  prevModule,
  nextModule,
  module,
  id,
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
  const textIsControlDocumental = isFinalModule ? 'Terminar revisión' : 'Siguiente módulo';
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
          message: 'Se completó la solicitud exitosamente',
          type: 'success',
        });
        router.back();
        setLoading(false);
      } else {
        throw new Error('Error al completar la solicitud');
      }
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || 'Hubo un error al completar la solicitud',
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
          message: 'Favor de llenar la solicitud',
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
    // Check if the current module is the last step
    if (module === steps.length - 1) {
      setLastStepReached(true);
    } else {
      setLastStepReached(false);
    }
  }, [module, steps]);

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
              {module >= 1 && (
                <ButtonStyled
                  text="Modulo anterior"
                  alt="Modulo anterior"
                  type="success"
                  onclick={() => prevButton()}
                  disabled={disabled}
                />
              )}
              <span>&nbsp;&nbsp;</span>
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
      <DefaultModal
        title="Completar solicitud"
        open={modalRepresentante}
        setOpen={setModalRepresentante}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              ¿Esta seguro que desea terminar la solicitud?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ButtonsForm
              cancel={() => setModalRepresentante(false)}
              confirm={handleLastStepAction}
            />
          </Grid>
        </Grid>
      </DefaultModal>
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
  prevModule: PropTypes.func.isRequired,
  module: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
