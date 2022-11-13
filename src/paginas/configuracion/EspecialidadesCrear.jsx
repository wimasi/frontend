import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarMenu from '../../componentes/SidebarMenu';
import APIInvoke from '../../helpers/APIInvoke.js';
import { useNavigate } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/mensajes';

const EspecialidadesCrear = () => {

    const navigate = useNavigate();

    const [especialidad, setEspecialidad] = useState({
        nombre: ''
    });

    const { nombre } = especialidad;

    const onChange = (e) => {
        setEspecialidad({
            ...especialidad,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById('nombre').focus();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        crearEspecialidad();
    }

    const crearEspecialidad = async () => {
        const body = {
            nombreEspecialidad: especialidad.nombre
        }

        const response = await APIInvoke.invokePOST(`/api/especialidades`, body);
        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            setEspecialidad({
                nombre: ''
            });
            navigate("/especialidades-admin");
        } else {
            mensajeConfirmacion('error', response.msg);
            setEspecialidad({
                nombre: ''
            });
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
                breadCrumb3={"Crear Especialidades"}
                ruta={"/especialidades-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <h5 className="card-title">Crear Especialidades</h5>

                                    <div className="row mb-3">
                                        <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control"
                                                id="nombre"
                                                name="nombre"
                                                value={nombre}
                                                onChange={onChange}
                                                placeholder="Ingrese el nombre de la especialidad."
                                                required
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default EspecialidadesCrear;