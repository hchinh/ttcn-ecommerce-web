import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import GENDER_CONSTANTS from 'constants/gender';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

GenderSelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

function GenderSelectField(props) {
  const { form, name, label } = props;
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

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
            {GENDER_CONSTANTS.map((gender, idx) => (
              <MenuItem key={idx} value={gender.value}>
                {gender.text}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default GenderSelectField;
