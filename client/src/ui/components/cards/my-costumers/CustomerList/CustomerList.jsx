import styles from "./styles.module.scss";
import CustomerCardModel from "../CustomerCard/CostumerCardModel";
const CustomerList = ({ customers }) => {
  const generateUniqueKey = (customer) => {
    return `${customer.owner.name}_${customer.pet.name}_${customer.addrress}`;
  };
  return (
    <article className={styles.article}>
      {customers.map((customer) => (
        <CustomerCardModel
          key={generateUniqueKey(customer)}
          customerData={customer}
        />
      ))}
    </article>
  );
};

export default CustomerList;
