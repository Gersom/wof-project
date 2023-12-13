import CaregiverCard from "../caregiver-card/CaregiverCard";
import styles from "./styles.module.scss";

const CaregiverList = ({ customers }) => {
  const generateUniqueKey = (customer) => {
    return `${customer.caregiver.name}_${customer.pet.name}_${customer.address}`;
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
