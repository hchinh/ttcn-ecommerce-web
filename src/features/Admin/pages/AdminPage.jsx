import SideBar from 'components/SideBar/SideBar';
import TopBar from 'components/TopBar/TopBar';
import StorageKeys from 'constants/storage-keys';
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Category from '../components/Category/Category';
import Coupon from '../components/Coupon/Coupon';
import Customer from '../components/Customer/Customer';
import Dashboard from '../components/Dashboard/Dashboard';
import Feedback from '../components/Feedback/Feedback';
import Product from '../components/Product/Product';
import './Admin.scss';
import ProcessOrder from '../components/ProcessOrder/employee';
import Employee from '../components/employee/employee';

AdminPage.propTypes = {};

function AdminPage(props) {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem(StorageKeys.ID);
    if (!token) {
      history.replace('/admin/login');
    }
  });

  return (
    <div>
      <TopBar />
      <div className="main-contain">
        <SideBar />
        <Switch>
          <Route path="/admin" exact>
            <Dashboard />
          </Route>

          <Route path="/admin/categories">
            <Category />
          </Route>

          <Route path="/admin/customers">
            <Customer />
          </Route>

          <Route path="/admin/products">
            <Product />
          </Route>
          <Route path="/admin/coupons">
            <Coupon />
          </Route>

          <Route path="/admin/feedbacks">
            <Feedback />
          </Route>

          <Route path="/admin/employees">
            <Employee />
          </Route>
          <Route path="/admin/processOrders">
            <ProcessOrder />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default AdminPage;
