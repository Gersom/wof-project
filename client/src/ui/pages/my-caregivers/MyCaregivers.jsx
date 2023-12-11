import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import FilterSortLocationBar from "@src/ui/components/filter-sort-location-bar/FilterSortLocationBar";
import { useSelector } from "react-redux";
import { getCaredPets } from "@src/common/utils/helpers-redux/getCaredPets";
import CaregiverList from "@src/ui/components/cards/card-caregivers/caregiver-list/CaregiverList";

const MyCaregivers = () => {
  const ownerId = useSelector((state) => state?.userReducer?.user?.owner?.id);

  const [caredPets, setCaredPets] = useState([]);
  const [loading, setLoading] = useState(true); //Limpiar remanentes
  const role = useSelector((state) => state.userReducer.user.role);

  useEffect(() => {
    setLoading(true);

    if (ownerId) {
      getCaredPets(ownerId)
        .then((response) => {
          console.log("Cared Pets Response:", response);
          setCaredPets(response);
        })
        .catch((error) => {
          console.error("Error fetching cared pets:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [ownerId]);

  console.log("Cantidad de elementos del array:", caredPets.length);

  if (role === "owner") {
    return (
      <div className={styles.mainContainerl}>
        <h1 className={styles.myClients}>Mis Cuidadores</h1>
        <FilterSortLocationBar role={role} />

        {loading ? (
          <p>Cargando...</p>
        ) : caredPets.length === 0 ? (
          <h1 className={styles.noClients}>
            ¡Publica una oferta y encuentra al cuidador adecuado para tu
            mascota!
          </h1>
        ) : (
          <CaregiverList customers={caredPets} />
        )}
      </div>
    );
  } else {
    return "";
  }
};

export default MyCaregivers;
