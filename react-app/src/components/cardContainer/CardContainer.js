import Classes from "./CardContainer.module.css";
import Card from "../card/Card";

const CardContainer = (props) => {
  const { cards, loading } = props;
  return (
    <div className={Classes["container"]}>
      {loading ? (
        <span>loading homes...</span>
      ) : cards?.length ? (
        cards?.map((card) => {
          return <Card card={card} />;
        })
      ) : (
        <span className={Classes["message"]}>no user selected</span>
      )}
    </div>
  );
};

export default CardContainer;
