import React, { useState, useContext } from 'react';
import { Layout, ButtonsForm, Context } from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import {
  Box, Grid, Tab, Tabs,
} from '@mui/material';
import PropTypes from 'prop-types';
import createInstitucion from '../../../utils/createInstitucion';
import InstitucionView from '../InstitucionView';
import InstitucionForm from '../InstitucionForm';
import PlantelesTable from '../../Planteles/PlantelesTable';

export default function InstitucionLayout({ institucion }) {
  const { session, setNoti } = useContext(Context);
  const router = useRouter();
  const [institucionForm, setInstitucionForm] = useState({
    usuarioId: session.id,
    tipoInstitucionId: 1,
  });
  const [errors, setErrors] = useState({});

  const handleConfirm = () => {
    createInstitucion(institucionForm, errors, setNoti, router);
  };

  const handleCancel = () => {
    router.back();
  };

  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {institucion ? (
        <Layout title="Institución">
          <Grid container>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Datos de institución" />
                  <Tab label="Planteles" disabled={!institucion} />
                </Tabs>
              </Box>
            </Grid>
            {value === 0 && <InstitucionView data={institucion} />}
            {value === 1 && (
            <PlantelesTable
              institucion={institucion.id}
              data={institucion.planteles}
            />
            )}
          </Grid>
        </Layout>
      ) : (
        <Layout title="Registrar Institución">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InstitucionForm
                form={institucionForm}
                setForm={setInstitucionForm}
                setErrors={setErrors}
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonsForm confirm={handleConfirm} cancel={handleCancel} />
            </Grid>
          </Grid>
        </Layout>
      )}
    </div>
  );
}

InstitucionLayout.propTypes = {
  institucion: PropTypes.shape({
    id: PropTypes.number,
    planteles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
};
