import { Grid } from '@mui/material';
import { GetFile, InputFile } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function DocumentosAlumnoTitulacion({ id, type }) {
  const [fileURLs, setFileURLs] = useState([null, null, null]);

  const handleFileLoaded = (index, url) => {
    setFileURLs((prevURLs) => {
      const newURLs = [...prevURLs];
      newURLs[index] = url;
      return newURLs;
    });
  };

  useEffect(() => {
    if (type === 'edit') {
      const fetchFiles = async () => {
        const fileTypes = ['ARCHIVO_CERTIFICADO', 'ARCHIVO_NACIMIENTO', 'ARCHIVO_CURP'];
        const promises = fileTypes.map((tipoDocumento, index) => new Promise((resolve) => {
          GetFile({ tipoEntidad: 'ALUMNO', entidadId: id, tipoDocumento }, (url, error) => {
            if (!error) {
              handleFileLoaded(index, url);
            }
            resolve();
          });
        }));

        await Promise.all(promises);
      };

      fetchFiles();
    }
  }, [id, type]);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="ALUMNO"
            tipoDocumento="ARCHIVO_CERTIFICADO"
            id={id}
            label="Archivo de Cédula Profesional, Título o equivalente (PDF)"
            url={fileURLs[0]}
            setUrl={(url) => handleFileLoaded(0, url)}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="ALUMNO"
            tipoDocumento="ARCHIVO_NACIMIENTO"
            id={id}
            label="Archivo Acta de Nacimiento (PDF)"
            url={fileURLs[1]}
            setUrl={(url) => handleFileLoaded(1, url)}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="ALUMNO"
            tipoDocumento="ARCHIVO_CURP"
            id={id}
            label="Archivo CURP (PDF)"
            url={fileURLs[2]}
            setUrl={(url) => handleFileLoaded(2, url)}
            disabled
          />
        </Grid>
      </Grid>
    </div>
  );
}

DocumentosAlumnoTitulacion.defaultProps = {
  id: null,
  type: null,
};

DocumentosAlumnoTitulacion.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
};
