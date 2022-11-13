import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarMenu from '../../componentes/SidebarMenu';
import APIInvoke from '../../helpers/APIInvoke.js';
import { Link } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/mensajes';

const EspecialidadesAdmin = () => {

    const [especialiadades, setEspecialidades] = useState([]);

    const listadoEspecialidades = async () => {
        const response = await APIInvoke.invokeGET(`/api/especialidades`);
        setEspecialidades(response);
    }

    useEffect(() => {
        listadoEspecialidades();
    }, []);

    const borrar = async (e, id) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/especialidades/${id}`);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            listadoEspecialidades();
        } else {
            mensajeConfirmacion('error', response.msg);
        }
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarMenu></SidebarMenu>

            <ContentHeader
                titulo={"Especialidades"}
                breadCrumb1={"Configuración"}
                breadCrumb2={"Listado Especialidades"}
                breadCrumb3={""}
                ruta={"/especialidades-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Listado de Especialidades</h5>
                                <div className="col-lg-12 mb-3">
                                    <Link className="btn btn-primary" to={"/especialidades-crear"}>Crear</Link>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '15%', textAlign: "center" }}>Id</th>
                                            <th style={{ width: '75%', textAlign: "center" }}>Especialidad</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            especialiadades.map(
                                                elemento =>
                                                    <tr key={elemento._id}>
                                                        <td style={{ textAlign: "center" }}>{elemento._id}</td>
                                                        <td>{elemento.nombreEspecialidad}</td>
                                                        <td style={{ textAlign: "center" }}>
                                                            <Link to={`/especialidades-editar/${elemento._id}`} className="btn btn-primary btn-sm">
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

export default EspecialidadesAdmin;