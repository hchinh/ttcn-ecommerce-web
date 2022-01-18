import React from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemsCountSelector } from 'features/Cart/selectors';
import { logoutUser } from 'features/Auth/authSlice';
function NavBar(props) {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const avatarUrl = useSelector((state) => state.admin.avatarUrl);
  const loggedInUser = useSelector((state) => state.admin.current);
  const isLoggedIn = !!loggedInUser.id;

  const handleLogout = () => {
    const action = logoutUser();
    dispatch(action);
  };

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
        {!isLoggedIn && (
          <div className={styles.nav__login}>
            <Link to="/login">Login</Link>
          </div>
        )}
        {isLoggedIn && (
          <li className={styles.nav__itemsaccount}>
            <img src="/avatar.png" alt="Ảnh đại diện" className={styles.img} />
            <ul className={styles.nav__itemsmenu}>
              <Link to="/profile">
                <li className={styles.nav__menuitems}>Profile</li>
              </Link>
              <Link to="/">
                <li className={styles.nav__menuitems} onClick={handleLogout}>
                  Logout
                </li>
              </Link>
            </ul>
          </li>
        )}
      </div>
    </div>
  );
}

export default NavBar;
