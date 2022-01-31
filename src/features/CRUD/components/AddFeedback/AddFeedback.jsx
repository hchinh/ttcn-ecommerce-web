import FeedbackApi from 'api/feedbackApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import AddFeedbackForm from '../AddFeedbackForm/AddFeedbackForm';

AddFeedback.propTypes = {
  closeDialog: PropTypes.func,
};

function AddFeedback({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      await FeedbackApi.add(values);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Create new Feedback successfully.', {
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
      <AddFeedbackForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddFeedback;
