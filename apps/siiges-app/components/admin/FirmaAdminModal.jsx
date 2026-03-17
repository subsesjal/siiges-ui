import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 0,
};

export default function FirmaAdminModal({
  open,
  setOpen,
  selectedIds,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [keyFile, setKeyFile] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      setError('');
      setKeyFile(null);
      setPassword('');
      setShowPassword(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.endsWith('.key')) {
        setError('El archivo debe ser de tipo .key');
        return;
      }
      setKeyFile(file);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!keyFile) {
      setError('Seleccione un archivo .key');
      return;
    }
    if (!password) {
      setError('Ingrese la contraseña de la llave');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = sessionStorage.getItem('adminToken');
      const url = process.env.NEXT_PUBLIC_URL_TITULOS;

      const formData = new FormData();
      formData.append('llave', keyFile);
      formData.append('password', password);
      formData.append('ids', selectedIds.join(','));

      const response = await fetch(`${url}/admin/doc/uploadKey`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        handleClose();
        if (onSuccess) onSuccess();
      } else if (response.status === 401) {
        setError('Sesión expirada. Por favor, inicie sesión nuevamente.');
      } else if (response.status === 400) {
        const data = await response.json();
        setError(data.message || 'Error en los datos enviados');
      } else {
        setError('Error al firmar los documentos. Intente nuevamente.');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
      setError('Error de conexión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="h6">Firma de Documentos (Admin)</Typography>
          <IconButton onClick={handleClose} disabled={loading} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Llave Privada (.key)
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  disabled={loading}
                  startIcon={<UploadFileIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Seleccionar archivo
                  <input type="file" accept=".key" hidden onChange={handleFileChange} />
                </Button>
                <Typography variant="body2" color="textSecondary">
                  {keyFile ? keyFile.name : 'Ningún archivo seleccionado'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Contraseña
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    size="small"
                  />
                )}
                label={<Typography variant="body2">Mostrar contraseña</Typography>}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading || !keyFile || !password}
                sx={{
                  py: 1.5,
                  backgroundColor: '#1a237e',
                  '&:hover': { backgroundColor: '#0d1642' },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  `Firmar documentos (${selectedIds.length})`
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            p: 2,
            borderTop: '1px solid #e0e0e0',
            backgroundColor: '#fafafa',
            borderRadius: '0 0 8px 8px',
          }}
        >
          <Typography variant="caption" color="textSecondary">
            ADMIN - 2.0.0
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

FirmaAdminModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  selectedIds: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  onSuccess: PropTypes.func,
};

FirmaAdminModal.defaultProps = {
  onSuccess: null,
};
