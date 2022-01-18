import feedbackApi from 'api/feedbackApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import UpdateFeedbackForm from '../UpdateFeedbackForm/UpdateFeedbackForm';

UpdateFeedback.propTypes = {
  closeDialog: PropTypes.func,
  feedback: PropTypes.object,
};

function UpdateFeedback({ closeDialog, feedback }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async (values) => {
    
    try {
      const formValues = {
        ...values,
        id: feedback.id,
      };
      console.log("handleUpdate-UpdateFeedback",formValues)
      await feedbackApi.update(formValues);

      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Update feedback successfully.', {
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
      <UpdateFeedbackForm onSubmit={handleUpdate} feedback={feedback} />
    </div>
  );
}

export default UpdateFeedback;
