import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import Chart from 'chart.js/auto';

const Pie = ({ totalUsers, owners, caregivers, banned}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const pieProfit = chartRef.current.getContext("2d");
      const caregiversPercentage = (caregivers / totalUsers) * 100;
      const ownersPercentage = (owners / totalUsers) * 100;
      const bannedPercentage = (banned/ totalUsers)*100;

      // Verificar si hay un gráfico existente y destruirlo antes de crear uno nuevo
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      const newChartInstance = new Chart(pieProfit, {
        type: "pie",
        options: {
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: false,
              text: 'Usuarios'
            }
          }
        },
        data: {
          labels: [
            'Dueños',
            'Cuidadores',
            'Bloqueados'
          ],
          datasets: [{
            label: 'Porcentaje',
            data: [ ownersPercentage,caregiversPercentage, bannedPercentage],
            backgroundColor: [
              '#3498DB',
              '#2ECC71',
              'rgb(229, 89, 50)'
            ]
          }]
        }
      });

      // Guardar la instancia del gráfico en el ref para futuras referencias
      chartRef.current.chartInstance = newChartInstance;
    }
  }, [totalUsers, owners, caregivers, banned]);

  return (
    <div className={styles.pieContainer}>
      <div className={styles.pieInfo}>
        <section>
          <h4>Dueños</h4>
          <p>{Math.ceil((owners / totalUsers) * 100)}%</p>
        </section>
        <section>
          <h4>Cuidadores</h4>
          <p>{Math.ceil((caregivers / totalUsers) * 100)}%</p>
        </section>
        <section>
          <h4>Bloqueados</h4>
          <p>{Math.ceil((banned / totalUsers) * 100)}%</p>
        </section>
      </div>
      <canvas id="PieProfits" className={styles.pie} width="100" height="100" ref={chartRef}>
      </canvas>
    </div>
  );
}

export default Pie;
