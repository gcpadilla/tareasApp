import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage'
import Tareas from './pages/Tareas'
import EditTareas from './pages/EditTarea'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/tareas" component={Tareas} />
        <Route path="/editar/:id" exact component={EditTareas} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
