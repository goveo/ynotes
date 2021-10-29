import React, { useState, useCallback, useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps {
  value: string,
  onChange: (value: string) => void,
  label?: string,
  max?: number,
  multiline?: boolean
}

const CounterInput: React.FC<Props> = ({ label, value, onChange, max, ...restProps }) => {
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

export default CounterInput;
