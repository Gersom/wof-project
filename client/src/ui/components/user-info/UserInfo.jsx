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

//?import icons
import ArrowLeft from "@icons/arrowLeft.svg?react";
import ArrowRight from "@icons/arrowRight.svg?react";
import DoubleArrowLeft from "@icons/doubleArrowLeft.svg?react";
import DoubleArrowRight from "@icons/doubleArrowRight.svg?react";
import ArrowLeftGrey from "@icons/arrowLeftGrey.svg?react";
import ArrowRightGrey from "@icons/arrowRightGrey.svg?react";
import DoubleArrowLeftGrey from "@icons/doubleArrowLeftGrey.svg?react";
import DoubleArrowRightGrey from "@icons/doubleArrowRightGrey.svg?react";

const UserInfo = ({onUpdate}) => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectUser, setSelectUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getPaginate = async (url) => {
    try {
      const response = await axios.get(url);
      setTotalPages(Math.ceil(response.data.count / 10));
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
          onUpdate();
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
            onUpdate();
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
            <button
              onClick={() => setCurrentPage(1)}
              disabled={userData.previous === null}
            >
              {userData.previous === null ? (
                <DoubleArrowLeftGrey />
              ) : (
                <DoubleArrowLeft />
              )}
            </button>
            <div />
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={userData.previous === null}
            >
              {userData.previous === null ? <ArrowLeftGrey /> : <ArrowLeft />}
            </button>
          </section>
          <h3>
            Pagina {currentPage < 10 ? "0" + currentPage : currentPage} de{" "}
            {totalPages}
          </h3>
          <section>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={userData.next === null}
            >
              {userData.next === null ? <ArrowRightGrey /> : <ArrowRight />}
            </button>
            <div />
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={userData.next === null}
            >
              {userData.next === null ? (
                <DoubleArrowRightGrey />
              ) : (
                <DoubleArrowRight />
              )}
            </button>
          </section>
        </div>
        {Array.isArray(userData.results) && userData.results.length > 0 ? (
          <>
            {userData.results.map((user) => (
              <div key={user.email} className={styles.card}>
                <div className={styles.containerUserInfo}>
                  <img src={user.profilePicture} alt="image" />
                  <div className={styles.containerChildInfo}>
                    <p>
                      {user.name} ({user.role})
                    </p>
                    <p>
                      <span>Pago Total:</span> ${user.totalTransactions}
                    </p>
                    <p>Argentina</p>
                  </div>
                </div>
                <div className={styles.containerButton}>
                  <button
                    onClick={() => viewProfile(user)}
                    className={styles.notiButton1}
                  >
                    Perfil
                  </button>
                  {user.banned ?
                    (
                      <button
                        onClick={() => handleUnBanClick(user.userId)}
                        className={styles.notiButton3}
                      >
                        Desbloquear
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBanClick(user.userId)}
                        className={styles.notiButton2}
                      >
                        Bloquear
                      </button>
                    )}
                </div>
              </div>
            ))}
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
