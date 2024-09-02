import { useEffect } from "react";
import Classes from "./Card.module.css";

const Card = (props) => {
  const { setSelectedCard } = props;
  useEffect(() => {
    const handleKeyUp = (event) => {
      const key = event?.code;
      if (key === "Escape") setSelectedCard(null);
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
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
        onClick={() => setSelectedCard(props?.card?.id)}
        className={Classes["button"]}
      >
        Edit Users
      </button>
    </div>
  );
};

export default Card;
