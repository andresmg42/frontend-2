import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

//Importar Componentes
import NotFound from '../components/app/lib/NotFound';
import Create from '../components/app/companies/Create';
import Profile from '../components/app/users/Profile';
import Dashboard from '../components/app/dashboard/dashboard';
import Sidebar from '../components/app/lib/Sidebar';
import User from '../components/app/users/User';
import Test from '../components/pruebas/Test';
import Companies from '../components/app/companies/Companies';


export default class RouterApp extends Component {

  render() {
    return (
      <div>
        <Router>
          <Sidebar />
          <ReactTooltip />
          <ToastContainer theme="dark" autoClose={2000} position="bottom-right" />
          <Switch>
            <Route path="/test" component={Test} />
            
            {/** Rutas Usuarios */}
            <Route path="/profile" component={Profile} />
            <Route path="/users" component={User} />
            <Route path="/users/edit/:id" component={User}/>

            {/** Rutas Companies */}
            <Route path="/companies/edit/:id" component={Create} />
            <Route path="/companies/create" component={Create} />
            <Route exact path="/companies" component={Companies} />
            
            {/** Rutas Generales */}
            <Route exact path="/" component={Dashboard} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    )
  }
}
