import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

ProductSkeletonList.propTypes = {
  length: PropTypes.number,
};

function ProductSkeletonList({ length = 20 }) {
  return (
    <Grid container>
      {Array.from(new Array(length)).map((x, index) => (
        <Grid item key={index} xs={20} sm={6} md={4} lg={3}>
          <Box padding={1}>
            <Skeleton variant='rect' width='100%' height={140} />
            <Skeleton />
            <Skeleton width='60%' />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductSkeletonList;
