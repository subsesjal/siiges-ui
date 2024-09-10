import {
  Grid, Typography, Divider,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
  SnackAlert, GetFile, Input, InputFile, ButtonStyled,
} from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function InstitucionFields({
  handleOnChange,
  handleOnBlur,
  institucion,
  setLoading,
  setForm,
  setError,
  errors,
  form,
  accion,
  page,
  setPage,
}) {
  const router = useRouter();
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });

  const [urlBiografia, setUrlBiografia] = useState();
  const [urlBibliografia, setUrlBibliografia] = useState();
  const [urlActaConstitutiva, setUrlActaConstitutiva] = useState();

  useEffect(() => {
    if (accion === 'editar') {
      const fetchFiles = async () => {
        setLoading(true);
        GetFile(
          {
            entidadId: institucion.id,
            tipoEntidad: 'RATIFICACION',
            tipoDocumento: 'BIOGRAFIA',
          },
          (url, error) => {
            if (error) {
              setNoti({
                open: true,
                message: 'Error al cargar el archivo de biografía',
                type: 'error',
              });
            } else {
              setUrlBiografia(url);
            }
          },
        );
        GetFile(
          {
            entidadId: institucion.id,
            tipoEntidad: 'RATIFICACION',
            tipoDocumento: 'BIBLIOGRAFIA',
          },
          (url, error) => {
            if (error) {
              setNoti({
                open: true,
                message: 'Error al cargar el archivo de bibliografía',
                type: 'error',
              });
            } else {
              setUrlBibliografia(url);
            }
          },
        );
        GetFile(
          {
            entidadId: institucion.id,
            tipoEntidad: 'INSTITUCION',
            tipoDocumento: 'ACTA_CONSTITUTIVA',
          },
          (url, error) => {
            if (error) {
              setNoti({
                open: true,
                message: 'Error al cargar el archivo de acta constitutiva',
                type: 'error',
              });
            } else {
              setUrlActaConstitutiva(url);
            }
            setLoading(false);
          },
        );
      };

      fetchFiles();
    }
  }, [accion, institucion.id, setLoading]);

  const handleFileLoaded = (index, url) => {
    setForm((prevForm) => {
      const updatedForm = [...prevForm];
      updatedForm[index] = url;
      return updatedForm;
    });
  };

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  const ratificacionesNombre = institucion?.ratificacionesNombre ?? [{}];

  return (
    <>
      <Grid container spacing={2}>
        {page === 1 && (
          <>
            <Grid item xs={11.5} sx={{ marginLeft: 10 }}>
              <Typography variant="h6" sx={{ mt: 5 }}>
                Datos Generales
              </Typography>
              <Divider sx={{ mt: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={11}>
                  <Input
                    label="Nombre de Institución"
                    id="nombreInstitucion"
                    name="nombreInstitucion"
                    required
                    onchange={(e) => handleOnChange(e, { form, setForm })}
                    onblur={(e) => handleOnBlur(e, { form, setError })}
                    errorMessage={errors.nombreInstitucion}
                    value={institucion?.nombre}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Input
                    label="Razón social"
                    id="razonSocial"
                    name="razonSocial"
                    required
                    onchange={(e) => handleOnChange(e, { form, setForm })}
                    onblur={(e) => handleOnBlur(e, { form, setError })}
                    errorMessage={errors.razonSocial}
                    value={institucion?.razonSocial}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Input
                    id="historia"
                    name="historia"
                    label="Historia de la institución"
                    required
                    rows={4}
                    multiline
                    sx={{ width: '100%' }}
                    onchange={(e) => handleOnChange(e, { form, setForm })}
                    onblur={(e) => handleOnBlur(e, { form, setError })}
                    errorMessage={errors.historia}
                    value={institucion?.historia}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Input
                    id="vision"
                    name="vision"
                    label="Visión"
                    required
                    rows={4}
                    multiline
                    sx={{ width: '100%' }}
                    onchange={(e) => handleOnChange(e, { form, setForm })}
                    onblur={(e) => handleOnBlur(e, { form, setError })}
                    errorMessage={errors.vision}
                    value={institucion?.vision}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Input
                    id="mision"
                    name="mision"
                    label="Misión"
                    required
                    rows={4}
                    multiline
                    sx={{ width: '100%' }}
                    onchange={(e) => handleOnChange(e, { form, setForm })}
                    onblur={(e) => handleOnBlur(e, { form, setError })}
                    errorMessage={errors.mision}
                    value={institucion?.mision}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Input
                    id="valoresInstitucionales"
                    name="valoresInstitucionales"
                    label="Valores Institucionales"
                    required
                    rows={4}
                    multiline
                    sx={{ width: '100%' }}
                    onchange={(e) => handleOnChange(e, { form, setForm })}
                    onblur={(e) => handleOnBlur(e, { form, setError })}
                    errorMessage={errors.valoresInstitucionales}
                    value={institucion?.valoresInstitucionales}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'right', mt: 6 }}>
              <ButtonStyled
                text={<ArrowForwardIosIcon sx={{ height: 14 }} />}
                alt={<ArrowForwardIosIcon sx={{ height: 14 }} />}
                type="success"
                onclick={nextPage}
              />
            </Grid>
          </>
        )}

        {page === 2 && (
          <>
            <Typography variant="h6" sx={{ mt: 5 }}>
              Datos del Rector
            </Typography>
            <Divider sx={{ mt: 1 }} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Input
                  label="Nombre(s)"
                  id="nombreRector"
                  name="nombreRector"
                  required
                  onchange={(e) => handleOnChange(e, { form, setForm })}
                  onblur={(e) => handleOnBlur(e, { form, setError })}
                  errorMessage={errors.nombreRector}
                  value={institucion?.rector?.persona?.nombre}
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  label="Primer Apellido"
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  required
                  onchange={(e) => handleOnChange(e, { form, setForm })}
                  onblur={(e) => handleOnBlur(e, { form, setError })}
                  errorMessage={errors.apellidoPaterno}
                  value={institucion?.rector?.persona?.apellidoPaterno}
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  label="Segundo Apellido"
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  auto="apellidoMaterno"
                  required
                  onchange={(e) => handleOnChange(e, { form, setForm })}
                  onblur={(e) => handleOnBlur(e, { form, setError })}
                  errorMessage={errors.apellidoMaterno}
                  value={institucion?.rector?.persona?.apellidoMaterno}
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  label="Celular"
                  id="celular"
                  name="celular"
                  auto="celular"
                  onchange={(e) => handleOnChange(e, { form, setForm })}
                  onBlur={(e) => handleOnBlur(e, { form, setError })}
                  errorMessage={errors.celular}
                  value={institucion?.rector?.persona?.celular}
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  label="Teléfono"
                  id="telefono"
                  name="telefono"
                  auto="telefono"
                  onchange={(e) => handleOnChange(e, { form, setForm })}
                  onBlur={(e) => handleOnBlur(e, { form, setError })}
                  errorMessage={errors.telefono}
                  value={institucion?.rector?.persona?.telefono}
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  label="CURP"
                  id="curp"
                  name="curp"
                  auto="curp"
                  onchange={(e) => handleOnChange(e, { form, setForm })}
                  onblur={(e) => handleOnBlur(e, { form, setError })}
                  errorMessage={errors.curp}
                  value={institucion?.rector?.persona?.curp}
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  label="Correo electrónico"
                  id="correoPrimario"
                  name="correoPrimario"
                  auto="correoPrimario"
                  onchange={(e) => handleOnChange(e, { form, setForm })}
                  onblur={(e) => handleOnBlur(e, { form, setError })}
                  errorMessage={errors.correoPrimario}
                  value={institucion?.rector?.persona?.correoPrimario}
                />
              </Grid>
            </Grid>
            <Typography variant="h6" sx={{ mt: 5 }}>
              Ratificación de Nombre
            </Typography>
            <Divider sx={{ mt: 1 }} />
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <Input
                  label="Nombre propuesto 1"
                  id="nombrePropuesto1"
                  name="nombrePropuesto1"
                  required
                  onchange={(e) => handleOnChange(e, { form, setForm })}
                  onblur={(e) => handleOnBlur(e, { form, setError })}
                  errorMessage={errors.nombrePropuesto1}
                  value={ratificacionesNombre[0]?.nombrePropuesto1 || ''}
                />
              </Grid>
              <Grid item xs={11}>
                <Input
                  label="Nombre propuesto 2"
                  id="nombrePropuesto2"
                  name="nombrePropuesto2"
                  required
                  onchange={(e) => handleOnChange(e, { form, setForm })}
                  onblur={(e) => handleOnBlur(e, { form, setError })}
                  errorMessage={errors.nombrePropuesto2}
                  value={ratificacionesNombre[0]?.nombrePropuesto2 || ''}
                />
              </Grid>
              <Grid item xs={11}>
                <Input
                  label="Nombre propuesto 3"
                  id="nombrePropuesto3"
                  name="nombrePropuesto3"
                  required
                  onchange={(e) => handleOnChange(e, { form, setForm })}
                  onblur={(e) => handleOnBlur(e, { form, setError })}
                  errorMessage={errors.nombrePropuesto3}
                  value={ratificacionesNombre[0]?.nombrePropuesto3 || ''}
                />
              </Grid>
              {accion === 'editar' && (
                <>
                  <Grid item xs={11}>
                    <InputFile
                      label="Biografía o Fundamento"
                      tipoEntidad="RATIFICACION"
                      tipoDocumento="BIOGRAFIA"
                      id={router.query.institucionId || institucion.id}
                      url={urlBiografia}
                      setUrl={setUrlBiografia}
                      setLoaded={(url) => handleFileLoaded(0, url)}
                      disabled={false}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <InputFile
                      label="Bibliografía para fuente de consulta"
                      tipoEntidad="RATIFICACION"
                      tipoDocumento="BIBLIOGRAFIA"
                      id={router.query.institucionId || institucion.id}
                      url={urlBibliografia}
                      setUrl={setUrlBibliografia}
                      setLoaded={(url) => handleFileLoaded(1, url)}
                      disabled={false}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <InputFile
                      label="Acta Constitutiva"
                      tipoEntidad="INSTITUCION"
                      tipoDocumento="ACTA_CONSTITUTIVA"
                      id={router.query.institucionId || institucion.id}
                      url={urlActaConstitutiva}
                      setUrl={setUrlActaConstitutiva}
                      setLoaded={(url) => handleFileLoaded(2, url)}
                      disabled={false}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'right', mt: 6 }}>
              <ButtonStyled
                text={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
                alt={<ArrowBackIosNewIcon sx={{ height: 14 }} />}
                type="success"
                onclick={prevPage}
              />
            </Grid>
          </>
        )}
      </Grid>

      <SnackAlert
        open={noti.open}
        close={() => setNoti(false)}
        type={noti.type}
        mensaje={noti.message}
      />
    </>
  );
}

InstitucionFields.defaultProps = {
  institucion: {} || null,
};

InstitucionFields.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  accion: PropTypes.string.isRequired,
  form: PropTypes.shape({
    nombreInstitucion: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
    valoresInstitucionales: PropTypes.string,
    nombrePropuesto1: PropTypes.string,
    nombrePropuesto2: PropTypes.string,
    nombrePropuesto3: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    nombreInstitucion: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
    valoresInstitucionales: PropTypes.string,
    apellidoPaterno: PropTypes.string,
    apellidoMaterno: PropTypes.string,
    celular: PropTypes.string,
    telefono: PropTypes.string,
    curp: PropTypes.string,
    correoPrimario: PropTypes.string,
    nombreRector: PropTypes.string,
    nombrePropuesto1: PropTypes.string,
    nombrePropuesto2: PropTypes.string,
    nombrePropuesto3: PropTypes.string,
  }).isRequired,
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
        esNombreAutorizado: PropTypes.bool,
      }),
    ),
  }),
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
