import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { API_URL_ADIMIN_PROFITS } from "@src/common/constants/api";
import { setMonthDate } from "./helperDate";
import LineCtx from "./LineCtx";

const ProfitsMoney = () => {
  const [monthMoney, setMonthMoney] = useState([
    { Enero: 0 },
    { Febrero: 0 },
    { Marzo: 0 },
    { Abril: 0 },
    { Mayo: 0 },
    { Junio: 0 },
    { Julio: 0 },
    { Agosto: 0 },
    { Septiembre: 0 },
    { Octubre: 0 },
    { Noviembre: 0 },
    { Diciembre: 0 },
  ]);

  const [profits, setProfits] = useState([]);

  useEffect(() => {
    const getProfits = async () => {
      const response = await fetch(API_URL_ADIMIN_PROFITS);
      const data = await response.json();
      setProfits(
        data.map((profit) => {
          return {
            ...profit,
            date: setMonthDate(profit.date),
          };
        })
      );
    };
    getProfits();
  }, []);

  useEffect(() => {
    setMonthMoney([
      ...monthMoney.map((month) => {
        const monthName = Object.keys(month)[0];
        const profitsMonth = profits.filter(
          (profit) => profit.date == monthName
        );
        const profitsMonthValue = profitsMonth?.reduce((acc, profit) => {
          return acc + parseFloat(profit.revenue);
        }, 0);
        month[monthName] = profitsMonthValue;
        return month;
      }),
    ]);
  }, [profits]);

  const renderMonhts = () => {
    return monthMoney.map((month, index) => {
      const monthName = Object.keys(month)[0];
      const monthValue = Object.values(month)[0];
      return (
        <p key={index}>
          {monthName}: <span>$ {monthValue}</span>
        </p>
      );
    });
  };
  return (
    <div className={styles.containerMainMoney}>
      <div className={styles.containerStatitics}>
        <h2> Año 2023</h2>
        <LineCtx monthMoney={monthMoney} />
      </div>
      <div className={styles.containerInfoMonth}>{renderMonhts()}</div>
    </div>
  );
};

export default ProfitsMoney;
