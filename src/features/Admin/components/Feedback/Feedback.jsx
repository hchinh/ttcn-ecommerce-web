import { Dialog, Grid, IconButton } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { Close } from '@material-ui/icons';
import feedbackApi from 'api/feedbackApi';
import Table from 'components/Table/Table';
import AddFeedback from 'features/CRUD/components/AddFeedback/AddFeedback';
import ConfirmationDialog from 'features/CRUD/components/ConfirmationDialog/ConfirmationDialog';
import UpdateFeedback from 'features/CRUD/components/UpdateFeedback/UpdateFeedback';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import './Feedback.scss';

const MODE = {
  CREATE: 'create',
  UPDATE: 'update',
};

function Feedback() {
  const [feedbackList, setFeedbackList] = useState();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.CREATE);
  const [feedback, setFeedback] = useState();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpened: false,
    title: '',
    subTitle: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const feedbackHead = ['ID', 'product', 'customer name', 'rating'];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.productName}</td>
      <td>{item.customerName}</td>
      <td>{item.rating}</td>
      <td className="feedback__actions">
        <button
          className="feedback__edit-button"
          onClick={() => handleUpdateOpen(item)}
        >
          Edit
        </button>
        <i
          className="far fa-trash-alt feedback__delete-icon"
          onClick={() => {
            setConfirmDialog({
              isOpened: true,
              title: 'Are you sure to delete this feedback?',
              subTitle: "You can't undo this operation",
              onConfirm: () => {
                handleRemoveFeedback(item);
              },
            });
          }}
        ></i>
      </td>
    </tr>
  );

  const handleAddOpen = () => {
    setMode(MODE.CREATE);
    setOpen(true);
  };

  const handleUpdateOpen = (item) => {
    setFeedback(item);
    setMode(MODE.UPDATE);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveFeedback = async (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpened: false,
    });
    try {
      await feedbackApi.remove(item.id);

      handleClose();

      enqueueSnackbar('Delete feedback successfully.', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    } catch (error) {
      console.log('Failed to delete: ', error);
      enqueueSnackbar(error.message, {
        variant: 'error',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top',
        },
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await feedbackApi.getAll();
        setFeedbackList(
          list.map((x) => ({
            id: x.id,
            productName: x.product.name,
            customerName: x.customer.name,
            rating: x.rating,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch feedback list', error);
      }
    })();
  }, []);

  return (
    <div className="feedback">
      <h3 className="feedback__header">Feedbacks</h3>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <div className="feedback__card">
            <div className="feedback__card__body">
              <Table
                headData={feedbackHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={feedbackList}
                renderBody={(item, index) => renderBody(item, index)}
              />
              <div className="feedback__add">
                <button
                  className="feedback__add-button"
                  onClick={handleAddOpen}
                >
                  <i className="fas fa-plus feedback__add-icon"></i>
                  <span className="feedback__add-button__title">
                    Add New feedback
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className="dialog__close-button" onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          {mode === MODE.CREATE && <AddFeedback closeDialog={handleClose} />}

          {mode === MODE.UPDATE && (
            <UpdateFeedback closeDialog={handleClose} feedback={feedback} />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default Feedback;
