import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import GenderSelectField from 'components/form-controls/GenderSelectField';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

UpdateCustomerForm.propTypes = {
  onSubmit: PropTypes.func,
  Customer: PropTypes.object,
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

function UpdateCustomerForm({ onSubmit, Customer }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Please enter your full name.')
      .test(
        'should has at least two words',
        'Please enter at least two words.',
        (value) => {
          return value.split(' ').length >= 2;
        }
      ),
    email: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email address.'),

    phoneNumber: yup.string().required('please enter phone number'),
  });

  const form = useForm({
    defaultValues: {
      name: Customer.name,
      email: Customer.email,
      phoneNumber: Customer.phoneNumber,
      address: Customer.address,
      gender: Customer.gender,
    },
    resolver: yupResolver(schema),
  });

  const handleUpdateCustomer = async (values) => {
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

      <h3 className={classes.title}>Update Customer</h3>

      <form onSubmit={form.handleSubmit(handleUpdateCustomer)}>
        <InputField name="name" label="Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <InputField name="phoneNumber" label="PhoneNumber" form={form} />
        <InputField name="address" label="Address" form={form} />
        <GenderSelectField name="gender" label="Gender" form={form} />
        <Button
          className={classes.submit}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Update Customer
        </Button>
      </form>
    </div>
  );
}

export default UpdateCustomerForm;
