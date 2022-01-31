import React from 'react';
import './employee.scss';

import { Dialog, Grid, IconButton } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { Close } from '@material-ui/icons';
import Table from 'components/Table/Table';
import ConfirmationDialog from 'features/CRUD/components/ConfirmationDialog/ConfirmationDialog';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import customerApi from 'api/customerApi';
import UpdateCustomer from 'features/CRUD/components/UpdateCustomer/UpdateCustomer';
import employeeApi from 'api/employeeApi';
import AddCategory from 'features/CRUD/components/AddEmployee/AddEmployee';
import UpdateEmployee from 'features/CRUD/components/UpdateEmployee/UpdateEmployee';

const MODE = {
  CREATE: 'create',
  UPDATE: 'update',
};

function Employee() {
  const [EmployeeList, setEmployeeList] = useState();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.CREATE);
  const [Employee, setEmployee] = useState();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpened: false,
    title: '',
    subTitle: '',
  });
  const { enqueueSnackbar } = useSnackbar();

  const EmployeeHead = ['ID', 'Name', 'Phone Number', 'Email', 'Actions'];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.phoneNumber}</td>
      <td>{item.email}</td>
      <td className="Employee__actions">
        <button
          className="Employee__edit-button"
          onClick={() => handleUpdateOpen(item)}
        >
          Edit
        </button>
        <i
          className="far fa-trash-alt Employee__delete-icon"
          onClick={() => {
            setConfirmDialog({
              isOpened: true,
              title: 'Are you sure to delete this employee?',
              subTitle: "You can't undo this operation",
              onConfirm: () => {
                handleRemoveEmployee(item);
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
    setEmployee(item);
    setMode(MODE.UPDATE);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveEmployee = async (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpened: false,
    });
    try {
      await employeeApi.remove(item.id);

      handleClose();

      enqueueSnackbar('Delete Employee successfully.', {
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
        const list = await employeeApi.getAll();
        setEmployeeList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
            phoneNumber: x.phoneNumber,
            email: x.email,
            userName: x.userName
          }))
        );
      } catch (error) {
        console.log('Failed to fetch Employee list', error);
      }
    })();
  }, []);

  return (
    <div className="Employee">
      <h3 className="Employee__header">Employee</h3>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <div className="Employee__card">
            <div className="Employee__card__body">
              <Table
                headData={EmployeeHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={EmployeeList}
                renderBody={(item, index) => renderBody(item, index)}
              />
              <div className="category__add">
                <button
                  className="category__add-button"
                  onClick={handleAddOpen}
                >
                  <i className="fas fa-plus category__add-icon"></i>
                  <span className="category__add-button__title">
                    Add New Category
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
        {mode === MODE.CREATE && <AddCategory closeDialog={handleClose} />}

          {mode === MODE.UPDATE && (
            <UpdateEmployee closeDialog={handleClose} Employee={Employee} />
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

export default Employee;
