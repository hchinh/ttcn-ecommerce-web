import React from 'react';
import './Customer.scss';

import { Dialog, Grid, IconButton } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { Close } from '@material-ui/icons';
import categoryApi from 'api/categoryApi';
import Table from 'components/Table/Table';
import AddCategory from 'features/CRUD/components/AddCategory/AddCategory';
import ConfirmationDialog from 'features/CRUD/components/ConfirmationDialog/ConfirmationDialog';
import { useSnackbar } from 'notistack';
import  { useEffect, useState } from 'react';
import customerApi from 'api/customerApi';
import UpdateCustomer from 'features/CRUD/components/UpdateCustomer/UpdateCustomer';
//import './Category.scss';

const MODE = {
  CREATE: 'create',
  UPDATE: 'update',
};

function Category() {
  const [categoryList, setCategoryList] = useState();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.CREATE);
  const [category, setCategory] = useState();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpened: false,
    title: '',
    subTitle: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const categoryHead = ['ID', 'Name', 'Phone Number','Email', 'Actions'];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.phoneNumber}</td>
      <td>{item.email}</td>
      <td className="category__actions">
        <button
          className="category__edit-button"
          onClick={() => handleUpdateOpen(item)}
        >
          Edit
        </button>
        <i
          className="far fa-trash-alt category__delete-icon"
          onClick={() => {
            setConfirmDialog({
              isOpened: true,
              title: 'Are you sure to delete this customer?',
              subTitle: "You can't undo this operation",
              onConfirm: () => {
                handleRemoveCategory(item);
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
    setCategory(item);
    setMode(MODE.UPDATE);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveCategory = async (item) => {
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
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
            phoneNumber: x.phoneNumber,
            email: x.email
          }))
        );
      } catch (error) {
        console.log('Failed to fetch customer list', error);
      }
    })();
  }, []);

  return (
    <div className="category">
      <h3 className="category__header">Customers</h3>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <div className="category__card">
            <div className="category__card__body">
              <Table
                headData={categoryHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={categoryList}
                renderBody={(item, index) => renderBody(item, index)}
              />
              {/* <div className="category__add">
                <button
                  className="category__add-button"
                  onClick={handleAddOpen}
                >
                  <i className="fas fa-plus category__add-icon"></i>
                  <span className="category__add-button__title">
                    Add New Customer
                  </span>
                </button>
              </div> */}
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
          {mode === MODE.CREATE && <AddCategory closeDialog={handleClose} />}

          {mode === MODE.UPDATE && (
            <UpdateCustomer closeDialog={handleClose} category={category} />
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

export default Category;
