import { NavLink } from 'react-router';
import styles from './NavigationBar.module.css';

const NavigationBar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLinks}>
        <NavLink 
          to="/orders" 
          className={({ isActive }) => isActive ? styles.activeLink : styles.navItem}
        >
          <h3>Orders</h3>
        </NavLink>
        <NavLink 
          to="/designers" 
          className={({ isActive }) => isActive ? styles.activeLink : styles.navItem}
        >
          <h3>Designers</h3>
        </NavLink>
        <NavLink 
          to="/collections" 
          className={({ isActive }) => isActive ? styles.activeLink : styles.navItem}
        >
          <h3>Collections</h3>
        </NavLink>
      </div>
    </div>
  );
}

export default NavigationBar;


