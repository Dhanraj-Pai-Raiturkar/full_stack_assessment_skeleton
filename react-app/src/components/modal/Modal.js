import { createPortal } from "react-dom";
import Classes from "./Modal.module.css";
import { useEffect } from "react";

const Modal = (props) => {
  return createPortal(
    <div className={Classes["modal-container"]}>{props.children}</div>,
    document.getElementById("modal")
  );
};

export default Modal;
