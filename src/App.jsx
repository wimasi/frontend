import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AgendaCitasAdmin from './paginas/agenda_citas/AgendaCitasAdmin';
import AgendaCitasCrear from './paginas/agenda_citas/AgendaCitasCrear';
import AgendaCitasEditar from './paginas/agenda_citas/AgendaCitasEditar';
import CrearCuenta from './paginas/auth/CrearCuenta';
import Login from './paginas/auth/Login';
import EspecialidadesAdmin from './paginas/configuracion/EspecialidadesAdmin';
import EspecialidadesCrear from './paginas/configuracion/EspecialidadesCrear';
import EspecialidadesEditar from './paginas/configuracion/EspecialidadesEditar';
import RolesAdmin from './paginas/configuracion/RolesAdmin';
import RolesCrear from './paginas/configuracion/RolesCrear';
import RolesEditar from './paginas/configuracion/RolesEditar';
import UsuariosAdmin from './paginas/configuracion/UsuariosAdmin';
import UsuariosCrear from './paginas/configuracion/UsuariosCrear';
import UsuariosEditar from './paginas/configuracion/UsuariosEditar';
import DashBoard from './paginas/DashBoard';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/crear-cuenta' exact element={<CrearCuenta />} />
          <Route path='/menu-principal' exact element={<DashBoard />} />
          <Route path='/roles-admin' exact element={<RolesAdmin />} />
          <Route path='/roles-crear' exact element={<RolesCrear />} />
          <Route path='/roles-editar/:id' exact element={<RolesEditar />} />
          <Route path='/especialidades-admin' exact element={<EspecialidadesAdmin />} />
          <Route path='/especialidades-crear' exact element={<EspecialidadesCrear />} />
          <Route path='/especialidades-editar/:id' exact element={<EspecialidadesEditar />} />
          <Route path='/usuarios-admin' exact element={<UsuariosAdmin />} />
          <Route path='/usuarios-crear' exact element={<UsuariosCrear />} />
          <Route path='/usuarios-editar/:id' exact element={<UsuariosEditar />} />
          <Route path='/agenda-citas-admin' exact element={<AgendaCitasAdmin />} />
          <Route path='/agenda-citas-crear' exact element={<AgendaCitasCrear />} />
          <Route path='/agenda-citas-editar/:id' exact element={<AgendaCitasEditar />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
