import {
  API_URL_ADMIN_INFO,
  // API_URL_BAN_USER,
} from "@src/common/constants/api";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import routerNames from "@src/common/constants/routes";

const UserInfo = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const getPaginate = async (url) => {
    try {
      const response = await axios.get(url);
      console.log("API Response (Success):", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPages = async () => {
      const pagination = await getPaginate(
        API_URL_ADMIN_INFO + "?page=" + currentPage
      );
      setUserData(pagination?.data);
      console.log(pagination);
    };
    getPages();
  }, [currentPage]);

  // const handleBanClick = async (userId) => {
  //   try {
  //     await axios.post(API_URL_BAN_USER, { userId });
  //     setUserData((prevUserData) =>
  //       prevUserData.filter((user) => user.id !== userId)
  //     );
  //   } catch (error) {
  //     console.error("Error al banear al usuario:", error);
  //   }
  // };

  const handlePageChange = (url) => {
    fetchData(url);
  };

  const viewProfile = (userData) => {
    // if (userData.role === owner) navigate;
    console.log(userData);
  };

  return (
    <div>
      {Array.isArray(userData.results) && userData.results.length > 0 ? (
        <>
          {userData.results.map((user) => (
            <div key={user.email} className={styles.card}>
              <div
                className={styles.notiImg}
                style={{
                  backgroundImage: "url('" + user.profilePicture + "')",
                }}
              ></div>
              <div>
                <p>
                  {user.name} ({user.role})
                </p>
                <p>
                  <span className={styles.pago}>Pago Total:</span> $
                  {user.totalTransactions}
                </p>
                <p>Argentina</p>
              </div>
              <div className={styles.button}>
                <div
                  onClick={() => viewProfile(user)}
                  className={styles.notiButton1}
                >
                  Perfil
                </div>
                <div
                  // onClick={() => handleBanClick(user.id)}
                  className={styles.notiButton2}
                >
                  Banear
                </div>
              </div>
            </div>
          ))}
          <div>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={userData.previous === null}
            >
              Anterior
            </button>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={userData.next === null}
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <p>No hay datos de usuario disponibles</p>
      )}
    </div>
  );
};

export default UserInfo;
