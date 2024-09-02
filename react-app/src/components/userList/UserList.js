import Classes from "./UserList.module.css";

const UserList = (props) => {
  const { id, title, users, loading, setSelectedHome } = props;
  return (
    <div className={Classes["container"]}>
      <div>
        <h2>
          Street Address: <i>{title}</i>
        </h2>
        <div className={Classes["checkbox-container"]}>
          {users?.map((user) => {
            return (
              <div className={Classes["checkbox-row"]}>
                <input
                  type="checkbox"
                  id="checkbox1"
                  className={Classes["checkbox-input"]}
                />
                <label for="checkbox1" className={Classes["checkbox-label"]}>
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
        >
          cancel
        </button>
        <button className={Classes["button"]}>submit</button>
      </div>
    </div>
  );
};

export default UserList;
