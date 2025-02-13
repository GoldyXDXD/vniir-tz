import React from 'react';
import styles from './CompanyCard.module.css';

export const CompanyCard = ({ name, employees, salary, region, ogrn, inn, capital, type }) => {
  return (
    <a href='#' className={styles.card}>
      <div className={styles.info}>
        <h4 className={styles.name}>
          <img src="./Buildings.svg" alt="building" />
          <span>{name}</span>
        </h4>
        <div className={styles.details}>
          <div className={styles.amount}>
            <img src="./amount.svg" alt="salary" />
            <span>{employees} чел.</span>
            <img src="./CurrencyRub.svg" alt="CurrencyRub" />
            <span>{capital} руб.</span>
          </div>
          <div>
            <span className={styles.location}>
              <img src="./MapPin.svg" alt="location" />
              {region}
            </span>
          </div>
          <div className={styles.salary}>
            <span style={{ color: '#206FE5', fontWeight: 'bold' }}>Средняя заработная плата</span>
            <span>{salary} руб.</span>
          </div>

        </div>
      </div>
      <div className={styles.ids}>
        <div className={styles.type}>
          {type}
        </div>
        <div className={styles.idItems}>
          <div className={styles.idItem}>
            <span className={styles.idItemBlue}>ОГРН</span>
            <span>{ogrn}</span>
          </div>
          <div className={styles.idItem}>
            <span>ИНН</span>
            <span>{inn}</span>
          </div>
        </div>

      </div>
    </a>
  );
}; 