import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/authSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function Register() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      enqueueSnackbar('Register successfully! 😍😎', {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });

      history.push('/login');
    } catch (error) {
      console.log('Failed to register ', error);
      enqueueSnackbar(`${error.message} 😥😭`, {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };
  return <RegisterForm onSubmit={handleSubmit} />;
}

export default Register;
