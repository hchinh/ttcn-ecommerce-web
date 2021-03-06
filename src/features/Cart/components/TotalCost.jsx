import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import StorageUser from 'constants/storage-user';
import { useSnackbar } from 'notistack';
import propTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'utils';
import { cartTotalSelector } from '../selectors';

TotalCost.propTypes = {
  handleCheckout: propTypes.func.isRequired,
};

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

function TotalCost({ handleCheckout }) {
  const classes = useStyles();
  const cartTotal = useSelector(cartTotalSelector);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const customCartItemsField = cartItems.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    status: 0,
  }));

  const fieldValues = {
    customerId: localStorage.getItem(StorageUser.ID),
    totalCost: cartTotal,
    cartItems: customCartItemsField,
    address: 'Hoi An City',
    note: 'test checkout',
  };

  const handleRedirectCheckout = () => {
    if (!localStorage.getItem(StorageUser.ID)) {
      history.push('/login');
      return;
    }

    if (cartItems.length === 0) {
      enqueueSnackbar(
        'Vui lòng thêm ít nhất một sản phẩm vào giỏ hàng trước khi thanh toán',
        {
          variant: 'warning',
          anchorOrigin: {
            horizontal: 'left',
            vertical: 'bottom',
          },
        }
      );
      return;
    }

    handleCheckout(fieldValues);
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
