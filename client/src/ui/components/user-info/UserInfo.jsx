import { API_URL_ADMIN_INFO } from "@src/common/constants/api";
import axios from "axios";
import { useEffect, useState } from "react";

const UserInfo = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_ADMIN_INFO);
        console.log("API Response (Success):", response);
        setUserData(response.data);
      } catch (error) {
        console.error("API Response (Error):", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {Array.isArray(userData) && userData.length > 0 ? (
        userData.map((user) => (
          <div key={user.email}>
            <img src={user.profilePicture} alt="User Profile" />
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Total Transactions: {user.totalTransactions}</p>
          </div>
        ))
      ) : (
        <p>No hay datos de usuario disponibles</p>
      )}
    </div>
  );
};

export default UserInfo;
