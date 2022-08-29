import React from 'react';
import { Typography } from '@mui/material';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export default function UserInfo() {
  return (
    <>
      <Image
        alt="avatar"
        src="/avatar.png"
        quality={100}
        width="300px"
        height="300px"
        style={{
          zIndex: 1,
          overflow: 'hidden',
        }}
      />
      <Paper
        sx={{
          padding: 2,
          marginTop: 3,
          width: 300,
          textAlign: 'center',
        }}
      >
        <Typography variant="p">Luis Manuel de Alba Villaseñor</Typography>
        <br />
        <Divider sx={{ marginY: 1 }} />
        <Typography variant="p">Administrador</Typography>
      </Paper>
    </>
  );
}
