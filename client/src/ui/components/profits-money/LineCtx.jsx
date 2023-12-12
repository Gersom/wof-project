import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "./styles.module.scss";

const LineCtx = ({ monthMoney }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const lineProfit = chartRef.current.getContext("2d");

      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
      const newChartInstance = new Chart(lineProfit, {
        type: "line",
        options: {
        },
        data: {
          labels: monthMoney.map((month) => Object.keys(month)[0]),
          datasets: [
            {
              label: "Ganancias",
              data: monthMoney.map((month) => Object.values(month)[0]),
              borderColor: "#52C1E4",
              borderWidth: 2,
              pointStyle: 'circle',
              pointRadius: 5,
              pointHoverRadius: 15,
              fill: false,
            },
          ],
        },
      });

      chartRef.current.chartInstance = newChartInstance;
    }
  }, [monthMoney]);
  return <div className={styles.containerLineCtx}>
    <canvas ref={chartRef}  className={styles.lineCtx}/>
  </div>;
};

export default LineCtx;
