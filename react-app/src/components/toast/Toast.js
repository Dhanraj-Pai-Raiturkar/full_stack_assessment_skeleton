import React, { useState, useEffect } from "react";
import Classes from "./Toast.module.css";

const Toast = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={Classes.toast}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
