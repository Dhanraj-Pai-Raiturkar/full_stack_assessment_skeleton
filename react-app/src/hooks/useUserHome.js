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
    if (selectedHome) fetchUserForHome(selectedHome);
  }, [selectedHome]);

  const updateHomeUsers = async (homeId, userIds) => {
    try {
      const response = await fetch(`http://localhost:5001/home/update-users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          homeId,
          userIds,
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.error("updateHomeUsers error", error);
    }
  };

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
    updateHomeUsers,
  };
};

export default useUserHome;
