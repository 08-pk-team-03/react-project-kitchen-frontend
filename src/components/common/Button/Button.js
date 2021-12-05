import React, { useState } from "react";
import stylesButton from "../Button/Button.module.css";

const Button = ({ onClick, isActive, title, icon }) => {
  const buttonAddStyle = isActive ? stylesButton.active : stylesButton.inactive;

  return (
    <button
      className={`${stylesButton.button} ${buttonAddStyle}`}
      onClick={onClick}
    >
      {icon}
      &nbsp;
      {title}
    </button>
  );
};

export default Button;
