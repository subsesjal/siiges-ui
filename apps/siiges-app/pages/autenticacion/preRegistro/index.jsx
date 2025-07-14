import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { LoginLayout } from '@siiges-ui/shared';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';

function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 500);

    return () => clearTimeout(timeout);
  }, [router]);
  return (
    <LoginLayout>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            mt: 3,
            py: 3,
            px: 3,
            width: '320px',
          },
        }}
        justifyContent="center"
      >
        <Paper
          elevation={5}
          sx={{
            fontSize: 12,
            '&:hover': {
              boxShadow: '15',
            },
            backgroundColor: 'rgb(255, 255, 255, 0.75)',
          }}
        >
          <Box
            component="img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_KiSKVaMTHgwDXl1nG-iJig77m_RkeVp2jQ&s"
            alt="Nada que ver"
            sx={{
              width: '100%',
              maxHeight: 180,
              objectFit: 'contain',
              mb: 2,
              borderRadius: 2,
            }}
          />
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: 'center', color: 'black' }}
          >
            Shhhh. Aqui no hay nada que ver.
          </Typography>
        </Paper>
      </Box>
    </LoginLayout>
  );
}

export default SignUpPage;
