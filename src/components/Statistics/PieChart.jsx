import React, { useState, useEffect } from 'react';
import styles from './PieChart.module.css';

const COLORS = {
  'Частная': '#129DDC',
  'Государственная': '#29CBFEF5',
  'Муниципальная': '#D9D9D9'
};

export const PieChart = ({ ownershipStats }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);
  const hasCompanies = Object.values(ownershipStats).some(value => value > 0);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const radius = isSmallScreen ? 100 : 175;
  const center = radius;

  // Корректируем проценты для диаграммы, чтобы сумма была 100%
  const adjustedPercentages = React.useMemo(() => {
    if (!hasCompanies) return ownershipStats;

    const total = Object.values(ownershipStats).reduce((sum, value) => sum + value, 0);
    if (total === 100) return ownershipStats;

    // Находим наибольшее значение
    const entries = Object.entries(ownershipStats);
    const maxEntry = entries.reduce((max, current) =>
      current[1] > max[1] ? current : max
      , entries[0]);

    // Создаем новый объект с скорректированными процентами
    return {
      ...ownershipStats,
      [maxEntry[0]]: maxEntry[1] + (100 - total)
    };
  }, [ownershipStats, hasCompanies]);

  const createPieChartPath = (startAngle, percentage) => {
    if (percentage === 100) {
      return `M${center},${center} m-${radius},0 a${radius},${radius} 0 1,1 ${radius * 2},0 a${radius},${radius} 0 1,1 -${radius * 2},0`;
    }

    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;

    const startRadians = (startAngle - 90) * (Math.PI / 180);
    const endRadians = (endAngle - 90) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(startRadians);
    const y1 = center + radius * Math.sin(startRadians);
    const x2 = center + radius * Math.cos(endRadians);
    const y2 = center + radius * Math.sin(endRadians);

    const largeArc = angle > 180 ? 1 : 0;

    return `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;
  };

  let currentAngle = 0;

  return (
    <div className={styles.pieChartContainer}>
      <div className={styles.part}>
        <div className={styles.pieChart}>
          <svg 
            width="100%" 
            height="100%" 
            viewBox={`0 0 ${isSmallScreen ? 200 : 350} ${isSmallScreen ? 200 : 350}`}
          >
            {!hasCompanies ? (
              <circle
                cx={center}
                cy={center}
                r={radius - 0.5}
                fill="none"
                stroke="black"
                strokeWidth="1"
              />
            ) : (
              Object.entries(adjustedPercentages).map(([type, percentage]) => {
                if (percentage === 0) return null;
                const path = createPieChartPath(currentAngle, percentage);
                currentAngle += (percentage / 100) * 360;
                return (
                  <path
                    key={type}
                    d={path}
                    fill={COLORS[type]}
                    stroke="none"
                  />
                );
              })
            )}
          </svg>
        </div>
      </div>

      <div className={styles.part}>
        <div className={styles.legend}>
          {Object.entries(ownershipStats).map(([type, percentage]) => (
            <div key={type} className={styles.legendItem}>
              <span
                className={styles.dot}
                style={{ background: hasCompanies ? COLORS[type] : 'transparent' }}
              />
              <span>{type}</span>
              <span>{hasCompanies ? `Доля: ${percentage}%` : 'Доля: -'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 