import processOrderApi from 'api/processOrderApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import UpdateProcessOrderForm from '../UpdateProcessOrderForm/UpdateProcessOrderForm';

UpdateProcessOrder.propTypes = {
  closeDialog: PropTypes.func,
  processOrder: PropTypes.object,
};

function UpdateProcessOrder({ closeDialog, processOrder }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async (values) => {
    try {
      const formValues = {
        id: values.id,
        status: values.status,
        productId: 2,
        cartId: 1,
        quantity: values.quantity,
      };

      await processOrderApi.update(formValues);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Update processOrder successfully.', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    } catch (error) {
      console.log('Failed to update: ', error);
      enqueueSnackbar(error.message, {
        variant: 'error',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    }
  };

  return (
    <div>
      <UpdateProcessOrderForm
        onSubmit={handleUpdate}
        processOrder={processOrder}
      />
    </div>
  );
}

export default UpdateProcessOrder;
