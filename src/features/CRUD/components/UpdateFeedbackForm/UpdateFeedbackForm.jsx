import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

UpdateFeedbackForm.propTypes = {
  onSubmit: PropTypes.func,
  Feedback: PropTypes.object,
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

function UpdateFeedbackForm({ onSubmit, Feedback }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    customerId: yup.string().required('Please enter customerId.'),
    productId: yup.string().required('Please enter productId.'),

    rating: yup
      .string()
      .required('Please enter rating of Feedback .'),
  });

  const form = useForm({
    defaultValues: {
      customerId: '',
      productId: '',
      rating: 0,
    },
    resolver: yupResolver(schema),
  });

  const handleUpdateFeedback = async (values) => {
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

      <h3 className={classes.title}>Update Feedback</h3>

      <form onSubmit={form.handleSubmit(handleUpdateFeedback)}>
        <InputField name="customerId" label="customerId" form={form} />
        <InputField name="productId" label="productId" form={form} />
        <InputField name="rating" label="rating" form={form} />
        <Button
          className={classes.submit}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Update Feedback
        </Button>
      </form>
    </div>
  );
}

export default UpdateFeedbackForm;
