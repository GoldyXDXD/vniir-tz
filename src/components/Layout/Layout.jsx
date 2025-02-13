import React from 'react';
import styles from './Layout.module.css';

export const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="Логотип" />
          <span>
            Система аналитической поддержки
            <br />
            развития радиоэлектроники
          </span>
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}; 