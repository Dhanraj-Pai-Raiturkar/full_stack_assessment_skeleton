import { useEffect, useState } from "react";

const useUserHome = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [selectedHome, setSelectedHome] = useState();
  const [users, setUsers] = useState([]);
  const [homes, setHomes] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingHomes, setLoadingHomes] = useState(false);
  const [loadingSelectedHome, setLoadingSelectedHome] = useState(false);
  const [homeUsers, setHomeUsers] = useState();
  const [selectedHomeDetails, setSelectedHomeDetails] = useState();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoadingUsers(true);
        const response = await fetch("http://localhost:5001/user/find-all");
        const data = await response.json();
        setUsers(data.response);
        setLoadingUsers(false);
      } catch (error) {
        console.error("fetchAllHomes error", error);
        setLoadingUsers(false);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchUserHomes = async () => {
      try {
        setLoadingHomes(true);
        const response = await fetch(
          `http://localhost:5001/home/find-by-user?email=${selectedUser}`
        );
        const data = await response.json();
        setHomes(data?.response?.homes ?? []);
        setLoadingHomes(false);
      } catch (error) {
        console.error("fetchUserHomes error", error);
        setLoadingHomes(false);
      } finally {
        setLoadingHomes(false);
      }
    };
    fetchUserHomes();
  }, [selectedUser]);

  useEffect(() => {
    const fetchUserForHome = async (homeId) => {
      try {
        setLoadingSelectedHome(true);
        const response = await fetch(
          `http://localhost:5001/user/find-by-home?homeId=${homeId}`
        );
        const data = await response.json();
        setHomeUsers(data?.response?.users ?? []);
        setSelectedHomeDetails({
          id: data?.response?.id,
          title: data?.response?.street_address,
        });
        setLoadingSelectedHome(false);
      } catch (error) {
        console.error(" error", error);
        setLoadingSelectedHome(false);
      } finally {
        setLoadingSelectedHome(false);
      }
    };
    if (selectedHome) fetchUserForHome(selectedHome);
  }, [selectedHome]);

  return {
    users,
    setSelectedUser,
    selectedUser,
    homes,
    loadingHomes,
    setSelectedHome,
    selectedHome,
    loadingSelectedHome,
    homeUsers,
    selectedHomeDetails,
  };
};

export default useUserHome;
