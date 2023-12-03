import styles from "./styles.module.scss";
import CustomerList from "@src/ui/components/cards/my-costumers/CustomerList/CustomerList";
import FilterSortLocationBar from "@src/ui/components/filter-sort-location-bar/FilterSortLocationBar";
import { useSelector } from "react-redux";

const MyClients = () => {
  let myArray = [
    {
      id: 1,
      name: "Bianca",
      rating: 3.3,
      imgSrc:
        "https://images.pexels.com/photos/15637445/pexels-photo-15637445/free-photo-of-mujer-cara-pelo-largo-pelirrojo.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      petName: "Ramses",
      petBreed: "Mist australiano",
      petIcon: "🐱",
      startDate: "2023-11-19T04:00:00.000Z",
      endDate: "2023-11-23T04:00:00.000Z",
      address: "Av. Los Juarez - Quito",
    },
    {
      id: 2,
      name: "Anny",
      rating: 4.7,
      imgSrc: "http://localhost:3001/pictures/anny.png",
      petName: "Peluche",
      petBreed: "Pastor Alemán",
      petIcon: "🐶",
      startDate: "2023-11-18T04:00:00.000Z",
      endDate: "2023-11-20T04:00:00.000Z",
      address: "Av. Los Prados - Cercado",
    },
    {
      id: 3,
      name: "Paz",
      rating: 4.7,
      imgSrc:
        "https://images.pexels.com/photos/15637445/pexels-photo-15637445/free-photo-of-mujer-cara-pelo-largo-pelirrojo.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      petName: "Peluche",
      petBreed: "Pastor Alemán",
      petIcon: "🐶",
      startDate: "2023-11-18T04:00:00.000Z",
      endDate: "2023-11-20T04:00:00.000Z",
      address: "Av. Los Prados - Cercado",
    },
  ];
  const role = useSelector((state) => state.userReducer.user.role);
  if (role === "caregiver") {
    return (
      <div className={styles.mainContainerl}>
        <h1 className={styles.myClients}>Mis Clientes</h1>
        <FilterSortLocationBar role={role} />
        <CustomerList customers={myArray} />
      </div>
    );
  } else {
    return "";
  }
};

export default MyClients;
