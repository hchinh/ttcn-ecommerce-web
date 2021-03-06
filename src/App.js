import AdminFeature from 'features/Admin';
import LoginPage from 'features/Auth/pages/LoginPage';
import RegisterPage from 'features/Auth/pages/RegisterPage';
import CartFeature from 'features/Cart';
import ProfileFeature from 'features/Profile';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import UserLoginPage from './features/Auth/pages/UserLoginPage';
import Product from './features/Product/product.jsx';
import ProductDetail from './features/ProductDetail/ProductDetail';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Product} />
        <Route path="/login" component={UserLoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/admin/login" component={LoginPage} />
        <Route path="/admin" component={AdminFeature} />
        <Route path="/profile" component={ProfileFeature} />
        <Route path="/cart" component={CartFeature} />
        <Route path="/product/:id" exact component={ProductDetail} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
