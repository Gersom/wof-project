import CaregiverCard from "../caregiver-card/CaregiverCard";
import styles from "./styles.module.scss";

const CaregiverList = ({ customers }) => {
  console.log(customers,"CUSTOMERS OBTAIN");
  const generateUniqueKey = (customer) => {
    return `${customer.owner.name}_${customer.pet.name}_${customer.addrress}`;
  };
  return (
    <article className={styles.article}>
      {customers.map((customer) => (
        <CaregiverCard
          key={generateUniqueKey(customer)}
          customerData={customer}
        />
      ))}
    </article>
  );
};

export default CaregiverList;
