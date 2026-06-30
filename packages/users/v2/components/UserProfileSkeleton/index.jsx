import React from 'react';
import {
  Box,
  Grid,
  Skeleton,
  Stack,
} from '@mui/material';

export default function UserProfileSkeleton() {
  return (
    <Box sx={{ paddingX: 2, paddingTop: 1 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            mt: { xs: 2, md: 0 },
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
            <Skeleton variant="circular" width={160} height={160} />
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="45%" height={24} />
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            <Skeleton variant="rounded" height={48} />
            <Skeleton variant="rounded" height={48} />
            <Skeleton variant="rounded" height={48} />
            <Skeleton variant="rounded" height={48} />
            <Skeleton variant="rounded" height={48} />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{
            display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1,
          }}
          >
            <Skeleton variant="rounded" width={120} height={40} />
            <Skeleton variant="rounded" width={140} height={40} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
