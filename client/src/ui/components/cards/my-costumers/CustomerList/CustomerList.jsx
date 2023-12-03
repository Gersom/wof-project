import styles from "./styles.module.scss";
import CustomerCardModel from "../CustomerCard/CostumerCardModel";
const CustomerList = ({ customers }) => {
  return (
    <article className={styles.article}>
      {customers.map((customer) => (
        <CustomerCardModel key={customer.id} customerData={customer} />
      ))}
    </article>
  );
};

export default CustomerList;
