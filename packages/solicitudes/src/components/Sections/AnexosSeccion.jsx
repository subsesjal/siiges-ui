import { Grid, Typography } from '@mui/material';
import { GetFile, InputFile } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function AnexosSeccion({
  disabled, id, type, institucionId,
}) {
  const [fileURLs, setFileURLs] = useState(Array(11).fill(null));
  const isSectionDisabled = useSectionDisabled(20);
  const isDisabled = disabled || isSectionDisabled;

  const tiposDocumentos = [
    {
      tipoDocumento: 'IDENTIFICACION_REPRESENTANTE',
      label: 'Identificación oficial con fotografía',
    },
    {
      tipoDocumento: 'COMPROBANTE_PAGO_RVOE',
      label: 'Comprobante de pago',
    },
    {
      tipoDocumento: 'FOTOGRAFIA_INMUEBLE',
      label: 'Fotografías inmuebles',
    },
    {
      tipoDocumento: 'CONSTANCIA_INFEJAL',
      label: 'Constancia INFEJAL',
    },
    {
      tipoDocumento: 'LICENCIA_MUNICIPAL',
      label: 'Licencia municipal',
    },
    {
      tipoDocumento: 'DICTAMEN_IMPI',
      label: 'Dictamen del Instituto Mexicano de Propiedad Intelectual (IMPI)',
    },
    {
      tipoDocumento: 'SECRETARIA_SALUD',
      label:
        'Aviso funcionamiento de Secretaría de Salud ó Carta bajo protesta de decir verdad de NO venta de alimentos.',
    },
    {
      tipoDocumento: 'COMPROBANTE_TELEFONO',
      label: 'Comprobante de línea telefónica',
    },
    {
      tipoDocumento: 'PROYECTO_VINCULACION',
      label: 'Proyecto de vinculación y movilidad',
    },
    {
      tipoDocumento: 'PLAN_MEJORA',
      label: 'Plan de mejora',
    },
    {
      tipoDocumento: 'PROGRAMA_SUPERACION',
      label: 'Programa de superación',
    },
  ];

  const getEntidadData = (tipoDocumento) => {
    if (tipoDocumento === 'DICTAMEN_IMPI') {
      return { tipoEntidad: 'INSTITUCION', entidadId: institucionId };
    }
    return { tipoEntidad: 'SOLICITUD', entidadId: id };
  };

  useEffect(() => {
    if ((type === 'editar' || type === 'consultar') && id) {
      tiposDocumentos.forEach(({ tipoDocumento }, index) => {
        const { tipoEntidad, entidadId } = getEntidadData(tipoDocumento);
        GetFile({ tipoEntidad, tipoDocumento, entidadId }, (url, err) => {
          if (!err) {
            setFileURLs((currentURLs) => {
              const updatedURLs = [...currentURLs];
              updatedURLs[index] = url;
              return updatedURLs;
            });
          }
        });
      });
    }
  }, [type, id, institucionId]);

  const handleFileLoaded = (index, url) => {
    setFileURLs((prevURLs) => [
      ...prevURLs.slice(0, index),
      url,
      ...prevURLs.slice(index + 1),
    ]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Anexos</Typography>
      </Grid>

      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        {tiposDocumentos.map(({ tipoDocumento, label }, index) => {
          const { tipoEntidad, entidadId } = getEntidadData(tipoDocumento);

          return (
            <Grid item xs={12} key={tipoDocumento}>
              <InputFile
                tipoEntidad={tipoEntidad}
                tipoDocumento={tipoDocumento}
                id={entidadId}
                url={fileURLs[index] || ''}
                setUrl={(url) => handleFileLoaded(index, url)}
                disabled={isDisabled}
                label={label}
              />
              {tipoDocumento === 'IDENTIFICACION_REPRESENTANTE' && (
                <Typography variant="subtitle2">
                  En el caso de ser persona física anexar la Identificación oficial, en el caso
                  de contar con razón social o persona moral anexar el acta constitutiva junto
                  con su Identificación oficial.
                </Typography>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

AnexosSeccion.defaultProps = {
  id: null,
  institucionId: null,
  type: null,
};

AnexosSeccion.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.number,
  institucionId: PropTypes.number,
  type: PropTypes.string,
};
