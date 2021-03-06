import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Login from '../components/UserLogin/UserLogin';

function UserLoginPage() {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.url} component={Login} />
      </Switch>
    </div>
  );
}
export default UserLoginPage;
