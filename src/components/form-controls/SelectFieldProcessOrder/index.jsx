import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

function SelectField(props) {
  const { form, name, label } = props;
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

  const [processOrderList, setprocessOrderList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = [
        { id: 0, name: "Cancel" },
        { id: 1, name: "Process" },
        { id: 2, name: "Done" }]
        setprocessOrderList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch processOrder list', error);
      }
    })();
  }, []);

  return (
    <FormControl fullWidth margin="normal" variant="outlined" error={hasError}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, value, name } }) => (
          <Select
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            id={name}
            label={label}
          >
            {processOrderList.map((processOrder) => (
              <MenuItem key={processOrder.id} value={processOrder.id}>
                {processOrder.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default SelectField;
