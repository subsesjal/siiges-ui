import { Grid } from '@mui/material';
import {
  ButtonsModal, DefaultModal, Input, Select,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Modal({
  id,
  modalState,
  setModalState,
  setRowsData,
  SetCreateRow,
  tipoEgresoId,
  params,
}) {
  const [form, setForm] = useState({
    tipoEgresoId,
    cantidad: params?.cantidad,
    tipoPresupuestoId: params?.tipoPresupuestoId,
    tipoRecursoPresupuestoId: params?.tipoRecursoPresupuestoId,
  });
  useEffect(() => {
    if (id) {
      setForm((prevForm) => ({
        ...prevForm,
        id,
      }));
    }
  }, [id]);

  const updateForm = (field, value) => {
    const parsedValue = Number.isNaN(parseInt(value, 10))
      ? value
      : parseInt(value, 10);
    setForm((prevForm) => ({
      ...prevForm,
      [field]: parsedValue,
    }));
  };

  const capituloRows = [
    {
      id: 1000,
      nombre: '1000 SERVICIOS PERSONALES',
    },
    {
      id: 2000,
      nombre: '2000 MATERIALES Y SUMINISTROS',
    },
    {
      id: 3000,
      nombre: '3000 SERVICIOS GENERALES',
    },
    {
      id: 4000,
      nombre: '4000 TRANSFERENCIAS ASIGNACIONES SUBSIDIOS Y OTRAS AYUDAS',
    },
    {
      id: 5000,
      nombre: '5000 BIENES MUEBLES INMUEBLES E INTANGIBLES',
    },
    {
      id: 6000,
      nombre: '6000 INVERSIÓN PÚBLICA',
    },
    {
      id: 7000,
      nombre: '7000 INVERSIONES FINANCIERAS Y OTRAS PROVISIONES',
    },
    {
      id: 8000,
      nombre: '8000 PARTICIPACIONES Y APORTACIONES',
    },
    {
      id: 9000,
      nombre: '9000 DEUDA PÚBLICA',
    },
  ];

  const tipoRecursoRows = [
    {
      id: 1,
      nombre: 'IMPORTE RECURSOS FISCALES (FF11)',
    },
    {
      id: 2,
      nombre: 'IMPORTE RECURSOS FEDERALES NO ETIQUETADOS (FF15)',
    },
    {
      id: 3,
      nombre: 'IMPORTE RECURSOS FEDERALES ETIQUETADOS (FF25)',
    },
    {
      id: 4,
      nombre: 'IMPORTE INGRESOS PROPIOS (FF14)',
    },
  ];
  return (
    <DefaultModal
      title={modalState.title}
      open={modalState.open}
      setOpen={(open) => setModalState({ ...modalState, open })}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select
            name="tipoPresupuestoId"
            title="Capítulo"
            id={`nombre-${id}`}
            value={form.tipoPresupuestoId}
            options={capituloRows}
            onchange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            name="tipoRecursoPresupuestoId"
            title="Tipo Recurso Presupuesto"
            options={tipoRecursoRows}
            value={form.tipoRecursoPresupuestoId}
            id={`metrosCuadrados-${id}`}
            onchange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name="cantidad"
            label="Cantidad"
            id={`cantidad-${id}`}
            value={form.cantidad}
            onchange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
      </Grid>
      <ButtonsModal
        confirm={() => {
          setRowsData(form);
          setModalState({ ...modalState, open: false });
          SetCreateRow(true);
        }}
        cancel={() => {
          setRowsData(null);
          setModalState({ ...modalState, open: false });
        }}
        edit={modalState.edit}
      />
    </DefaultModal>
  );
}

Modal.defaultProps = {
  id: 0,
  params: {},
  tipoEgresoId: 0,
  modalState: {},
};

Modal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modalState: PropTypes.shape({
    title: PropTypes.string,
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    confirmAction: PropTypes.func,
    edit: PropTypes.bool,
  }),
  setModalState: PropTypes.func.isRequired,
  setRowsData: PropTypes.func.isRequired,
  SetCreateRow: PropTypes.func.isRequired,
  tipoEgresoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  params: PropTypes.shape({
    cantidad: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tipoPresupuestoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tipoRecursoPresupuestoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default Modal;
