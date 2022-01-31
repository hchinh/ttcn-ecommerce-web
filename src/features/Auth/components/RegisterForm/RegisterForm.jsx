import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, makeStyles } from '@material-ui/core';
import GenderSelectField from 'components/form-controls/GenderSelectField';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import styles from './RegisterForm.module.css';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },

  submit: {
    marginTop: theme.spacing(2),
    backgroundColor: '#00C58D',
    '&:hover': {
      backgroundColor: '#161F6A',
    },
  },

  title: {
    color: '#161F6A',
    marginTop: theme.spacing(2),
  },
}));

function RegisterForm({ onSubmit = null }) {
  const classes = useStyles();
  const history = useHistory();
  const schema = yup.object().shape({
    userName: yup.string().required('Please enter your username.'),
    password: yup
      .string()
      .required('Please enter your password.')
      .min(6, 'Please enter at least 6 characters.'),
    fullName: yup
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
  });

  const form = useForm({
    defaultValues: {
      userName: '',
      password: '',
      name: '',
      address: '',
      phoneNumber: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;
  return (
    <div className={styles.loginForm}>
      <form
        className={styles.filter_products}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className={styles.form_inner}>
          <h2 className={styles.title}>Sign Up</h2>
          <InputField name="userName" label="Username" form={form} />
          <PasswordField name="password" label="Password" form={form} />
          <InputField name="name" label="Full Name" form={form} />
          <InputField name="address" label="Address" form={form} />
          <InputField name="phoneNumber" label="Phone Number" form={form} />
          <InputField name="email" label="Email" form={form} />
          <GenderSelectField name="gender" label="Gender" form={form} />
          <Button
            className={classes.submit}
            disabled={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            Create an account
          </Button>
          <Box textAlign="center" mt={2}>
            <Button color="primary" onClick={() => history.push('/login')}>
              Already have an account. Login here
            </Button>
          </Box>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
