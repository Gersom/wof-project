import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import styles from './styles.module.scss';


function Statistics({ totalUsers, owners, caregivers }) {
  useEffect(() => {
    
    const pieCtx = document.getElementById("myPieChart").getContext("2d");
    const caregiversPercentage = (caregivers / totalUsers) * 100;
    const ownersPercentage = (owners / totalUsers) * 100;

   console.log( totalUsers, owners, caregivers)

    new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: ['Cuidadores', 'Dueños'],
        datasets: [{
          label: 'Num datos',
          data: [caregiversPercentage, ownersPercentage],
          backgroundColor: [
            'rgb(66, 134, 244)',
            'rgb(74, 135, 72)',
            'rgb(229, 89, 50)'
          ]
        }]
      }
    });

    const lineCtx = document.getElementById("myLineChart").getContext("2d");
    new Chart(lineCtx, {
      type: "line",
      data: {
        labels: ['Cuidadores', 'Dueños'],
        datasets: [{
          label: 'Num datos',
          data: [caregiversPercentage, ownersPercentage],
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          fill: false
        }]
      }
    });
  }, [totalUsers, owners, caregivers]);

  return (
    <div className={styles.torta}>
      <canvas id="myPieChart" width="300" height="300"></canvas>
      <canvas id="myLineChart" width="50" height="50"></canvas>
    </div>
  );
}

export default Statistics;



