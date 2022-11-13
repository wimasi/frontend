import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarMenu from '../../componentes/SidebarMenu';
import APIInvoke from '../../helpers/APIInvoke.js';
import { Link } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/mensajes';

const UsuariosAdmin = () => {

    const [usuarios, setUsuarios] = useState([]);

    const listadoUsuarios = async () => {
        const response = await APIInvoke.invokeGET(`/api/usuarios`);
        //console.log(response);
        setUsuarios(response);
    }

    useEffect(() => {
        listadoUsuarios();
    }, []);

    const borrar = async (e, id) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/usuarios/${id}`);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            listadoUsuarios();
        } else {
            mensajeConfirmacion('error', response.msg);
        }
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarMenu></SidebarMenu>

            <ContentHeader
                titulo={"Usuarios"}
                breadCrumb1={"Configuración"}
                breadCrumb2={"Listado Usuarios"}
                breadCrumb3={""}
                ruta={"/usuarios-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Listado de Usuarios</h5>
                                <div className="col-lg-12 mb-2 p-0">
                                    <Link className="btn btn-primary" to={"/usuarios-crear"}>Crear</Link>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '15%', textAlign: "center" }}>Id</th>
                                            <th style={{ width: '15%', textAlign: "center" }}>Rol</th>
                                            <th style={{ width: '15%', textAlign: "center" }}>Especialidad</th>
                                            <th style={{ width: '25%', textAlign: "center" }}>Nombre</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Usuario</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Estado</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            usuarios.map(
                                                elemento =>
                                                    <tr key={elemento._id}>
                                                        <td style={{ textAlign: "center" }}>{elemento._id}</td>
                                                        <td style={{ textAlign: "center" }}>{elemento.idRol.nombreRol}</td>
                                                        <td style={{ textAlign: "center" }}>{elemento.idEspecialidad.nombreEspecialidad}</td>
                                                        <td>{elemento.nombresUsuario}</td>
                                                        <td>{elemento.usuarioAcceso}</td>
                                                        <td style={{ textAlign: "center" }}>{elemento.estadoUsuario === 1 ? <span className='text-success'>Activo</span> : <span className='text-danger'>Inactivo</span>}</td>
                                                        <td style={{ textAlign: "center" }}>
                                                            <Link to={`/usuarios-editar/${elemento._id}`} className="btn btn-primary btn-sm">
                                                                <i className="bi bi-pencil-square" title='Editar'></i>
                                                            </Link>
                                                            &nbsp;&nbsp;
                                                            <button onClick={(e) => borrar(e, elemento._id)} className="btn btn-danger btn-sm">
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

export default UsuariosAdmin;