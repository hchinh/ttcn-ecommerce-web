import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice } from 'utils';
import { cartTotalSelector } from '../selectors';
import Confirm from '../../../components/Confirm';
import s from './style.module.scss';
import { useHistory } from 'react-router-dom';
import StorageUser from 'constants/storage-user';

TotalCost.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    fontSize: '16px',
    fontWeight: '400',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  },
  total: {
    marginBottom: theme.spacing(3),
    fontSize: '18px',
    fontWeight: '600',
    marginTop: theme.spacing(3),
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxtotal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid #c3c3c3',
  },
}));

function TotalCost() {
  const classes = useStyles();
  const cartTotal = useSelector(cartTotalSelector);
  const history = useHistory();

  const handleRedirectCheckout = () => {
    if (localStorage.getItem(StorageUser.ID)) {
      history.push('/checkout');
    } else {
      history.push('/login');
    }
  };

  return (
    <Box>
      <Grid container className={classes.box}>
        <div container className={classes.root}>
          Thành tiền:{' '}
        </div>
        <div container className={classes.root}>
          {' '}
          {!isNaN(cartTotal) ? formatPrice(cartTotal) : formatPrice(0)}{' '}
        </div>
      </Grid>
      <Grid container className={classes.box}>
        <div container className={classes.root}>
          Mã giảm giá:{' '}
        </div>
        <div container className={classes.root}>
          Không
        </div>
      </Grid>
      <Grid container className={classes.boxtotal}>
        <div container className={classes.total}>
          Tổng cộng:{' '}
        </div>
        <div container className={classes.total}>
          {' '}
          {!isNaN(cartTotal) ? formatPrice(cartTotal) : formatPrice(0)}{' '}
        </div>
      </Grid>
      <Button
        onClick={handleRedirectCheckout}
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
      >
        Thanh toán
      </Button>
    </Box>
  );
}

export default TotalCost;
