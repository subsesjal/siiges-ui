import React, { useState, useEffect } from 'react';
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
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 0,
};

export default function FormModal({
  open,
  onClose,
  title,
  fields,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      const initial = {};
      fields.forEach((f) => {
        initial[f.name] = initialData?.[f.name] || '';
      });
      setForm(initial);
      setError('');
    }
  }, [open, initialData, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async () => {
    const required = fields.filter((f) => f.required);
    const missing = required.find((f) => !form[f.name]);
    if (missing) {
      setError(`El campo "${missing.label}" es requerido`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit(form, initialData?.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) onClose();
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
          <Typography variant="h6">{title}</Typography>
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

          <Grid container spacing={2}>
            {fields.map((field) => (
              <Grid item xs={12} sm={field.fullWidth ? 12 : 6} key={field.name}>
                <TextField
                  fullWidth
                  size="small"
                  label={field.label}
                  name={field.name}
                  type={field.type || 'text'}
                  value={form[field.name] || ''}
                  onChange={handleChange}
                  disabled={loading || field.disabled}
                  required={field.required}
                  select={!!field.options}
                  InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                >
                  {field.options?.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
                sx={{ mt: 1, py: 1.2 }}
              >
                {/* eslint-disable-next-line no-nested-ternary */}
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  initialData?.id ? 'Actualizar' : 'Guardar'
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}

FormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      required: PropTypes.bool,
      fullWidth: PropTypes.bool,
      disabled: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          label: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialData: PropTypes.object,
};

FormModal.defaultProps = {
  initialData: null,
};
