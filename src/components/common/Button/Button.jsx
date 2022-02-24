import React from 'react';
import PropTypes from 'prop-types';
import stylesButton from './Button.module.css';

const Button = ({ onClick, isActive, title, icon, isBackground = 1 }) => {
  const buttonAddStyle = isActive ? stylesButton.active : stylesButton.inactive;
  const backgroundAddStyle = isBackground ? '' : stylesButton.noBackground;
  return (
    <button
      className={`${stylesButton.button} ${buttonAddStyle} ${backgroundAddStyle}`}
      type="submit"
      onClick={onClick}
    >
      {icon}
      {title}
    </button>
  );
};

Button.propTypes = {
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  icon: null,
  onClick: () => {},
};

export default Button;
