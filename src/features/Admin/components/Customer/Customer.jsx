import React from 'react';
import './Customer.scss';
import { Dialog, Grid, IconButton } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { Close } from '@material-ui/icons';
import Table from 'components/Table/Table';
import ConfirmationDialog from 'features/CRUD/components/ConfirmationDialog/ConfirmationDialog';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import customerApi from 'api/customerApi';
import UpdateCustomer from 'features/CRUD/components/UpdateCustomer/UpdateCustomer';

const MODE = {
  CREATE: 'create',
  UPDATE: 'update',
};

function Customer() {
  const [CustomerList, setCustomerList] = useState();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.CREATE);
  const [Customer, setCustomer] = useState();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpened: false,
    title: '',
    subTitle: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const CustomerHead = ['ID', 'Name', 'Phone Number', 'Email', 'Actions'];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.phoneNumber}</td>
      <td>{item.email}</td>
      <td className="customer__actions">
        <button
          className="customer__edit-button"
          onClick={() => handleUpdateOpen(item)}
        >
          Edit
        </button>
        <i
          className="far fa-trash-alt customer__delete-icon"
          onClick={() => {
            setConfirmDialog({
              isOpened: true,
              title: 'Are you sure to delete this customer?',
              subTitle: "You can't undo this operation",
              onConfirm: () => {
                handleRemoveCustomer(item);
              },
            });
          }}
        ></i>
      </td>
    </tr>
  );

  const handleUpdateOpen = (item) => {
    setCustomer(item);
    setMode(MODE.UPDATE);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveCustomer = async (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpened: false,
    });
    try {
      await customerApi.remove(item.id);

      handleClose();

      enqueueSnackbar('Delete customer successfully.', {
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
        const list = await customerApi.getAll();
        setCustomerList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
            phoneNumber: x.phoneNumber,
            email: x.email,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch customer list', error);
      }
    })();
  }, []);

  return (
    <div className="Customer">
      <h3 className="Customer__header">Customers</h3>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <div className="Customer__card">
            <div className="Customer__card__body">
              <Table
                headData={CustomerHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={CustomerList}
                renderBody={(item, index) => renderBody(item, index)}
              />
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
          {mode === MODE.UPDATE && (
            <UpdateCustomer closeDialog={handleClose} Customer={Customer} />
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

export default Customer;
