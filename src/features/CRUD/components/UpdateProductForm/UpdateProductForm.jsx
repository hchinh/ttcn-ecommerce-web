import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import SelectField from 'components/form-controls/SelectField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

UpdateProductForm.propTypes = {
  onSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  product: PropTypes.object,
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
    display: 'flex',
    justifyContent: 'space-between',

    '& > button': {
      width: '240px',
    },
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    right: 0,
    left: 0,
  },
}));

function UpdateProductForm({ onSubmit, onRemove, product }) {
  const classes = useStyles();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpened: false,
    title: '',
    subTitle: '',
  });

  const schema = yup.object().shape({
    name: yup.string().required('Please enter product name.'),

    thumbnail: yup.string().required('Please enter url of product thumbnail.'),

    description: yup.string().required('Please enter product description.'),

    brand: yup.string().required('PLease enter product brand'),

    unitInStock: yup.number().required('Please enter unit in stock.').min(0),

    price: yup.string().required('Please enter product price.'),
  });

  const form = useForm({
    defaultValues: {
      name: product.name,
      thumbnail: product.thumbnail,
      description: product.description,
      brand: product.brand,
      price: product.price,
      unitInStock: product.unitInStock,
      categoryId: product.category.id,
    },
    resolver: yupResolver(schema),
  });

  const handleUpdateProduct = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleRemoveProduct = async () => {
    if (onRemove) {
      setConfirmDialog({
        ...confirmDialog,
        isOpened: false,
      });
      await onRemove();
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <h3 className={classes.title}>Update Product</h3>

      <form onSubmit={form.handleSubmit(handleUpdateProduct)}>
        <InputField name="name" label="Name" form={form} />
        <InputField name="thumbnail" label="Thumbnail URL" form={form} />
        <InputField name="description" label="Description" form={form} />
        <InputField name="brand" label="Brand" form={form} />
        <InputField name="price" label="Price" form={form} />
        <InputField name="unitInStock" label="Available" form={form} />
        <SelectField name="categoryId" label="Category Type" form={form} />
        <div className={classes.submit}>
          <Button
            disabled={isSubmitting}
            type="button"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              setConfirmDialog({
                isOpened: true,
                title: 'Are you sure to delete this product?',
                subTitle: "You can't undo this operation",
                onConfirm: () => {
                  handleRemoveProduct();
                },
              });
            }}
          >
            Delete
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Update
          </Button>
        </div>
      </form>
      <ConfirmationDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default UpdateProductForm;
