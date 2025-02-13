import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './Filters.module.css';

export const Filters = ({
  regions,
  filters,
  setFilters,
  salaryRange,
  onReset
}) => {
  const handleRegionChange = (e) => {
    setFilters(prev => ({
      ...prev,
      region: e.target.value
    }));
  };

  const handleSalaryChange = (type) => (e) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setFilters(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [type]: value
      }
    }));
  };

  const handleRangeChange = (e) => {
    const [min, max] = e.target.value.split(',').map(Number);
    setFilters(prev => ({
      ...prev,
      salary: {
        min,
        max
      }
    }));
  };

  return (
    <aside className={styles.filters}>
      <h2 className={styles.title}>
        <span>Фильтры</span>
        <img src="/FunnelSimple.svg" alt="Фильтры" />
      </h2>
      <div className={styles.filterGroup}>
        <select
          value={filters.region}
          onChange={handleRegionChange}
          className={styles.regionInput}
        >
          <option value="">Все субъекты РФ</option>
          {regions.map(region => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <div className={styles.salaryFilter}>
          <label>Средняя заработная плата (руб.)</label>
          <div className={styles.rangeInputs}>
            <input
              type="number"
              min={salaryRange.min}
              max={salaryRange.max}
              value={filters.salary.min || ''}
              onChange={handleSalaryChange('min')}
              placeholder={salaryRange.min}
              className={styles.input}
            />
            <span className={styles.rangeDash}>—</span>
            <input
              type="number"
              min={salaryRange.min}
              max={salaryRange.max}
              value={filters.salary.max || ''}
              onChange={handleSalaryChange('max')}
              placeholder={salaryRange.max}
              className={styles.input}
            />
          </div>
          <div className={styles.rangeSliderContainer}>
            <Slider
              range
              min={salaryRange.min}
              max={salaryRange.max}
              value={[
                filters.salary.min || salaryRange.min,
                filters.salary.max || salaryRange.max
              ]}
              onChange={([min, max]) => {
                setFilters(prev => ({
                  ...prev,
                  salary: { min, max }
                }));
              }}
              railStyle={{ backgroundColor: '#D1D1D6', height: 2 }}
              trackStyle={[{ backgroundColor: '#007AFF', height: 2 }]}
              handleStyle={[
                {
                  backgroundColor: '#007AFF',
                  border: 'none',
                  width: 16,
                  height: 16,
                  marginTop: -7,
                  opacity: 1,
                },
                {
                  backgroundColor: '#007AFF',
                  border: 'none',
                  width: 16,
                  height: 16,
                  marginTop: -7,
                  opacity: 1,
                },
              ]}
            />
          </div>
        </div>

        <button
          className={styles.resetButton}
          onClick={onReset}
        >
          Сбросить фильтры
        </button>
      </div>
    </aside>
  );
}; 