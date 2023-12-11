import {
  API_URL_ADMIN_INFO,
  API_URL_BAN_USER,
  API_URL_UNBAN_USER,
  API_URL_USER,
} from "@src/common/constants/api";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import CardUser from "../cards/card-user/CardUser";
import ModalCustom from "../modals/modal-custom/ModalCustom";
import ArrowLeft from "@icons/arrowLeft.svg?react";
import ArrowRight from "@icons/arrowRight.svg?react";
import DoubleArrowLeft from "@icons/doubleArrowLeft.svg?react";
import DoubleArrowRight from "@icons/doubleArrowRight.svg?react";

const UserInfo = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectUser, setSelectUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleBanClick = async (userId) => {
    try {
      console.log(userData);
      await axios.put(API_URL_BAN_USER + userId);
      setUserData((prevUserData) => {
        if (prevUserData && prevUserData.results) {
          const updatedResults = prevUserData.results.map((user) =>
            user.userId === userId ? { ...user, banned: true } : user
          );
          return { ...prevUserData, results: updatedResults };
        }
        return prevUserData;
      });
    } catch (error) {
      console.error("Error al banear al usuario:", error);
    }
  };

  const handleUnBanClick = async (userId) => {
    try {
      console.log(userData);
      await axios.put(API_URL_UNBAN_USER + userId);
      setUserData((prevUserData) => {
        if (prevUserData && prevUserData.results) {
          const updatedResults = prevUserData.results.map((user) =>
            user.userId === userId ? { ...user, banned: false } : user
          );
          return { ...prevUserData, results: updatedResults };
        }
        return prevUserData;
      });
    } catch (error) {
      console.error("Error al 'des-banear' al usuario:", error);
    }
  };

  const viewProfile = async (userData) => {
    if (userData.role === "owner") {
      const { data } = await axios.get(API_URL_USER + "/" + userData.userId);
      setSelectUser(data);
      setShowModal(true);
    } else if (userData.role === "caregiver") {
      const { data } = await axios.get(API_URL_USER + "/" + userData.userId);
      setSelectUser(data);
      setShowModal(true);
    }
  };

  return (
    <>
      <div className={styles.containerMainUsers}>
        <div className={styles.containerPaginate}>
          <section>
            <button>
              <DoubleArrowLeft />
            </button>
            <div />
            <button>
              <ArrowLeft />
            </button>
          </section>
          <h3>Pagina {currentPage} de 42</h3>
          <section>
            <button>
              <ArrowRight />
            </button>
            <button>
              <DoubleArrowRight />
            </button>
          </section>
        </div>
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
                    <span className={styles.pago}>Pago Total:</span> ${user.totalTransactions}
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
                  {user.banned ? (
                    <div className={styles.notiButton3}
                      onClick={() => handleUnBanClick(user.userId)}
                    >
                      Recuperar
                    </div>
                  ) : (
                    <div
                      onClick={() => handleBanClick(user.userId)}
                      className={styles.notiButton2}
                    >
                      Banear
                    </div>
                  )}
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
      <ModalCustom
        isWarning={true}
        state={showModal}
        toggleModal={() => setShowModal(false)}
      >
        {selectUser && (
          <CardUser
            address={selectUser.address}
            imgSrc={selectUser.profilePicture}
            name={selectUser.name}
            email={selectUser.email}
            role={selectUser.role}
            phone={selectUser.cellPhone}
            rating={selectUser.rating}
            createdAt={selectUser.createdAt}
          />
        )}
      </ModalCustom>
    </>
  );
};

export default UserInfo;
