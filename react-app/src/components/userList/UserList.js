import { useEffect, useState } from "react";
import Classes from "./UserList.module.css";
import Toast from "../toast/Toast";

const UserList = (props) => {
  const {
    id,
    title,
    selectedUsers,
    setSelectedHome,
    allUsers,
    updateHomeUsers,
    loading,
  } = props;
  const [currentSelectedUsers, setCurrentSelectedUsers] = useState(
    selectedUsers?.map((user) => user.email) ?? []
  );
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleCheckboxChange = (event, email) => {
    const isChecked = event?.target?.checked;
    if (!isChecked) {
      setCurrentSelectedUsers((prev) => [
        ...prev.filter((selectedEmail) => selectedEmail !== email),
      ]);
    } else {
      setCurrentSelectedUsers((prev) => [...prev, email]);
    }
  };

  const submitHandler = async () => {
    updateHomeUsers(id, currentSelectedUsers);
    setUpdateSuccess(true);
  };

  const handleModelClose = () => {
    setUpdateSuccess(false);
    setSelectedHome(null);
  };

  useEffect(() => {
    console.log("currentSelectedUsers", currentSelectedUsers);
  }, [currentSelectedUsers]);
  return (
    <>
      <div className={Classes["container"]}>
        {loading ? (
          <span>loading...</span>
        ) : (
          <>
            <div>
              <h2>
                Street Address: <i>{title}</i>
              </h2>
              <div className={Classes["checkbox-container"]}>
                {allUsers?.map((user) => {
                  const selectedUsersEmail = selectedUsers?.map(
                    (user) => user.email
                  );
                  const checkedUser = selectedUsersEmail?.includes(user.email);
                  console.log("checked", checkedUser, user.email);
                  return (
                    <div className={Classes["checkbox-row"]}>
                      <input
                        type="checkbox"
                        id="checkbox1"
                        className={Classes["checkbox-input"]}
                        defaultChecked={checkedUser}
                        onChange={(event) =>
                          handleCheckboxChange(event, user.email)
                        }
                      />
                      <label
                        for="checkbox1"
                        className={Classes["checkbox-label"]}
                      >
                        {user.email}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={Classes["footer"]}>
              <button
                onClick={() => setSelectedHome(null)}
                className={Classes["button"]}
                disabled={updateSuccess}
              >
                cancel
              </button>
              <button
                disabled={updateSuccess}
                onClick={submitHandler}
                className={Classes["button"]}
              >
                submit
              </button>
            </div>
          </>
        )}
      </div>

      {updateSuccess && (
        <Toast message={"Update Successful"} onClose={handleModelClose} />
      )}
    </>
  );
};

export default UserList;
