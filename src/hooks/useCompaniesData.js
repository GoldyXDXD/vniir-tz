import { useState, useMemo } from 'react';
import companiesData from '../data/data_rows_with_labels.json';
import regionsData from '../data/regions.json';

export const useCompaniesData = () => {
  const [filters, setFilters] = useState({
    region: '',
    salary: {
      min: null,
      max: null
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState(0); // 0 - исходное, 1 - по убыванию, -1 - по возрастанию

  // Получаем мин/макс зарплату из данных
  const salaryRange = useMemo(() => {
    const salaries = companiesData.companies.map(c => c.average_salary);
    return {
      min: Math.min(...salaries),
      max: Math.max(...salaries)
    };
  }, []);

  // Фильтрация компаний
  const filteredCompanies = useMemo(() => {
    return companiesData.companies
      .filter(company => {
        const matchesSearch = searchQuery === '' || 
          company.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.inn.toString().includes(searchQuery) ||
          company.ogrn.toString().includes(searchQuery);

        const matchesRegion = !filters.region || company.region === filters.region;

        const matchesSalary = (!filters.salary.min || company.average_salary >= filters.salary.min) &&
          (!filters.salary.max || company.average_salary <= filters.salary.max);

        return matchesSearch && matchesRegion && matchesSalary;
      })
      .sort((a, b) => {
        if (sortDirection === 0) return 0;
        return sortDirection * (b.employees_count - a.employees_count);
      });
  }, [filters, searchQuery, sortDirection]);

  // Расчет статистики
  const statistics = useMemo(() => {
    console.log('Recalculating statistics', {
      filteredCompanies: filteredCompanies.length,
      filters,
      searchQuery
    });

    if (filteredCompanies.length === 0) {
      return {
        averageSalary: 0,
        totalEmployees: 0,
        ownershipStats: {
          'Частная': 0,
          'Государственная': 0,
          'Муниципальная': 0
        }
      };
    }

    const avgSalary = Math.round(
      filteredCompanies.reduce((sum, company) => sum + company.average_salary, 0) / 
      filteredCompanies.length
    );

    const totalEmpl = filteredCompanies.reduce((sum, company) => 
      sum + company.employees_count, 0
    );

    // Подсчет компаний по типам собственности
    const ownershipCount = filteredCompanies.reduce((acc, company) => {
      acc[company.ownership_type] = (acc[company.ownership_type] || 0) + 1;
      return acc;
    }, {});

    // Расчет процентов с учетом особых случаев
    const total = Object.values(ownershipCount).reduce((a, b) => a + b, 0);
    
    let ownershipPercentages = {
      'Частная': 0,
      'Государственная': 0,
      'Муниципальная': 0
    };

    if (total === 1) {
      // Если только одна компания
      const type = Object.keys(ownershipCount)[0];
      ownershipPercentages[type] = 100;
    } else if (total === 3 && Object.values(ownershipCount).every(count => count === 1)) {
      // Если ровно 3 компании по одной каждого типа
      Object.keys(ownershipPercentages).forEach(key => {
        ownershipPercentages[key] = 33;
      });
    } else {
      // Обычный расчет процентов
      Object.entries(ownershipCount).forEach(([key, value]) => {
        ownershipPercentages[key] = Math.round((value / total) * 100);
      });
    }

    return {
      averageSalary: avgSalary,
      totalEmployees: totalEmpl,
      ownershipStats: ownershipPercentages
    };
  }, [filteredCompanies]);

  const resetFilters = () => {
    setFilters({
      region: '',
      salary: {
        min: null,
        max: null
      }
    });
    setSearchQuery('');
    setSortDirection(0);
  };

  return {
    companies: filteredCompanies,
    statistics,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    sortDirection,
    setSortDirection,
    resetFilters,
    salaryRange,
    regions: regionsData.regions
  };
}; 