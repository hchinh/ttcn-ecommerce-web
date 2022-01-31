import categoryApi from 'api/categoryApi';
import employeeApi from 'api/employeeApi';
import AddCategoryForm from 'features/CRUD/components/AddEmployeeForm/AddEmployeeForm';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import AddEmployeeForm from '../AddEmployeeForm/AddEmployeeForm';


AddEmployee.propTypes = {
  closeDialog: PropTypes.func,
};

function AddEmployee({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    
    try {

      let roleCode = "ROLE_EMPLOYEE"
      if (values.roleCodeId === 2 ) {
        roleCode = "ROLE_ADMIN"
      }
      const { userName, password, name, phoneNumber,email } = values;
      const formValues = {
        userName,
        password,
        name,
        phoneNumber,
        email,
        roleCode
        };

      await employeeApi.add(formValues);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Create new employee successfully.', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    } catch (error) {
      console.log('Failed to add: ', error);
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
      <AddEmployeeForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddEmployee;
