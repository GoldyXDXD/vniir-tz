import { NavLink } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

const Breadcrumb = () => {
    return (
        <nav className={styles.breadcrumbs}>
            <a href="/">
                <img src="/breadcrumb.svg" alt="Главная" />
                <span>Главная</span>
            </a>
            <span className={styles.separator}>/</span>
            <a href="/enterprises">Предприятия</a>
        </nav>
    );
};

export default Breadcrumb;
