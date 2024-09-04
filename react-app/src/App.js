import "./App.css";
import DropDown from "./components/dropdown/DropDown";
import CardContainer from "./components/cardContainer/CardContainer";
import Modal from "./components/modal/Modal";
import UserList from "./components/userList/UserList";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {initializeUsers, updateHomeUsers} from './slices/userSlice'
import {initializeHomes, setLoadingHomes, setLoadingSelectedHome} from './slices/homeSlice'

function App() {
  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.userSlice.users)
  const selectedUser = useSelector(state => state.userSlice.selectedUser)
  const homeUsers = useSelector(state => state.userSlice.homeUsers)
  const selectedHomeDetails = useSelector(state => state.homeSlice.selectedHomeDetails)
  const homes = useSelector(state => state.homeSlice.homes)
  const loadingSelectedHome = useSelector(state => state.homeSlice.loadingSelectedHome)
  const loadingHomes = useSelector(state => state.homeSlice.loadingHomes)
  const showModal = useSelector(state => state.modalSlice.show)
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/user/find-all");
        const data = await response.json();
        console.log("data", data)
        dispatch(initializeUsers(data.response))
      } catch (error) {
        console.error("fetchAllUsers error", error);
      } finally {
      }
    };
    fetchAllUsers();
  }, [])
  useEffect(() => {
    const fetchUserHomes = async () => {
      try {
        dispatch(setLoadingHomes(true))
        const response = await fetch(
          `http://localhost:5001/home/find-by-user?email=${selectedUser}`
        );
        const data = await response.json();
        console.log("data selectedUser", data)
        dispatch(initializeHomes(data?.response?.homes ?? []))
      } catch (error) {
        console.error("fetchUserHomes error", error);
      } finally {
        dispatch(setLoadingHomes(false))
      }
    };
    fetchUserHomes();
  }, [selectedUser])
  useEffect(() => {
    const fetchUserForHome = async (homeId) => {
      try {
        dispatch(setLoadingSelectedHome(true))
        const response = await fetch(
          `http://localhost:5001/user/find-by-home?homeId=${homeId}`
        );
        const data = await response.json();
        dispatch(updateHomeUsers(data?.response?.users ?? []))
      } catch (error) {
        console.error(" error", error);
      } finally {
        dispatch(setLoadingSelectedHome(false))
      }
    };
    fetchUserForHome(selectedHomeDetails?.id)
  }, [selectedHomeDetails])
  return (
    <div className="App">
      {showModal && (
        <Modal>
          {homeUsers && !loadingSelectedHome && (
            <UserList
              id={selectedHomeDetails?.id}
              title={selectedHomeDetails?.title}
              selectedUsers={homeUsers}
              loading={loadingSelectedHome}
              allUsers={allUsers}
              updateHomeUsers={updateHomeUsers}
            />
          )}
        </Modal>
      )}
      <DropDown items={allUsers} />
      <span>total: {homes?.length}</span>
      <CardContainer
        cards={homes}
        loading={loadingHomes}
      />
    </div>
  );
}

export default App;
