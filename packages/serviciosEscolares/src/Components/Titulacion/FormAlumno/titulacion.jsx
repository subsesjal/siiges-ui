import {
  Divider,
  Grid,
  List,
  Typography,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import {
  getData,
  GetFile,
  InputFile,
  ListSubtitle,
  ListTitle,
  Context,
} from '@siiges-ui/shared';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function titulacion({
  programaId,
  id,
  type,
}) {
  const [programa, setPrograma] = useState({});
  const [url, setUrl] = useState(null);
  const { setNoti, session } = useContext(Context);
  const [fileDisabled, setFileDisabled] = useState(false);

  useEffect(() => {
    setFileDisabled(['representante', 'ce_ies'].includes(session?.rol));
  }, [session?.rol]);

  const fileData = {
    entidadId: id,
    tipoEntidad: 'ALUMNO',
    tipoDocumento: 'TITULO_ELECTRONICO_XML',
  };

  useEffect(() => {
    if (programaId) {
      getData({ endpoint: `/programas/${programaId}` })
        .then((result) => {
          if (result.statusCode === 200) setPrograma(result.data);
        });
    }
  }, [programaId]);

  useEffect(() => {
    if (type === 'editar') {
      GetFile(fileData, setUrl);
    }
  }, [id]);

  const downloadFile = async () => {
    try {
      const response = await getData({
        endpoint: `/files/?tipoEntidad=ALUMNO&entidadId=${id}&tipoDocumento=TITULO_ELECTRONICO_PDF`,
      });

      const ubicacion = response?.data?.ubicacion;
      if (ubicacion && typeof ubicacion === 'string') {
        const fullUrl = `${baseUrl}${ubicacion}`;
        window.open(fullUrl, '_blank');
      } else {
        throw new Error('Archivo no encontrado');
      }
    } catch (error) {
      setNoti({
        open: true,
        message: '¡No se encontró el archivo!',
        type: 'error',
      });
    }
  };

  return (
    <Grid container spacing={2} sx={{ m: 1 }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Datos del Programa
      </Typography>
      <Grid
        container
        rowSpacing={1}
        sx={{ my: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs>
          <List>
            <ListTitle text="Acuerdo de RVOE" />
            <ListTitle text="Nivel" />
            <ListTitle text="Nombre del Programa" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={programa.acuerdoRvoe} />
            <ListSubtitle text={programa?.nivel?.descripcion} />
            <ListSubtitle text={programa.nombre} />
          </List>
        </Grid>
        <Grid item xs>
          <List>
            <ListTitle text="Modalidad" />
            <ListTitle text="Periodo" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={programa?.modalidad?.nombre} />
            <ListSubtitle text={programa?.ciclo?.nombre} />
          </List>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <InputFile
          label="XML de título electrónico"
          tipoDocumento="TITULO_ELECTRONICO_XML"
          tipoEntidad="ALUMNO"
          id={id}
          url={url}
          setUrl={setUrl}
          disabled={fileDisabled}
        />
      </Grid>
      {url && (
      <Grid item xs={6}>
        <Button
          variant="outlined"
          onClick={downloadFile}
          sx={{
            width: '100%',
            height: '40px',
            color: 'black',
            borderColor: 'black',
            '&:hover': {
              color: 'white',
              backgroundColor: 'black',
              borderColor: 'black',
            },
          }}
        >
          Título PDF
        </Button>
      </Grid>
      )}
    </Grid>
  );
}

titulacion.propTypes = {
  programaId: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string,
};

titulacion.defaultProps = {
  disabled: false,
  type: 'editar',
};
