import { useEffect, useState } from "react";
import Classes from "./DropDown.module.css";
import {updateSelectedUser } from '../../slices/userSlice'
import { useDispatch } from "react-redux";

const DropDown = (props) => {
  const { items } = props;
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateSelectedUser(value))
  }, [value]);
  return (
    <div className={Classes["dropdown-section"]}>
      <label for="options" className={Classes["dropdown-label"]}>
        Select a user:
      </label>
      <select
        id="options"
        className={Classes["dropdown"]}
        defaultValue={""}
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
