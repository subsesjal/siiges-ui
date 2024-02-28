import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Context, Layout } from '@siiges-ui/shared';
import { InstitucionBox, InstitucionForm, getInstitucionHook } from '@siiges-ui/instituciones';

function InstitucionWrapper({
  institucion, session, setLoading, setTitle, setNoti,
}) {
  return (
    <div>
      {institucion.id
        ? (
          <InstitucionBox
            institucion={institucion}
            setLoading={setLoading}
            setTitle={setTitle}
          />
        )
        : (
          <InstitucionForm
            session={session}
            accion="crear"
            setLoading={setLoading}
            setTitle={setTitle}
            setNoti={setNoti}
          />
        )}
    </div>
  );
}

export default function MiInstitucion() {
  const { session, setNoti } = useContext(Context);
  const [institucion, setInstitucion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  getInstitucionHook({
    setInstitucion,
    session,
    setNoti,
    institucion,
    setLoading,
    loading,
  });

  return (
    <Layout title={title} loading={loading}>
      {institucion !== null
        ? (
          <InstitucionWrapper
            session={session}
            institucion={institucion}
            setLoading={setLoading}
            setTitle={setTitle}
            setNoti={setNoti}
          />
        )
        : <div />}
    </Layout>
  );
}

InstitucionWrapper.defaultProps = {
  institucion: {} || null,
};

InstitucionWrapper.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setNoti: PropTypes.func.isRequired,
  institucion: PropTypes.shape({
    id: PropTypes.number,
  }),
  session: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};
