import React from 'react';
import styles from './NavBar.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cartItemsCountSelector } from 'features/Cart/selectors';
function NavBar(props) {
  const cartItemsCount = useSelector(cartItemsCountSelector);

  return (
    <div className={styles.navBar}>
      <Link to={'/'} className={styles.header}>
        PickBazar
      </Link>
      <div className={styles.navbar_right}>
        <Link to="/cart">
          <div className={styles.navbar__cart}>
            <i className={styles.cart__image} class="fas fa-shopping-cart"></i>
            <div className={styles.cart__counter}>
              {!isNaN(cartItemsCount) ? cartItemsCount : 0}
            </div>
          </div>
        </Link>
        <li className={styles.nav__itemsaccount}>
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5c/Chelsea_crest.svg/1200px-Chelsea_crest.svg.png"
            alt=""
            className={styles.img}
          />
          <ul className={styles.nav__itemsmenu}>
            <Link to="/profile">
              <li className={styles.nav__menuitems}>Profile</li>
            </Link>
            <Link to="/login">
              <li className={styles.nav__menuitems}>Logout</li>
            </Link>
          </ul>
        </li>
      </div>
    </div>
  );
}

export default NavBar;
