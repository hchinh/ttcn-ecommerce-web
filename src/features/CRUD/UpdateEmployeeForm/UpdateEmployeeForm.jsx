import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

UpdateEmployeeForm.propTypes = {
  onSubmit: PropTypes.func,
  Employee: PropTypes.object,
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

function UpdateEmployeeForm({ onSubmit, Employee }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    name: yup.string().required('Please enter name.'),

    email: yup.string().required('Please enter email.'),

    phoneNumber: yup.string().required('please enter phone number'),

    userName: yup.string().required ('please enter userName')
  });

  const form = useForm({
    defaultValues: {
      id: Employee.id,
      name: Employee.name,
      email: Employee.email,
      phoneNumber: Employee.phoneNumber,
      userName: Employee.userName,
    },
    resolver: yupResolver(schema),
  });

  const handleUpdateEmployee = async (values) => {
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

      <h3 className={classes.title}>Update Employee</h3>

      <form onSubmit={form.handleSubmit(handleUpdateEmployee)}>
        <InputField name="name" label="Name" form={form} />
        <InputField name="email" label="email" form={form} />
        <InputField name="phoneNumber" label="phoneNumber" form={form} />
        <InputField name="userName" label="userName" form={form} />


        <Button
          className={classes.submit}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Update Employee
        </Button>
      </form>
    </div>
  );
}

export default UpdateEmployeeForm;
