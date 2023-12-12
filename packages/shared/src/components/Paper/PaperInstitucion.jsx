import React from 'react';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import '../../styles/Home/PaperHome.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function PaperInstitucion({ name, route }) {
  const router = useRouter();
  return (
    <Paper
      className="paper"
      variant="outlined"
      onClick={() => {
        router.push(route);
      }}
    >
      <Image src="/logoSchool.png" alt="logo" height="400" width="400" />
      <hr />
      <Typography>{name}</Typography>
    </Paper>
  );
}

PaperInstitucion.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};
