import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { Filters } from '../components/Filters/Filters';
import { Statistics } from '../components/Statistics/Statistics';
import { CompanySearch } from '../components/CompanySearch/CompanySearch';
import { useCompaniesData } from '../hooks/useCompaniesData';
import styles from './EnterprisesSearch.module.css';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

export const EnterprisesSearch = () => {
  const {
    companies,
    statistics,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    sortDirection,
    setSortDirection,
    resetFilters,
    salaryRange,
    regions
  } = useCompaniesData();

  return (
    <Layout>
      <Breadcrumb />
      <h1 className={styles.title}>ПОИСК ПРЕДПРИЯТИЙ</h1>
      <div className={styles.content}>
        <div className={styles.left}>
        <Filters
          regions={regions}
          filters={filters}
          setFilters={setFilters}
          salaryRange={salaryRange}
          onReset={resetFilters}
        />
        </div>
        
        <div className={styles.mainContent}>
          <Statistics statistics={statistics} />
          <CompanySearch
            companies={companies}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        </div>
      </div>
    </Layout>
  );
}; 