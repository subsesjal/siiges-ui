import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  IconButton,
  Box,
  Collapse,
  CircularProgress,
} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import BadgeIcon from '@mui/icons-material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Context, getData } from '@siiges-ui/shared';

export default function ModalFirmaElectronica({
  open,
  onClose,
  onConfirm,
  title,
  solicitudFolioAlumnoId,
  disabled,
}) {
  const { setNoti } = useContext(Context);
  const [certificado, setCertificado] = useState(null);
  const [llavePrivada, setLlavePrivada] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDatosAlumno, setShowDatosAlumno] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [scriptsLoading, setScriptsLoading] = useState(false);

  const [datosAlumno, setDatosAlumno] = useState(null);
  const [loadingDatos, setLoadingDatos] = useState(false);

  const fetchDatosAlumno = async () => {
    if (!solicitudFolioAlumnoId) return;

    setLoadingDatos(true);
    try {
      const response = await getData({
        endpoint: `/solicitudesFolios/solicitudesFoliosAlumnos/${solicitudFolioAlumnoId}`,
      });

      if (response.data) {
        setDatosAlumno(response.data);
      }
    } catch (error) {
      setNoti({
        open: true,
        message: 'Error al obtener los datos del alumno',
        type: 'error',
      });
    } finally {
      setLoadingDatos(false);
    }
  };

  const loadSeguriSignScripts = async () => {
    if (typeof window.pkcs7FromContent === 'function') {
      setScriptsLoaded(true);
      return;
    }

    setScriptsLoading(true);

    try {
      const scripts = [
        '/org/pkijs/common.js',
        '/org/pkijs/asn1.js',
        '/org/pkijs/x509_schema.js',
        '/org/pkijs/x509_simpl.js',
        '/org/pkijs/cms_schema.js',
        '/org/pkijs/cms_simpl.js',
        '/org/cryptojs/tripledes.js',
        '/org/sgdatajs/pkcs8_wp52_schema.js',
        '/org/sgdatajs/pkcs8_wp52_simpl.js',
        '/org/forge/forge.min.js',
        '/org/sgdatajs/SDSgLib_PBKDF2.js',
        '/org/sgdatajs/SDSgLib_PKCS8.js',
        '/org/sgdatajs/SDSgLib_PKCS7.js',
        '/org/sgdatajs/SgDataCrypto.js',
      ];

      const loadScript = (scriptSrc) => new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = scriptSrc;
        script.type = 'text/javascript';
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Error cargando ${scriptSrc}`));
        document.head.appendChild(script);
      });

      await scripts.reduce(
        (promise, scriptSrc) => promise.then(() => loadScript(scriptSrc)),
        Promise.resolve(),
      );

      setScriptsLoaded(true);
    } catch (err) {
      setNoti({
        open: true,
        message: `Error al cargar librerías criptográficas: ${err.message}`,
        type: 'error',
      });
    } finally {
      setScriptsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      if (!scriptsLoaded && !scriptsLoading) {
        loadSeguriSignScripts();
      }
      if (solicitudFolioAlumnoId && !datosAlumno) {
        fetchDatosAlumno();
      }
    }
  }, [open, solicitudFolioAlumnoId]);

  const construirObjetoPorFirmar = () => {
    if (!datosAlumno) return null;

    const {
      alumno,
      folioDocumentoAlumno,
      tipoDocumento,
      tipoSolicitudFolio,
    } = datosAlumno;
    const persona = alumno?.persona;
    const programa = alumno?.programa;
    const plantel = programa?.plantel;
    const domicilio = plantel?.domicilio;

    const direccionPartes = [
      domicilio?.calle,
      domicilio?.numero_exterior ? `No. ${domicilio.numero_exterior}` : null,
      domicilio?.numero_interior ? `Int. ${domicilio.numero_interior}` : null,
      domicilio?.colonia ? `Col. ${domicilio.colonia}` : null,
    ].filter(Boolean);

    return {
      folioInterno: folioDocumentoAlumno?.folioDocumento || '',
      foja: datosAlumno?.foja || 0,
      libro: datosAlumno?.libro || 0,
      tipoDocumento,
      tipoSolicitudFolio: tipoSolicitudFolio || '',
      nombre: persona?.nombre || '',
      apellidoPaterno: persona?.apellidoPaterno || '',
      apellidoMaterno: persona?.apellidoMaterno || '',
      curp: persona?.curp || '',
      programa: {
        rvoe: programa?.acuerdo_rvoe || '',
        nombre: programa?.nombre || '',
        nivel: programa?.nivel?.nombre || '',
      },
      institucion: {
        nombre: plantel?.institucion?.nombre || '',
        plantel: {
          cct: plantel?.clave_centro_trabajo || '',
          direccion: direccionPartes.join(', '),
        },
      },
    };
  };

  const arrayBufferToString = (buffer) => {
    let result = '';
    const view = new Uint8Array(buffer);
    for (let i = 0; i < view.length; i += 1) {
      result += String.fromCharCode(view[i]);
    }
    return result;
  };

  const readFileAsArrayBuffer = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsArrayBuffer(file);
  });

  const generarPKCS7 = async (certFile, keyFile, pass, dataToSign) => {
    const certificateBuffer = await readFileAsArrayBuffer(certFile);
    const privateKeyBuffer = await readFileAsArrayBuffer(keyFile);

    const privateKeyBufferString = arrayBufferToString(privateKeyBuffer);
    const pKey = privateKeyBufferString.replace(/(-----(BEGIN|END) PRIVATE KEY-----|\r\n|\n)/g, '');

    let cipheredKey;
    if (pKey.charAt(0) === 'M') {
      cipheredKey = window.atob(pKey);
    } else {
      cipheredKey = privateKeyBufferString;
    }

    const certKeyBufferString = arrayBufferToString(certificateBuffer);
    const pCert = certKeyBufferString.replace(/(-----(BEGIN|END) CERTIFICATE-----|\r\n|\n)/g, '');

    let certKey;
    if (pCert.charAt(0) === 'M') {
      certKey = window.atob(pCert);
    } else {
      certKey = certKeyBufferString;
    }

    if (typeof window.pkcs7FromContent !== 'function') {
      throw new Error('La función pkcs7FromContent no está disponible');
    }

    const pkcs7Result = await window.pkcs7FromContent(
      pass,
      cipheredKey,
      certKey,
      'SHA-256',
      dataToSign,
      false,
    );

    const b64PKCS7Message = window.btoa(arrayBufferToString(pkcs7Result));

    return b64PKCS7Message;
  };

  const handleCertificadoChange = (files) => {
    if (files && files.length > 0) {
      setCertificado(files[0]);
    }
  };

  const handleLlavePrivadaChange = (files) => {
    if (files && files.length > 0) {
      setLlavePrivada(files[0]);
    }
  };

  const handleRemoveCertificado = () => {
    setCertificado(null);
  };

  const handleRemoveLlavePrivada = () => {
    setLlavePrivada(null);
  };

  const handleToggleDatosAlumno = () => {
    setShowDatosAlumno(!showDatosAlumno);
  };

  const handleCancel = () => {
    setCertificado(null);
    setLlavePrivada(null);
    setPassword('');
    setShowDatosAlumno(false);
    setDatosAlumno(null);
    onClose();
  };

  const handleConfirm = async () => {
    if (!certificado) {
      setNoti({
        open: true,
        message: 'Debe seleccionar un archivo de certificado (.cer)',
        type: 'error',
      });
      return;
    }

    if (!llavePrivada) {
      setNoti({
        open: true,
        message: 'Debe seleccionar un archivo de llave privada (.key)',
        type: 'error',
      });
      return;
    }

    if (!password || password.trim() === '') {
      setNoti({
        open: true,
        message: 'Debe ingresar la contraseña de la llave privada',
        type: 'error',
      });
      return;
    }

    if (!scriptsLoaded) {
      setNoti({
        open: true,
        message: 'Las librerías criptográficas aún se están cargando',
        type: 'error',
      });
      return;
    }

    if (!datosAlumno) {
      setNoti({
        open: true,
        message: 'Los datos del alumno aún se están cargando',
        type: 'error',
      });
      return;
    }

    if (typeof window.isWCAPISupported === 'function' && !window.isWCAPISupported()) {
      setNoti({
        open: true,
        message: 'Tu navegador no soporta la API Web Crypto necesaria',
        type: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      const objetoPorFirmar = construirObjetoPorFirmar();

      if (!objetoPorFirmar.tipoDocumento) {
        throw new Error('El tipo de documento no está disponible en los datos del alumno');
      }

      if (!objetoPorFirmar.folioInterno) {
        throw new Error('El folio interno no está disponible en los datos del alumno');
      }

      const jsonString = JSON.stringify(objetoPorFirmar);

      const pkcs7Base64 = await generarPKCS7(
        certificado,
        llavePrivada,
        password,
        jsonString,
      );

      await onConfirm({
        pkcs7: pkcs7Base64,
        objetoPorFirmar,
      });

      setCertificado(null);
      setLlavePrivada(null);
      setPassword('');
      setShowDatosAlumno(false);
      setDatosAlumno(null);
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || 'Error al procesar la firma',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const persona = datosAlumno?.alumno?.persona;
  const programa = datosAlumno?.alumno?.programa;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '12px' },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <LockIcon color="primary" />
          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 3 }}>
        {scriptsLoading && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mb: 2,
              p: 2,
              backgroundColor: '#fff3e0',
              borderRadius: '8px',
            }}
          >
            <CircularProgress size={20} />
            <Typography variant="body2">
              Cargando librerías criptográficas...
            </Typography>
          </Box>
        )}

        {loadingDatos && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mb: 2,
              p: 2,
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
            }}
          >
            <CircularProgress size={20} />
            <Typography variant="body2">
              Cargando datos del alumno...
            </Typography>
          </Box>
        )}

        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1.5,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <BadgeIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
              Certificado (.cer)
            </Typography>
            {datosAlumno && (
              <IconButton
                size="small"
                onClick={handleToggleDatosAlumno}
                sx={{ color: 'primary.main' }}
              >
                {showDatosAlumno ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            )}
          </Box>

          {datosAlumno && (
            <Collapse in={showDatosAlumno}>
              <Box
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  p: 2,
                  mb: 2,
                  backgroundColor: '#fafafa',
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  Datos del alumno
                </Typography>
                <Grid container spacing={1}>
                  {datosAlumno?.folioDocumentoAlumno?.folioDocumento && (
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Folio asignado
                      </Typography>
                      <Typography variant="body2">
                        {datosAlumno.folioDocumentoAlumno.folioDocumento}
                      </Typography>
                    </Grid>
                  )}
                  {programa?.acuerdo_rvoe && (
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        RVOE
                      </Typography>
                      <Typography variant="body2">{programa.acuerdo_rvoe}</Typography>
                    </Grid>
                  )}
                  {datosAlumno?.alumno?.matricula && (
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Matrícula
                      </Typography>
                      <Typography variant="body2">{datosAlumno.alumno.matricula}</Typography>
                    </Grid>
                  )}
                  {persona?.nombre && (
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Nombre
                      </Typography>
                      <Typography variant="body2">{persona.nombre}</Typography>
                    </Grid>
                  )}
                  {persona?.apellidoPaterno && (
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Apellido Paterno
                      </Typography>
                      <Typography variant="body2">{persona.apellidoPaterno}</Typography>
                    </Grid>
                  )}
                  {persona?.apellidoMaterno && (
                    <Grid item xs={6}>
                      <Typography variant="caption" color="textSecondary">
                        Apellido Materno
                      </Typography>
                      <Typography variant="body2">{persona.apellidoMaterno}</Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Collapse>
          )}

          {certificado ? (
            <Box
              sx={{
                border: '1px solid #4caf50',
                borderRadius: '8px',
                p: 2,
                backgroundColor: '#f1f8e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleIcon color="success" />
                <Typography variant="body2">{certificado.name}</Typography>
              </Box>
              <IconButton
                size="small"
                onClick={handleRemoveCertificado}
                disabled={loading}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <DropzoneArea
              onChange={handleCertificadoChange}
              acceptedFiles={['.cer']}
              filesLimit={1}
              maxFileSize={5000000}
              showPreviews={false}
              showPreviewsInDropzone={false}
              showFileNames
              dropzoneText="Arrastre el certificado aquí o haga clic"
              showAlerts={false}
            />
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold',
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <VpnKeyIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
            Llave privada (.key)
          </Typography>
          {llavePrivada ? (
            <Box
              sx={{
                border: '1px solid #4caf50',
                borderRadius: '8px',
                p: 2,
                backgroundColor: '#f1f8e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleIcon color="success" />
                <Typography variant="body2">{llavePrivada.name}</Typography>
              </Box>
              <IconButton
                size="small"
                onClick={handleRemoveLlavePrivada}
                disabled={loading}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <DropzoneArea
              onChange={handleLlavePrivadaChange}
              acceptedFiles={['.key']}
              filesLimit={1}
              maxFileSize={5000000}
              showPreviews={false}
              showPreviewsInDropzone={false}
              showFileNames
              dropzoneText="Arrastre la llave privada aquí o haga clic"
              showAlerts={false}
            />
          )}
        </Box>

        {/* Contraseña */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold',
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LockIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
            Contraseña de la llave privada
          </Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="Ingrese la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            size="small"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleCancel} disabled={loading} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={loading || disabled || scriptsLoading || loadingDatos}
          variant="contained"
          color="primary"
        >
          {loading ? 'Firmando...' : 'Firmar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ModalFirmaElectronica.defaultProps = {
  title: 'Firma Electrónica',
  solicitudFolioAlumnoId: null,
  disabled: false,
};

ModalFirmaElectronica.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  solicitudFolioAlumnoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
};
