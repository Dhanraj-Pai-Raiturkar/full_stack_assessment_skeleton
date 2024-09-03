import "./App.css";
import DropDown from "./components/dropdown/DropDown";
import useUserHome from "./hooks/useUserHome";
import CardContainer from "./components/cardContainer/CardContainer";
import Modal from "./components/modal/Modal";
import UserList from "./components/userList/UserList";

function App() {
  const {
    users,
    setSelectedUser,
    selectedUser,
    homes,
    selectedHome,
    loadingHomes,
    setSelectedHome,
    homeUsers,
    loadingSelectedHome,
    selectedHomeDetails,
    updateHomeUsers,
  } = useUserHome();
  return (
    <div className="App">
      {selectedHome && (
        <Modal>
          {homeUsers && !loadingSelectedHome && (
            <UserList
              id={selectedHomeDetails?.id}
              title={selectedHomeDetails?.title}
              selectedUsers={homeUsers}
              loading={loadingSelectedHome}
              setSelectedHome={setSelectedHome}
              allUsers={users}
              updateHomeUsers={updateHomeUsers}
            />
          )}
        </Modal>
      )}
      <DropDown items={users} setSelectedUser={setSelectedUser} />
      <span>total: {homes?.length}</span>
      <CardContainer
        cards={homes}
        loading={loadingHomes}
        setSelectedCard={setSelectedHome}
      />
    </div>
  );
}

export default App;
