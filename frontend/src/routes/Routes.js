import React from 'react'
import {BrowserRouter,Switch,Route}from 'react-router-dom';
//aqui se llaman las rutas que estan en el pages
import Inicio from  '../pages/Inicio';

//se le asigna una ruta y el componente
function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Inicio}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
