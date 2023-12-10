import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import FilterSortLocationBar from "@src/ui/components/filter-sort-location-bar/FilterSortLocationBar";
import { useSelector } from "react-redux";
import { getCaredPets } from "@src/common/utils/helpers-redux/getCaredPets";
import CustomerList from "@src/ui/components/cards/card-caregivers/caregiver-list/CostumerLis";

const MyCaregivers = () => {
  const caregiverId = useSelector(
    (state) => state?.userReducer?.user?.caregiver?.id
  );

  const [caredPets, setCaredPets] = useState([]);
  const [loading, setLoading] = useState(true); //Limpiar remanentes
  const role = useSelector((state) => state.userReducer.user.role);

  useEffect(() => {
    setLoading(true);

    if (caregiverId) {
      getCaredPets(caregiverId)
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
  }, [caregiverId]);

  console.log("Cantidad de elementos del array:", caredPets.length);

  if (role === "caregiver") {
    return (
      <div className={styles.mainContainerl}>
        <h1 className={styles.myClients}>Mis Clientes</h1>
        <FilterSortLocationBar role={role} />

        {loading ? (
          <p>Cargando...</p>
        ) : caredPets.length === 0 ? (
          <h1 className={styles.noClients}>
            ¿Sin Clientes? Revisa el apartado de ofertas
          </h1>
        ) : (
          <CustomerList customers={caredPets} />
        )}
      </div>
    );
  } else {
    return "";
  }
};

export default MyCaregivers;
