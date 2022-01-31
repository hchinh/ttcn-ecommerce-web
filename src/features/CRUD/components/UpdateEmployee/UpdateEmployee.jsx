import customerApi from 'api/customerApi';
import employeeApi from 'api/employeeApi';
import UpdateEmployeeForm from 'features/CRUD/UpdateEmployeeForm/UpdateEmployeeForm';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import UpdateCustomerForm from '../UpdateCustomerForm/UpdateCustomerForm';


UpdateEmployee.propTypes = {
  closeDialog: PropTypes.func,
  Employee: PropTypes.object,
};

function UpdateEmployee({ closeDialog, Employee }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async (values) => {
    try {
      const formValues = {
        ...values,
        roleCode: "ROLE_ADMIN",
        password: ""
      };

      await employeeApi.update(formValues);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Update Employee successfully.', {
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
      <UpdateEmployeeForm onSubmit={handleUpdate} Employee={Employee} />
    </div>
  );
}

export default UpdateEmployee;
