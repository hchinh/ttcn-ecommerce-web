import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Register from '../components/Register/Register';

function RegisterPage() {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.url} component={Register} />
      </Switch>
    </div>
  );
}
export default RegisterPage;
