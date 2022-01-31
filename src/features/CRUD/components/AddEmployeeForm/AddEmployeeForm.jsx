import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import SelectField from 'components/form-controls/SelectFieldEmployee';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddEmployeeForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(4),
    width: '500px',
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: '#ff4a6b',
  },

  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },

  submit: {
    margin: theme.spacing(3, 0, 2, 0),
    color: 'white',
    backgroundColor: '#349eff',

    '&:hover': {
      backgroundColor: '#62b4ff',
    },
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    right: 0,
    left: 0,
  },
}));

function AddEmployeeForm({ onSubmit }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    userName: yup
    .string()
    .required('Please enter userName.'),

    password: yup
    .string()
    .required('Please enter password.'),

    name: yup
    .string()
    .required('Please enter name.'),

    phoneNumber: yup
    .string()
    .required('Please enter phoneNumber.'),

    email: yup
    .string()
    .required('Please enter email.'),

    // roleCode: yup
    //   .string()
    //   .required('Please enter roleCode.'),
  });

  const form = useForm({
    defaultValues: {
      userName: '',
      password: '',
      name: '',
      phoneNumber: '',
      email: '',
      roleCodeId: '',

    },
    resolver: yupResolver(schema),
  });

  const handleAddEmployee = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <h3 className={classes.title}>Add New Employee</h3>

      <form onSubmit={form.handleSubmit(handleAddEmployee)}>
        <InputField name="userName" label="userName" form={form} />
        <InputField name="password" label="password" form={form} />
        <InputField name="name" label="name" form={form} />
        <InputField name="phoneNumber" label="phoneNumber" form={form} />
        <InputField name="email" label="email" form={form} />
        <SelectField name="roleCodeId" label="role Type" form={form} />
        <Button
          className={classes.submit}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          fullWidth
          size="large"
        >
          Create Employee
        </Button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
