import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import NotFound from '../components/app/lib/NotFound';
import Login from '../components/auth/Login';
import Recovery from '../components/auth/Recovery';

//Importar Componentes
function RouterAuth() {
  return (
    <div>
        <Router>
        <ToastContainer theme="dark" autoClose={2000} position="bottom-right"/>
          <Switch>
            <Route exact path="/recoverypsw" component={Recovery} />
            <Route exact path="/" component={Login} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
    </div>
  );
}
export default RouterAuth;