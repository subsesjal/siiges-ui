import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {
  GetFile,
  ListSubtitle,
  ListTitle,
  formattedDate,
  InputFile,
  Context,
  getData,
} from '@siiges-ui/shared';
import NavigationButtons from '../../utils/NavigationButtons';

const domain = process.env.NEXT_PUBLIC_URL;

export default function InstitucionView({ institucion }) {
  const { setNoti, setLoading } = useContext(Context);
  const [page, setPage] = useState(1);
  const [urlBiografia, setUrlBiografia] = useState('');
  const [urlBibliografia, setUrlBibliografia] = useState('');
  const [urlActaConstitutiva, setUrlActaConstitutiva] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const getInstitutionPhoto = async (institucionId) => {
    try {
      const endpoint = '/files/';
      const query = `?tipoEntidad=INSTITUCION&entidadId=${institucionId}&tipoDocumento=LOGOTIPO`;
      const response = await getData({ endpoint, query });
      if (response.statusCode === 200 && response.data?.url) {
        const { ubicacion } = response.data;
        const url = `${domain}${ubicacion}`;
        const imageBlob = await fetch(url).then((res) => res.blob());
        setImageUrl(URL.createObjectURL(imageBlob));
      } else {
        setImageUrl(null);
      }
    } catch (error) {
      setImageUrl(null);
    }
  };

  const fetchFiles = async () => {
    try {
      const [biografia, bibliografia, actaConstitutiva] = await Promise.allSettled([
        GetFile({
          entidadId: institucion.id,
          tipoEntidad: 'RATIFICACION',
          tipoDocumento: 'BIOGRAFIA',
        }),
        GetFile({
          entidadId: institucion.id,
          tipoEntidad: 'RATIFICACION',
          tipoDocumento: 'BIBLIOGRAFIA',
        }),
        GetFile({
          entidadId: institucion.id,
          tipoEntidad: 'INSTITUCION',
          tipoDocumento: 'ACTA_CONSTITUTIVA',
        }),
      ]);

      if (biografia.status === 'fulfilled') {
        setUrlBiografia(biografia.value);
      } else {
        setNoti({
          open: true,
          message: '¡Error al cargar el archivo de biografía!',
          type: 'error',
        });
      }

      if (bibliografia.status === 'fulfilled') {
        setUrlBibliografia(bibliografia.value);
      } else {
        setNoti({
          open: true,
          message: '¡Error al cargar el archivo de bibliografía!',
          type: 'error',
        });
      }

      if (actaConstitutiva.status === 'fulfilled') {
        setUrlActaConstitutiva(actaConstitutiva.value);
      } else {
        setNoti({
          open: true,
          message: '¡Error al cargar el archivo de acta constitutiva!',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      setNoti({
        open: true,
        message: '¡Error al cargar los archivos!',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchFiles(),
          getInstitutionPhoto(institucion.id),
        ]);
      } catch (error) {
        console.error('Error loading institution data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [institucion.id]);

  const totalPages = 2;
  const nextPage = () => setPage((prev) => (prev % totalPages) + 1);
  const prevPage = () => setPage((prev) => (prev === 1 ? totalPages : prev - 1));

  return (
    <Grid container>
      <Grid item xs={4} sx={{ textAlign: 'center', marginTop: 10 }}>
        <Image
          alt="institucion-logo"
          src={imageUrl || '/logoschool.png'}
          quality={100}
          width="300px"
          height="300px"
          style={{
            zIndex: 1,
            overflow: 'hidden',
          }}
        />
      </Grid>
      {page === 1 && (
        <Grid item xs={8} sx={{ marginTop: 3 }}>
          <Typography variant="h5" gutterBottom component="div">
            Información general
          </Typography>
          <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
          <Grid container>
            <Grid item xs={4}>
              <List>
                <ListItem disablePadding>
                  <ListItemText primary="Nombre de institución" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Razón social" />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
            <Grid item xs={2}>
              <List>
                <ListItem disablePadding>
                  <ListItemText secondary={institucion.nombre} sx={{ mt: 1 }} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    secondary={institucion.razonSocial}
                    sx={{ mt: 1 }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Typography variant="p" sx={{ fontWeight: 'medium' }}>
            Historia
          </Typography>
          <br />
          <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 10 }}>
            <Typography variant="p">{institucion.historia}</Typography>
          </div>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Typography variant="p" sx={{ fontWeight: 'medium' }}>
            Visión
          </Typography>
          <br />
          <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 10 }}>
            <Typography variant="p">{institucion.vision}</Typography>
          </div>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Typography variant="p" sx={{ fontWeight: 'medium' }}>
            Misión
          </Typography>
          <br />
          <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 10 }}>
            <Typography variant="p">{institucion.mision}</Typography>
          </div>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Typography variant="p" sx={{ fontWeight: 'medium' }}>
            Valores institucionales
          </Typography>
          <br />
          <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 20 }}>
            <Typography variant="p">
              {institucion.valoresInstitucionales}
            </Typography>
          </div>
        </Grid>
      )}
      {page === 2 && (
        <Grid item xs={8} sx={{ marginTop: 3 }}>
          <Typography variant="h5" gutterBottom component="div">
            Información del rector
          </Typography>
          <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
          <Grid container>
            <Grid item xs={4}>
              <List>
                <ListTitle text="Nombre(s)" />
                <ListTitle text="Apellidos" />
                <ListTitle text="Celular" />
                <ListTitle text="Teléfono" />
                <ListTitle text="Correo" />
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
            <Grid item xs={2}>
              <List>
                <ListSubtitle text={institucion?.rector?.persona?.nombre} />
                <ListSubtitle
                  text={`
                      ${institucion?.rector?.persona?.apellidoPaterno}
                      ${institucion?.rector?.persona?.apellidoMaterno}
                    `}
                />
                <ListSubtitle text={institucion?.rector?.persona?.celular} />
                <ListSubtitle text={institucion?.rector?.persona?.telefono} />
                <ListSubtitle
                  text={institucion?.rector?.persona?.correoPrimario}
                />
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
            Ratificación de nombre
          </Typography>
          <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
          <Grid container>
            {institucion.ratificacionesNombre[0]?.esNombreAutorizado ? (
              <>
                <Grid item xs={4}>
                  <List>
                    <ListTitle text="Nombre autorizado" />
                    <ListTitle text="Autoridad que autoriza" />
                    <ListTitle text="Fecha de autorización" />
                  </List>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                <Grid item xs={2}>
                  <List>
                    <ListSubtitle
                      text={
                        institucion?.ratificacionesNombre[0]?.nombreAutorizado
                      }
                    />
                    <ListSubtitle
                      text={institucion?.ratificacionesNombre[0]?.autoridad}
                    />
                    <ListSubtitle
                      text={formattedDate(
                        institucion?.ratificacionesNombre[0]?.fechaAutorizacion,
                      )}
                    />
                  </List>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={4}>
                  <List>
                    <ListTitle text="Nombre propuesto 1" />
                    <ListTitle text="Nombre propuesto 2" />
                    <ListTitle text="Nombre propuesto 3" />
                  </List>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                <Grid item xs={2}>
                  <List>
                    <ListSubtitle
                      text={
                        institucion?.ratificacionesNombre[0]?.nombrePropuesto1
                      }
                    />
                    <ListSubtitle
                      text={
                        institucion?.ratificacionesNombre[0]?.nombrePropuesto2
                      }
                    />
                    <ListSubtitle
                      text={
                        institucion?.ratificacionesNombre[0]?.nombrePropuesto3
                      }
                    />
                  </List>
                </Grid>
              </>
            )}
          </Grid>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <InputFile
                label="Biografía o Fundamento"
                tipoEntidad="RATIFICACION"
                tipoDocumento="BIOGRAFIA"
                id={institucion.id}
                url={urlBiografia}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <InputFile
                label="Bibliografía para fuente de consulta"
                tipoEntidad="RATIFICACION"
                tipoDocumento="BIBLIOGRAFIA"
                id={institucion.id}
                url={urlBibliografia}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <InputFile
                label="Acta Constitutiva"
                tipoEntidad="INSTITUCION"
                tipoDocumento="ACTA_CONSTITUTIVA"
                id={institucion.id}
                url={urlActaConstitutiva}
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} sx={{ mt: 2 }}>
        <NavigationButtons
          page={page}
          onNext={nextPage}
          onPrevious={prevPage}
          id={institucion.id}
        />
      </Grid>
    </Grid>
  );
}

InstitucionView.propTypes = {
  institucion: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
    valoresInstitucionales: PropTypes.string,
    rector: PropTypes.shape({
      persona: PropTypes.shape({
        nombre: PropTypes.string,
        apellidoPaterno: PropTypes.string,
        apellidoMaterno: PropTypes.string,
        celular: PropTypes.string,
        telefono: PropTypes.string,
        curp: PropTypes.string,
        correoPrimario: PropTypes.string,
      }),
    }),
    ratificacionesNombre: PropTypes.arrayOf(
      PropTypes.shape({
        nombrePropuesto1: PropTypes.string,
        nombrePropuesto2: PropTypes.string,
        nombrePropuesto3: PropTypes.string,
        nombreAutorizado: PropTypes.string,
        fechaAutorizacion: PropTypes.string,
        autoridad: PropTypes.string,
        esNombreAutorizado: PropTypes.bool,
      }),
    ),
  }).isRequired,
  session: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};
