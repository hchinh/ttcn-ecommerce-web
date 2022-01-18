import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'features/Auth/authSlice';
import { useSelector } from 'react-redux';
import { cartItemsCountSelector } from 'features/Cart/selectors';

function NavBar() {
  const dispatch = useDispatch();
  const [navBar, setNavBar] = useState(false);

  const cartItemsCount = useSelector(cartItemsCountSelector);
  const avatarUrl = useSelector((state) => state.admin.avatarUrl);
  const loggedInUser = useSelector((state) => state.admin.current);
  const isLoggedIn = !!loggedInUser.id;

  const changeBackgroundColor = () => {
    if (window.scrollY >= 400) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  const handleLogout = () => {
    const action = logoutUser();
    dispatch(action);
  };

  window.addEventListener('scroll', changeBackgroundColor);

  return (
    <div className={navBar ? 'navBar active ' : 'navBar '}>
      <Link to={'/'} className="header">
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
            <img src="avatar.png" alt="Ảnh đại diện" className={styles.img} />
            <ul className={styles.nav__itemsmenu}>
              <Link to="/profile">
                <li className={styles.nav__menuitems}>Profile</li>
              </Link>

              <li className={styles.nav__menuitems} onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </li>
        )}
      </div>
    </div>
  );
}

export default NavBar;
