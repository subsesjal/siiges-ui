import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography,
  IconButton, Box, CircularProgress, LinearProgress,
} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import BadgeIcon from '@mui/icons-material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';
import { getData, updateRecord, useUI } from '@siiges-ui/shared';
import forge from 'node-forge';

export default function ModalFirmaElectronica({
  open,
  onClose,
  onConfirm,
  title,
  alumnosData,
  solicitudData,
  disabled,
}) {
  const { setNoti } = useUI();
  const [certificado, setCertificado] = useState(null);
  const [llavePrivada, setLlavePrivada] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [scriptsLoading, setScriptsLoading] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [firmando, setFirmando] = useState(false);
  const [datosCertificado, setDatosCertificado] = useState(null);
  const CERT_NAME = process.env.NEXT_PUBLIC_CERT_NAME;

  const extraerDatosCertificado = (certFile) => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const arrayBuffer = event.target.result;
        const bytes = new Uint8Array(arrayBuffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i += 1) {
          binary += String.fromCharCode(bytes[i]);
        }

        const forgeBuffer = forge.util.createBuffer(binary);

        let cert;
        try {
          const asn1 = forge.asn1.fromDer(forgeBuffer);
          cert = forge.pki.certificateFromAsn1(asn1);
        } catch (derError) {
          cert = forge.pki.certificateFromPem(binary);
        }

        const atributos = cert.subject.attributes;

        const cnField = atributos.find((attr) => attr.type === '2.5.4.3');
        const nombreCompleto = cnField?.value || '';

        const curpField = atributos.find((attr) => attr.type === '2.5.4.5');
        const curp = curpField?.value || '';

        resolve({
          nombre: nombreCompleto,
          curp,
          serie: cert.serialNumber,
          vencimiento: cert.validity.notAfter,
          emisor: cert.issuer.getField('CN')?.value || '',
        });
      } catch (err) {
        reject(new Error(`Error al leer el certificado: ${err.message}`));
      }
    };

    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsArrayBuffer(certFile);
  });

  const validarRepresentante = async (curp) => {
    const response = await getData({
      endpoint: `/solicitudesFolios/representantes-legales/${encodeURIComponent(curp)}`,
    });

    if (response.statusCode === 404 || response.errorMessage === '¡Registro no encontrado!') {
      throw new Error('No se encontró un representante legal activo con el CURP proporcionado.');
    }
    if (response.statusCode === 400) {
      throw new Error('El formato del CURP es inválido.');
    }
    if (response.statusCode === 401) {
      throw new Error('No autorizado para consultar representantes legales.');
    }
    if (response.errorMessage) {
      throw new Error(response.errorMessage);
    }

    const { data } = response;
    const nombreFirmante = [data.nombre, data.primerApellido, data.segundoApellido]
      .filter(Boolean)
      .join(' ');

    return nombreFirmante;
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
    if (open && !scriptsLoaded && !scriptsLoading) {
      loadSeguriSignScripts();
    }
  }, [open]);

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

  const generarPKCS7 = async (cipheredKey, certKey, pass, dataToSign) => {
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

    return window.btoa(arrayBufferToString(pkcs7Result));
  };

  const construirObjetoPorFirmar = (alumno) => {
    const { programa } = solicitudData;
    const { plantel } = programa;
    const { domicilio } = plantel;
    const { persona } = alumno.alumno;
    const { folioDocumentoAlumno } = alumno;

    const direccionPartes = [
      domicilio?.calle,
      domicilio?.numeroExterior ? `No. ${domicilio.numeroExterior}` : null,
      domicilio?.numeroInterior ? `Int. ${domicilio.numeroInterior}` : null,
      domicilio?.colonia ? `Col. ${domicilio.colonia}` : null,
    ].filter(Boolean);

    return {
      folioInterno: folioDocumentoAlumno?.folioDocumento,
      foja: folioDocumentoAlumno?.foja?.nombre,
      libro: folioDocumentoAlumno?.libro?.nombre,
      tipoDocumento: CERT_NAME,
      tipoSolicitudFolio: solicitudData.tipoSolicitudFolio?.nombre,
      nombre: persona?.nombre,
      apellidoPaterno: persona?.apellidoPaterno,
      apellidoMaterno: persona?.apellidoMaterno,
      curp: persona?.curp,
      programa: {
        rvoe: programa?.acuerdoRvoe,
        nombre: programa?.nombre,
        nivel: programa?.nivelId,
      },
      institucion: {
        nombre: plantel?.institucion?.nombre,
        plantel: {
          cct: plantel?.claveCentroTrabajo,
          direccion: direccionPartes.join(', '),
        },
      },
    };
  };

  const handleCertificadoChange = async (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      setCertificado(file);

      try {
        const datos = await extraerDatosCertificado(file);
        setDatosCertificado(datos);
      } catch (error) {
        setNoti({
          open: true,
          message: error.message,
          type: 'error',
        });
        setDatosCertificado(null);
      }
    }
  };

  const handleLlavePrivadaChange = (files) => {
    if (files && files.length > 0) {
      setLlavePrivada(files[0]);
    }
  };

  const handleRemoveCertificado = () => {
    setCertificado(null);
    setDatosCertificado(null);
  };

  const handleRemoveLlavePrivada = () => {
    setLlavePrivada(null);
  };

  const handleCancel = () => {
    setCertificado(null);
    setLlavePrivada(null);
    setPassword('');
    setProgreso(0);
    setFirmando(false);
    setDatosCertificado(null);
    onClose();
  };

  const handleConfirm = async () => {
    if (!certificado) {
      setNoti({ open: true, message: 'Debe seleccionar un archivo de certificado (.cer)', type: 'error' });
      return;
    }
    if (!llavePrivada) {
      setNoti({ open: true, message: 'Debe seleccionar un archivo de llave privada (.key)', type: 'error' });
      return;
    }
    if (!password || password.trim() === '') {
      setNoti({ open: true, message: 'Debe ingresar la contraseña de la llave privada', type: 'error' });
      return;
    }
    if (!scriptsLoaded) {
      setNoti({ open: true, message: 'Las librerías criptográficas aún se están cargando', type: 'error' });
      return;
    }
    if (!alumnosData || alumnosData.length === 0) {
      setNoti({ open: true, message: 'No hay alumnos para firmar', type: 'error' });
      return;
    }
    if (!datosCertificado || !datosCertificado.curp || !datosCertificado.nombre) {
      setNoti({ open: true, message: 'No se pudieron extraer los datos del firmante del certificado', type: 'error' });
      return;
    }
    if (!solicitudData || !solicitudData.id) {
      setNoti({ open: true, message: 'No se pudo cargar la información de la solicitud', type: 'error' });
      return;
    }
    if (typeof window.isWCAPISupported === 'function' && !window.isWCAPISupported()) {
      setNoti({ open: true, message: 'Tu navegador no soporta la API Web Crypto necesaria', type: 'error' });
      return;
    }

    setLoading(true);
    setFirmando(true);
    setProgreso(0);

    try {
      const nombreFirmante = await validarRepresentante(datosCertificado.curp);

      const certificateBuffer = await readFileAsArrayBuffer(certificado);
      const privateKeyBuffer = await readFileAsArrayBuffer(llavePrivada);

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

      const documentosPayload = [];
      const totalAlumnos = alumnosData.length;

      for (let i = 0; i < totalAlumnos; i += 1) {
        const alumno = alumnosData[i];
        const objetoPorFirmar = construirObjetoPorFirmar(alumno);
        const jsonString = JSON.stringify(objetoPorFirmar);

        // eslint-disable-next-line no-await-in-loop
        const pkcs7Base64 = await generarPKCS7(cipheredKey, certKey, password, jsonString);

        documentosPayload.push({
          pkcs7: pkcs7Base64,
          folioInterno: objetoPorFirmar.folioInterno,
          objetoPorFirmar,
          tipoDocumento: CERT_NAME,
          autoridad: {
            tipoFirmante: 'ies',
            cargoFirmante: 'director',
            curp: datosCertificado.curp,
            nombre: nombreFirmante,
          },
        });

        setProgreso(Math.round(((i + 1) / totalAlumnos) * 100));
      }

      const resultados = await onConfirm(documentosPayload);

      const hayResultados = resultados.length > 0;
      const todosExitosos = hayResultados
        && resultados.every((r) => r.estatusFirmado === 'exitoso');

      const estatusActual = solicitudData.estatusSolicitudFolioId;

      let nuevoEstatusId = null;
      if (estatusActual === 3 || estatusActual === 6) {
        nuevoEstatusId = todosExitosos ? 7 : 6;
      }

      if (nuevoEstatusId) {
        await updateRecord({
          endpoint: `/solicitudesFolios/${solicitudData.id}`,
          data: { estatusSolicitudFolioId: nuevoEstatusId },
        });
      }

      setCertificado(null);
      setLlavePrivada(null);
      setPassword('');
      setProgreso(0);
      setFirmando(false);
      setDatosCertificado(null);
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || 'Error al procesar la firma',
        type: 'error',
      });
      setFirmando(false);
    } finally {
      setLoading(false);
    }
  };

  const totalAlumnos = alumnosData?.length || 0;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: '12px' } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <LockIcon color="primary" />
          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 3 }}>
        {scriptsLoading && (
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2, p: 2, backgroundColor: '#fff3e0', borderRadius: '8px',
          }}
          >
            <CircularProgress size={20} />
            <Typography variant="body2">Cargando librerías criptográficas...</Typography>
          </Box>
        )}

        <Box sx={{
          mb: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: '8px',
        }}
        >
          <Typography variant="body2" color="primary" fontWeight="bold">
            {`Se firmarán ${totalAlumnos} documento(s)`}
          </Typography>
        </Box>

        {firmando && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>
              {`Generando firmas... ${progreso}%`}
            </Typography>
            <LinearProgress variant="determinate" value={progreso} />
          </Box>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold', mb: 1.5, display: 'flex', alignItems: 'center',
            }}
          >
            <BadgeIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
            Certificado (.cer)
          </Typography>

          {certificado ? (
            <Box sx={{
              border: '1px solid #4caf50', borderRadius: '8px', p: 2, backgroundColor: '#f1f8e9', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleIcon color="success" />
                <Typography variant="body2">{certificado.name}</Typography>
              </Box>
              <IconButton size="small" onClick={handleRemoveCertificado} disabled={loading}>
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
              fontWeight: 'bold', mb: 1.5, display: 'flex', alignItems: 'center',
            }}
          >
            <VpnKeyIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
            Llave privada (.key)
          </Typography>

          {llavePrivada ? (
            <Box sx={{
              border: '1px solid #4caf50', borderRadius: '8px', p: 2, backgroundColor: '#f1f8e9', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleIcon color="success" />
                <Typography variant="body2">{llavePrivada.name}</Typography>
              </Box>
              <IconButton size="small" onClick={handleRemoveLlavePrivada} disabled={loading}>
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

        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold', mb: 1.5, display: 'flex', alignItems: 'center',
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
          disabled={loading || disabled || scriptsLoading || totalAlumnos === 0}
          variant="contained"
          color="primary"
        >
          {loading ? `Firmando ${totalAlumnos} documentos...` : `Firmar ${totalAlumnos} documentos`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ModalFirmaElectronica.defaultProps = {
  title: 'Firma Electrónica Masiva',
  alumnosData: [],
  solicitudData: null,
  disabled: false,
};

ModalFirmaElectronica.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  alumnosData: PropTypes.arrayOf(PropTypes.shape()),
  solicitudData: PropTypes.shape(),
  disabled: PropTypes.bool,
};
