import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Navbar from '../../componentes/Navbar';
import SidebarMenu from '../../componentes/SidebarMenu';
import APIInvoke from '../../helpers/APIInvoke.js';
import { useNavigate, useParams } from 'react-router-dom';
import mensajeConfirmacion from '../../helpers/mensajes';
import Form from 'react-bootstrap/Form';

const AgendaCitasEditar = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [citas, setCitas] = useState({
        medico: '-8',
        fechacita: '',
        horacita: '',
        consultorio: '',
        estado: ''
    });

    const { medico, fechacita, horacita, consultorio, estado } = citas;

    const [arregloMedicos, setArregloMedicos] = useState([]);

    const comboMedicos = async () => {
        const response = await APIInvoke.invokeGET(`/api/usuarios/combo-medicos`);
        setArregloMedicos(response);
    }

    const citaGuardada = async () => {
        const response = await APIInvoke.invokeGET(`/api/agendacitas/${id}`);
        setCitas({
            medico: response.idMedico,
            fechacita: response.fechaCita,
            horacita: response.horaCita,
            consultorio: response.numeroConsultorio,
            estado: response.estadoCita
        });
    }

    const onChange = (e) => {
        setCitas({
            ...citas,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        citaGuardada();
        comboMedicos();
        document.getElementById('medico').focus();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if (citas.medico === "-8") {
            mensajeConfirmacion('error', 'Debe seleccionar un medico.');
        } else {
            editar();
        }
    }

    const editar = async () => {
        const body = {
            idMedico: citas.medico,
            fechaCita: citas.fechacita,
            horaCita: citas.horacita,
            numeroConsultorio: citas.consultorio,
            estadoCita: citas.estado
        }

        const response = await APIInvoke.invokePUT(`/api/agendacitas/${id}`, body);
        if (response.ok === "SI") {
            mensajeConfirmacion('success', response.msg);
            navigate("/agenda-citas-admin");
        } else {
            mensajeConfirmacion('error', response.msg);
        }

        setCitas({
            medico: '-8',
            fechacita: '',
            horacita: '',
            consultorio: '',
            estado: ''
        });
    }

    return (
        <main id="main" className="main">
            <Navbar></Navbar>
            <SidebarMenu></SidebarMenu>

            <ContentHeader
                titulo={"Agenda Citas"}
                breadCrumb1={"Citas Medicas"}
                breadCrumb2={"Listado Agenda Citas"}
                breadCrumb3={"Editar Agenda Cita"}
                ruta={"/agenda-citas-admin"}
            />

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <h5 className="card-title">Editar Agenda Cita</h5>

                                    <div className="row mb-3">
                                        <label htmlFor="medico" className="col-sm-2 col-form-label">Seleccione el medico</label>
                                        <div className="col-sm-10">
                                            <Form.Select aria-label="Default select example"
                                                style={{ cursor: 'pointer' }}
                                                id="medico"
                                                name="medico"
                                                value={medico}
                                                onChange={onChange}
                                                required
                                            >
                                                <option value="-8">SELECCIONE</option>
                                                {
                                                    arregloMedicos.map(
                                                        opcion =>
                                                            <option value={opcion._id} key={opcion._id}>{opcion.nombresUsuario}</option>
                                                    )
                                                }
                                            </Form.Select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="fechacita" className="col-sm-2 col-form-label">Fecha</label>
                                        <div className="col-sm-10">
                                            <input type="date" className="form-control"
                                                id="fechacita"
                                                name="fechacita"
                                                value={fechacita}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="horacita" className="col-sm-2 col-form-label">Hora</label>
                                        <div className="col-sm-10">
                                            <input type="time" className="form-control"
                                                id="horacita"
                                                name="horacita"
                                                value={horacita}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="consultorio" className="col-sm-2 col-form-label">Consultorio</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control"
                                                id="consultorio"
                                                name="consultorio"
                                                value={consultorio}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="estado" className="col-sm-2 col-form-label">Seleccione el estado</label>
                                        <div className="col-sm-10">
                                            <Form.Select aria-label="Default select example"
                                                style={{ cursor: 'pointer' }}
                                                id="estado"
                                                name="estado"
                                                value={estado}
                                                onChange={onChange}
                                            >
                                                <option value="1">Disponible</option>
                                                <option value="2">Asignada</option>
                                                <option value="3">Cancelada</option>
                                            </Form.Select>
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

export default AgendaCitasEditar;