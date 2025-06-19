import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import {
  ButtonFile,
  ButtonsForm,
  Context,
  DefaultModal,
  GetFile,
  Input,
  InputDate,
  LabelData,
  Layout,
  updateRecord,
} from '@siiges-ui/shared';
import { getSolicitudDetalles } from '@siiges-ui/solicitudes';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

const initialCheckboxes = {
  fda01: false,
  fda02: false,
  fda03: false,
  fda04: false,
  fda05: false,
  fda06: false,
};

export default function RecepcionFormatos() {
  const { session, setNoti, setLoading } = useContext(Context);
  const router = useRouter();
  const { query } = router;
  const [form, setForm] = useState({ estatusSolicitudId: 6 });
  const [errors, setErrors] = useState({});
  const [solicitud, setSolicitud] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [checkboxes, setCheckboxes] = useState({ ...initialCheckboxes });
  const [url, setUrl] = useState([null, null, null, null, null, null]);
  const fileData = [
    {
      entidadId: query.id,
      tipoEntidad: 'SOLICITUD',
      tipoDocumento: 'FDA01',
    },
    {
      entidadId: query.id,
      tipoEntidad: 'SOLICITUD',
      tipoDocumento: 'FDA02',
    },
    {
      entidadId: query.id,
      tipoEntidad: 'SOLICITUD',
      tipoDocumento: 'FDA03',
    },
    {
      entidadId: query.id,
      tipoEntidad: 'SOLICITUD',
      tipoDocumento: 'FDA04',
    },
    {
      entidadId: query.id,
      tipoEntidad: 'SOLICITUD',
      tipoDocumento: 'FDA05',
    },
    {
      entidadId: query.id,
      tipoEntidad: 'SOLICITUD',
      tipoDocumento: 'FDA06',
    },
  ];
  useEffect(() => {
    const fetchSolicitud = async () => {
      if (query.id !== undefined) {
        try {
          const solicitudData = await getSolicitudDetalles(
            query.id,
            session,
            setNoti,
          );
          setSolicitud(solicitudData.data);
          fileData.forEach((data, index) => {
            GetFile(data, (fileUrl, error) => {
              if (error) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  fileError: `Error fetching file: ${error}`,
                }));
                return;
              }

              setUrl((prevUrls) => {
                const newUrls = [...prevUrls];
                newUrls[index] = fileUrl;
                return newUrls;
              });
            });
          });
        } catch (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            solicitudError: `Error fetching solicitud: ${error}`,
          }));
        }
      }
    };

    fetchSolicitud();
  }, [query, session]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOnBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : '¡Este campo es obligatorio!',
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevForm) => ({
      ...prevForm,
      [name]: checked,
    }));
  };
  const allChecked = Object.values(checkboxes).every((value) => value);

  const downloadFile = async (type) => {
    try {
      const solicitudId = solicitud?.id;
      GetFile({
        tipoEntidad: 'SOLICITUD',
        entidadId: solicitudId,
        tipoDocumento: type,
      }, async (fileURL, error) => {
        if (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            fileDownloadError: `Error downloading the file: ${error}`,
          }));
          return;
        }
        if (!fileURL) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            fileDownloadError: 'File URL not provided',
          }));
          return;
        }

        window.open(fileURL, '_blank');
      });
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fileDownloadError: `Error calling GetFile: ${error}`,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const newErrors = {};
    if (!form.fechaRecepcion) {
      newErrors.fechaRecepcion = '¡Este campo es obligatorio!';
    }
    if (!form.oficioAdmisorio) {
      newErrors.oficioAdmisorio = '¡Este campo es obligatorio!';
    }

    if (Object.keys(newErrors).length === 0) {
      setOpenModal(false);
      try {
        const result = await updateRecord({
          data: form,
          endpoint: `/solicitudes/${query.id}`,
        });
        if (result.statusCode === 200) {
          setLoading(false);
          setNoti({
            open: true,
            message: '¡Éxito al actualizar la solicitud!',
            type: 'success',
          });
          downloadFile('OFICIO_ADMISORIO');
          router.back();
        } else {
          setLoading(false);
          setNoti({
            open: true,
            message: `¡Error al actualizar la solicitud!: ${result.message}`,
            type: 'error',
          });
        }
      } catch (error) {
        setLoading(false);
        setNoti({
          open: true,
          message: ` ${error.message}`,
          type: 'error',
        });
      }
    } else {
      setErrors(newErrors);
      setLoading(false);
      setNoti({
        open: true,
        message: '¡Algo salió mal, revise que los campos estén correctos!',
        type: 'error',
      });
    }
  };

  return (
    <Layout title="Recepción de formatos Administrativos">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Información de la solicitud</Typography>
        </Grid>
        <Grid item xs={3}>
          <LabelData title="Tipo de trámite" subtitle="Nueva solicitud" />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Fecha de recepción"
            subtitle={
              solicitud.fechaRecepcion
                ? new Date(solicitud.fechaRecepcion).toLocaleDateString(
                  'es-MX',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  },
                )
                : ''
            }
          />
        </Grid>

        <Grid item xs={3}>
          <LabelData title="Folio" subtitle={solicitud.folio || ''} />
        </Grid>
        <Grid item xs={3}>
          <LabelData title="RVOE" subtitle={solicitud.rvoe || ''} />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Nivel"
            subtitle={solicitud.programa?.nivelId || ''}
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Modalidad"
            subtitle={solicitud.programa?.modalidadId || ''}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Nombre"
            subtitle={solicitud.programa?.nombre || ''}
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData title="Periodo" subtitle="Semestral" />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Turno"
            subtitle={
              solicitud.programa?.programaTurnos
                ?.map((t) => t.turnoId)
                .join(', ') || ''
            }
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Clave de centro de trabajo"
            subtitle={solicitud.programa?.plantel?.claveCentroTrabajo || ''}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Calle"
            subtitle={solicitud.programa?.plantel?.domicilio?.calle || ''}
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Número"
            subtitle={
              solicitud.programa?.plantel?.domicilio?.numeroExterior || ''
            }
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Interior"
            subtitle={
              solicitud.programa?.plantel?.domicilio?.numeroInterior || ''
            }
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Colonia"
            subtitle={solicitud.programa?.plantel?.domicilio?.colonia || ''}
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="CP"
            subtitle={
              solicitud.programa?.plantel?.domicilio?.codigoPostal || ''
            }
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Municipio"
            subtitle={
              solicitud.programa?.plantel?.domicilio?.municipio?.nombre || ''
            }
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Institución"
            subtitle={solicitud.programa?.plantel?.institucion?.nombre || ''}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Fecha en que se dio de alta"
            subtitle={solicitud.programa?.plantel?.institucion?.createdAt || ''}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Representante Legal"
            subtitle={
              solicitud.programa?.plantel?.institucion?.representanteLegal || ''
            }
          />
        </Grid>
        <Grid item xs={6}>
          <LabelData
            title="Email"
            subtitle={solicitud.programa?.plantel?.correo1 || ''}
          />
        </Grid>
        <Grid item xs={3}>
          <LabelData
            title="Celular"
            subtitle={solicitud.programa?.plantel?.telefono1 || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Recepción de formatos Administrativos
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <FormGroup>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={7}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda01}
                      onChange={handleCheckboxChange}
                      name="fda01"
                    />
                  )}
                  label="FDA 01"
                />
              </Grid>
              <Grid item xs={5}>
                <ButtonFile url={url[0]}>FDA 01</ButtonFile>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={7}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda03}
                      onChange={handleCheckboxChange}
                      name="fda03"
                    />
                  )}
                  label="FDA 03"
                />
              </Grid>
              <Grid item xs={5}>
                <ButtonFile url={url[2]}>FDA 03</ButtonFile>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={7}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda05}
                      onChange={handleCheckboxChange}
                      name="fda05"
                    />
                  )}
                  label="FDA 05"
                />
              </Grid>
              <Grid item xs={5}>
                <ButtonFile url={url[4]}>FDA 05</ButtonFile>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={3}>
          <FormGroup>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={7}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda02}
                      onChange={handleCheckboxChange}
                      name="fda02"
                    />
                  )}
                  label="FDA 02"
                />
              </Grid>
              <Grid item xs={5}>
                <ButtonFile url={url[1]}>FDA 02</ButtonFile>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={7}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda04}
                      onChange={handleCheckboxChange}
                      name="fda04"
                    />
                  )}
                  label="FDA 04"
                />
              </Grid>
              <Grid item xs={5}>
                <ButtonFile url={url[3]}>FDA 04</ButtonFile>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={7}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda06}
                      onChange={handleCheckboxChange}
                      name="fda06"
                    />
                  )}
                  label="FDA 06"
                />
              </Grid>
              <Grid item xs={5}>
                <ButtonFile url={url[5]}>FDA 06</ButtonFile>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm
            cancel={() => {
              router.back();
            }}
            confirm={() => {
              setOpenModal(true);
            }}
            confirmDisabled={!allChecked}
          />
        </Grid>
      </Grid>
      <DefaultModal
        open={openModal}
        setOpen={setOpenModal}
        title="Recepción de documentos"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputDate
              name="fechaRecepcion"
              label="Fecha de recepción de la solicitud"
              value=""
              type="datetime"
              onChange={handleInputChange}
              onblur={handleOnBlur}
              errorMessage={errors.fechaRecepcion}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="oficioAdmisorio"
              id="oficioAdmisorio"
              label="Número de oficio admisorio"
              value=""
              onChange={handleInputChange}
              onblur={handleOnBlur}
              errorMessage={errors.oficioAdmisorio}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonsForm
              cancel={() => {
                setOpenModal(false);
              }}
              confirm={handleSubmit}
            />
          </Grid>
        </Grid>
      </DefaultModal>
    </Layout>
  );
}
