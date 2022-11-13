import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarMenu from '../../componentes/SidebarMenu';
import APIInvoke from '../../helpers/APIInvoke.js';
import { useNavigate } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/mensajes';
import Form from 'react-bootstrap/Form';

const UsuariosCrear = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        rol: '-8',
        especialidad: '-8',
        nombres: '',
        celular: '',
        correo: '',
        direccion: '',
        usuario_acceso: '',
        clave_acceso: '',
        estado: 1
    });

    const { rol, especialidad, nombres, celular, correo, direccion, usuario_acceso, clave_acceso } = usuario;

    const [arregloRoles, setArregloRoles] = useState([]);

    const comboRoles = async () => {
        const response = await APIInvoke.invokeGET(`/api/roles/combo-roles`);
        setArregloRoles(response);
    }

    const [arregloEspecialidades, setArregloEspecialidades] = useState([]);

    const comboEspecialidades = async () => {
        const response = await APIInvoke.invokeGET(`/api/especialidades`);
        setArregloEspecialidades(response);
    }

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        comboRoles();
        comboEspecialidades();
        document.getElementById('rol').focus();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if (usuario.rol === "-8") {
            mensajeConfirmacion('error', 'Debe seleccionar un rol.');
        } else if (usuario.especialidad === "-8") {
            mensajeConfirmacion('error', 'Debe seleccionar una especialidad.');
        } else {
            crear();
        }
    }

    const crear = async () => {
        const body = {
            idRol: usuario.rol,
            idEspecialidad: usuario.especialidad,
            nombresUsuario: usuario.nombres,
            celularUsuario: usuario.celular,
            correoUsuario: usuario.correo,
            direccionUsuario: usuario.direccion,
            usuarioAcceso: usuario.usuario_acceso,
            claveAcceso: usuario.clave_acceso,
            estadoUsuario: usuario.estado
        }

        const response = await APIInvoke.invokePOST(`/api/usuarios`, body);
        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            navigate("/usuarios-admin");
        } else {
            mensajeConfirmacion('error', response.msg);
        }

        setUsuario({
            rol: '',
            especialidad: '',
            nombres: '',
            celular: '',
            correo: '',
            direccion: '',
            usuario_acceso: '',
            clave_acceso: '',
            estado: 1
        });
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarMenu></SidebarMenu>

            <ContentHeader
                titulo={"Usuarios"}
                breadCrumb1={"Configuración"}
                breadCrumb2={"Listado Usuarios"}
                breadCrumb3={"Crear Usuarios"}
                ruta={"/usuarios-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <h5 className="card-title">Crear Usuarios</h5>

                                    <div className="row mb-3">
                                        <label htmlFor="rol" className="col-sm-2 col-form-label">Seleccione el rol</label>
                                        <div className="col-sm-10">
                                            <Form.Select aria-label="Default select example"
                                                style={{ cursor: 'pointer' }}
                                                id="rol"
                                                name="rol"
                                                value={rol}
                                                onChange={onChange}
                                                required
                                            >
                                                <option value="-8">SELECCIONE UN ROL</option>
                                                {
                                                    arregloRoles.map(
                                                        opcion =>
                                                            <option value={opcion._id} key={opcion._id}>{opcion.nombreRol}</option>
                                                    )
                                                }
                                            </Form.Select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="especialidad" className="col-sm-2 col-form-label">Seleccione la especialidad</label>
                                        <div className="col-sm-10">
                                            <Form.Select aria-label="Default select example"
                                                style={{ cursor: 'pointer' }}
                                                id="especialidad"
                                                name="especialidad"
                                                value={especialidad}
                                                onChange={onChange}
                                                required
                                            >
                                                <option value="-8">SELECCIONE UNA ESPECIALIDAD</option>
                                                {
                                                    arregloEspecialidades.map(
                                                        opcion =>
                                                            <option value={opcion._id} key={opcion._id}>{opcion.nombreEspecialidad}</option>
                                                    )
                                                }
                                            </Form.Select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="nombres" className="col-sm-2 col-form-label">Nombre</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control"
                                                id="nombres"
                                                name="nombres"
                                                value={nombres}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="celular" className="col-sm-2 col-form-label">Celular</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control"
                                                id="celular"
                                                name="celular"
                                                value={celular}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="correo" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control"
                                                id="correo"
                                                name="correo"
                                                value={correo}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="direccion" className="col-sm-2 col-form-label">Dirección</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control"
                                                id="direccion"
                                                name="direccion"
                                                value={direccion}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="usuario_acceso" className="col-sm-2 col-form-label">Usuario Acceso</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control"
                                                id="usuario_acceso"
                                                name="usuario_acceso"
                                                value={usuario_acceso}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="clave_acceso" className="col-sm-2 col-form-label">Clave Acceso</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control"
                                                id="clave_acceso"
                                                name="clave_acceso"
                                                value={clave_acceso}
                                                onChange={onChange}
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

export default UsuariosCrear;