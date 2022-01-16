import categoryApi from 'api/categoryApi';
import customerApi from 'api/customerApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import UpdateCustomerForm from '../UpdateCustomerForm/UpdateCustomerForm';

UpdateCustomer.propTypes = {
  closeDialog: PropTypes.func,
  category: PropTypes.object,
};

function UpdateCustomer({ closeDialog, category }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async (values) => {
    try {
      const formValues = {
        ...values,
        userName: "employee01",
        password: "",
        id: category.id,
      };

      await customerApi.update(formValues);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Update customer successfully.', {
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
      <UpdateCustomerForm onSubmit={handleUpdate} category={category} />
    </div>
  );
}

export default UpdateCustomer;
