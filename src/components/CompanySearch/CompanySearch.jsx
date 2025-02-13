import React from 'react';
import { CompanyCard } from '../CompanyCard/CompanyCard';
import styles from './CompanySearch.module.css';

export const CompanySearch = ({ 
  companies, 
  searchQuery, 
  setSearchQuery,
  sortDirection,
  setSortDirection
}) => {
  const handleSort = () => {
    setSortDirection((prev) => {
      if (prev === 1) return -1;
      if (prev === -1) return 0;
      return 1;
    });
  };

  return (
    <div className={styles.searchSection}>
      <h3>Поиск по предприятиям</h3>
      <input 
        type="search" 
        placeholder="Введите ОГРН, ИНН или название компании" 
        className={styles.searchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className={styles.searchResults}>
        <div className={styles.resultsHeader}>
          <span>Найдено: {companies.length} предприятия</span>
          <div className={styles.sortOptions}>
            <span>Сортировать по:</span>
            <span onClick={handleSort}>
              Количество сотрудников 
              {sortDirection === 1 && ' ↓'}
              {sortDirection === -1 && ' ↑'}
            </span>
          </div>
        </div>
        <div className={styles.companiesList}>
          {companies.map(company => (
            <CompanyCard 
              key={company.company_id}
              name={company.company_name}
              employees={company.employees_count}
              salary={company.average_salary}
              region={company.region}
              ogrn={company.ogrn}
              inn={company.inn}
              capital={company.authorized_capital}
              type={company.ownership_type }
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 