import React from 'react';
import { PieChart } from './PieChart';
import styles from './Statistics.module.css';

export const Statistics = ({ statistics }) => {
  return (
    <div className={styles.statistics}>
      <PieChart
        key={JSON.stringify(statistics.ownershipStats)}
        ownershipStats={statistics.ownershipStats}
      />
      <div className={styles.statsInfo}>
        <div className={styles.statBox}>
          <h3>Размер средней заработной платы (руб.)</h3>
          <div className={styles.statValue}>
            {statistics.averageSalary ? statistics.averageSalary.toLocaleString() : '-'}
          </div>
        </div>
        <div className={styles.statBox}>
          <h3>Количество сотрудников (чел.)</h3>
          <div className={styles.statValue}>
            {statistics.totalEmployees ? statistics.totalEmployees.toLocaleString() : '-'}
          </div>
        </div>
      </div>
    </div>
  );
}; 