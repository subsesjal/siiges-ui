import React from 'react';
import { Typography, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import '../../styles/Home/PaperHome.css';
import Button from '../Buttons/Button';

export default function PaperHome({ title, image, url }) {
  return (
    <Paper className="paper" variant="outlined">
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <img
        src={image || '/no-image.png'}
        alt={title}
        style={{
          width: '100%',
          height: 120,
          objectFit: 'cover',
          marginTop: 8,
        }}
      />
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button
          text="Leer noticia"
          align="right"
          type="consult"
          onClick={() => window.open(url, '_blank')}
        />
      </Stack>
    </Paper>
  );
}

PaperHome.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  url: PropTypes.string.isRequired,
};

PaperHome.defaultProps = {
  image: '/no-image.png',
};
