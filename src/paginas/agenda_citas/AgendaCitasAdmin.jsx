import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarMenu from '../../componentes/SidebarMenu';
import APIInvoke from '../../helpers/APIInvoke.js';
import { Link } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/mensajes';

const AgendaCitasAdmin = () => {

    const [citas, setCitas] = useState([]);

    const listadoCitas = async () => {
        const response = await APIInvoke.invokeGET(`/api/agendacitas`);
        //console.log(response);
        setCitas(response);
    }

    useEffect(() => {
        listadoCitas();
    }, []);

    const borrar = async (e, id) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/agendacitas/${id}`);

        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            listadoCitas();
        } else {
            mensajeConfirmacion('error', response.msg);
        }
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarMenu></SidebarMenu>

            <ContentHeader
                titulo={"Agenda Citas"}
                breadCrumb1={"Citas Medicas"}
                breadCrumb2={"Listado Agenda Citas"}
                breadCrumb3={""}
                ruta={"/usuarios-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Listado de Agenda Citas</h5>
                                <div className="col-lg-12 mb-2 p-0">
                                    <Link className="btn btn-primary" to={"/agenda-citas-crear"}>Crear</Link>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '15%', textAlign: "center" }}>Id</th>
                                            <th style={{ width: '35%', textAlign: "center" }}>Medico</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Fecha</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Hora</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Consultorio</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Estado</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            citas.map(
                                                elemento =>
                                                    <tr key={elemento._id}>
                                                        <td style={{ textAlign: "center" }}>{elemento._id}</td>
                                                        <td>{elemento.idMedico.nombresUsuario}</td>
                                                        <td style={{ textAlign: "center" }}>{elemento.fechaCita}</td>
                                                        <td style={{ textAlign: "center" }}>{elemento.horaCita}</td>
                                                        <td style={{ textAlign: "center" }}>{elemento.numeroConsultorio}</td>
                                                        <td style={{ textAlign: "center" }}>
                                                            {elemento.estadoCita === 1 ? <span className='text-success'>Disponible</span> :
                                                                elemento.estadoCita === 2 ? <span className='text-primary'>Asignada</span> : <span className='text-danger'>Cancelada</span> 
                                                            }
                                                        </td>
                                                        <td style={{ textAlign: "center" }}>
                                                            <Link to={`/agenda-citas-editar/${elemento._id}`} className="btn btn-primary btn-sm">
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

export default AgendaCitasAdmin;