import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import FilterSortLocationBar from "@src/ui/components/filter-sort-location-bar/FilterSortLocationBar";
import { useSelector } from "react-redux";
import { getHiredCaregivers } from "@src/common/utils/helpers-redux/getHiredCaregivers.js";
import CaregiverList from "@src/ui/components/cards/card-caregivers/caregiver-list/CaregiverList";

const MyCaregivers = () => {
  const ownerId = useSelector((state) => state?.userReducer?.user?.owner?.id);

  const [hiredCaregivers, setHiredCaregivers] = useState([]);
  const [loading, setLoading] = useState(true); //Limpiar remanentes
  const role = useSelector((state) => state.userReducer.user.role);

  useEffect(() => {
    setLoading(true);

    if (ownerId) {
      getHiredCaregivers(ownerId)
        .then((response) => {
          console.log("Cared Pets Response:", response);
          setHiredCaregivers(response);
        })
        .catch((error) => {
          console.error("Error fetching cared pets:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [ownerId]);

  console.log("Cantidad de elementos del array:", hiredCaregivers.length);
  console.log(hiredCaregivers,"HIRED CAREGIVERS  CONTAIN");

  if (role === "owner") {
    return (
      <div className={styles.mainContainerl}>
        <h1 className={styles.myClients}>Mis Cuidadores</h1>
        <FilterSortLocationBar role={role} />

        {loading ? (
          <p>Cargando...</p>
        ) : hiredCaregivers.length === 0 ? (
          <h1 className={styles.noClients}>
            ¡Revisa el apartado de ofertas y encuentra al cuidador adecuado para
            tu mascota!
          </h1>
        ) : (
          <CaregiverList customers={hiredCaregivers} />
        )}
      </div>
    );
  } else {
    return "";
  }
};

export default MyCaregivers;
