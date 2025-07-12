import { Button } from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GetFile from '../../utils/handlers/getFile';
import { Context } from '../../utils/handlers/context';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function ButtonFileDownload({
  entidadId, tipoEntidad, tipoDocumento, children,
}) {
  const { setNoti } = useContext(Context);
  const handleDownload = async () => {
    try {
      const fileUrl = await GetFile({
        entidadId,
        tipoEntidad,
        tipoDocumento,
      });

      const url = `${baseUrl}${fileUrl}`;

      if (url) {
        window.open(url, '_blank');
      }
    } catch (error) {
      setNoti({
        open: true,
        message: '¡No se encontro el archivo!',
        type: 'error',
      });
    }
  };

  return (
    <Button
      variant="outlined"
      size="small"
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
      onClick={handleDownload}
      endIcon={<FileOpenIcon />}
    >
      {children}
    </Button>
  );
}

ButtonFileDownload.propTypes = {
  entidadId: PropTypes.number.isRequired,
  tipoEntidad: PropTypes.string.isRequired,
  tipoDocumento: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
