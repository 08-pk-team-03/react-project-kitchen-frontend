import PropTypes from 'prop-types';
import React from 'react';
import { AlertIcon, CheckIcon } from '../../../images/icons';
import inputTextStyles from './InputText.module.css';

const InputText = ({ label, value, placeholder, status, error, onChange, onKeyDown }) => (
  <div className={inputTextStyles.container}>
    <p className={inputTextStyles.label}>{label}</p>
    <div className={status ? inputTextStyles[`${status}Value`] : inputTextStyles.value}>
      <input
        type="text"
        className={inputTextStyles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {status === 'error' && (
        <AlertIcon />
      )}
      {status === 'success' && (
        <CheckIcon />
      )}
    </div>
    {error && (
      <p className={inputTextStyles.error}>{error}</p>
    )}
  </div>
);

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  status: PropTypes.oneOf(['error', 'success']),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};

InputText.defaultProps = {
  placeholder: '',
  status: null,
  error: null,
  onKeyDown: () => {},
};

export default InputText;
