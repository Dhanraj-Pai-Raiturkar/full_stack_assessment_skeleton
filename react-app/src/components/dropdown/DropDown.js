import { useEffect, useState } from "react";
import Classes from "./DropDown.module.css";

const DropDown = (props) => {
  const { items, setSelectedUser } = props;
  const [value, setValue] = useState();
  useEffect(() => {
    setSelectedUser(value);
  }, [value]);
  return (
    <div className={Classes["dropdown-section"]}>
      <label for="options" className={Classes["dropdown-label"]}>
        Select a user:
      </label>
      <select
        id="options"
        className={Classes["dropdown"]}
        onChange={(e) => setValue(e?.target?.value)}
      >
        {items?.map((item, index) => {
          return (
            <option key={`option${index}`} value={items.email}>
              {item.email}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
