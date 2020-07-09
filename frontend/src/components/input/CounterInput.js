import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const CounterInput = ({ label, value, onChange, max, ...restProps}) => {
  const [inputValue, setInputValue] = useState(value);

  const onUpdate = useCallback((value) => {
    const slicedValue = value.slice(0, max);
    setInputValue(slicedValue);
    onChange(slicedValue);
  }, [onChange, setInputValue, max]);

  const helperText = useMemo(() => {
    return max ? `${inputValue.length}/${max}` : null;
  }, [inputValue, max]);

  return (
    <TextField
      label={label}
      value={inputValue}
      onChange={(e) => onUpdate(e.target.value)}
      helperText={helperText}
      {...restProps}
    />
  );
};

CounterInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  max: PropTypes.number,
};

export default CounterInput;
