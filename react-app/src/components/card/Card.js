import { useEffect } from "react";
import Classes from "./Card.module.css";
import { useDispatch } from "react-redux";
import { updatedSelectedHome } from "../../slices/homeSlice";
import { showModal } from "../../slices/modalSlice";

const Card = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const handleKeyUp = (event) => {
      const key = event?.code;
      if (key === "Escape") dispatch(showModal(false))
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  const clickHandler = () => {
    dispatch(updatedSelectedHome({id: props?.card?.id, title: props?.card?.street_address}))
    dispatch(showModal(true))
  }
  return (
    <div className={Classes["card"]}>
      <h3>{props?.card?.street_address}</h3>
      <span className={Classes["details"]}>
        <b>state:</b> {props?.card?.state}
      </span>
      <span className={Classes["details"]}>
        <b>zip:</b> {props?.card?.zip}
      </span>
      <span className={Classes["details"]}>
        <b>sqft:</b> {props?.card?.sqft}
      </span>
      <span className={Classes["details"]}>
        <b>beds:</b> {props?.card?.beds}
      </span>
      <span className={Classes["details"]}>
        <b>baths:</b> {props?.card?.baths}
      </span>
      <span className={Classes["details"]}>
        <b>price:</b> ${props?.card?.list_price}
      </span>
      <button
        onClick={clickHandler}
        className={Classes["button"]}
      >
        Edit Users
      </button>
    </div>
  );
};

export default Card;
