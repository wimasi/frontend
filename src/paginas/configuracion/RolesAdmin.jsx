import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarMenu from '../../componentes/SidebarMenu';
import APIInvoke from '../../helpers/APIInvoke.js';
import { Link } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/mensajes';

const RolesAdmin = () => {

    const [roles, setRoles] = useState([]);

    const listadoRoles = async () => {
        const response = await APIInvoke.invokeGET(`/api/roles`);
        setRoles(response);
    }

    useEffect(() => {
        listadoRoles();
    }, []);

    const borrarRol = async (e, id) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/roles/${id}`);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            listadoRoles();
        } else {
            mensajeConfirmacion('error', response.msg);
        }
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarMenu></SidebarMenu>

            <ContentHeader
                titulo={"Roles"}
                breadCrumb1={"Configuración"}
                breadCrumb2={"Listado Roles"}
                breadCrumb3={""}
                ruta={"/roles-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Listado de Roles</h5>
                                <div className="col-lg-12 mb-3">
                                    <Link className="btn btn-primary" to={"/roles-crear"}>Crear</Link>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '15%', textAlign: "center" }}>Id</th>
                                            <th style={{ width: '60%', textAlign: "center" }}>Rol</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Estado</th>
                                            <th style={{ width: '15%', textAlign: "center" }}>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            roles.map(
                                                elemento =>
                                                    <tr key={elemento._id}>
                                                        <td style={{ textAlign: "center" }}>{elemento._id}</td>
                                                        <td>{elemento.nombreRol}</td>
                                                        <td style={{ textAlign: "center" }}>
                                                            {elemento.estadoRol === 1 ? <span className='text-success'>Activo</span> : <span className='text-danger'>Inactivo</span>}
                                                        </td>
                                                        <td style={{ textAlign: "center" }}>
                                                            <Link to={`/roles-editar/${elemento._id}`} className="btn btn-primary btn-sm">
                                                                <i className="bi bi-pencil-square" title='Editar'></i>
                                                            </Link>
                                                            &nbsp;&nbsp;
                                                            <button onClick={(e) => borrarRol(e, elemento._id)} className="btn btn-danger btn-sm">
                                                                <i className="bi bi-trash-fill" title='Borrar'></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default RolesAdmin;