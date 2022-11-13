import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
                <Link className="nav-link collapsed" to={"/menu-principal"}>
                    <i className="bi bi-grid" />
                    <span>Dashboard</span>
                </Link>
            </li>{/* End Dashboard Nav */}

            <li className="nav-item">
                <Link className="nav-link collapsed" data-bs-target="#conf-nav" data-bs-toggle="collapse" to={"#"}>
                    <i className="bi bi-gear-fill" /><span>Configuración</span><i className="bi bi-chevron-down ms-auto" />
                </Link>
                <ul id="conf-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <Link to={"/roles-admin"}>
                            <i className="bi bi-circle" /><span>Roles</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/especialidades-admin"}>
                            <i className="bi bi-circle" /><span>Especialidades</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/usuarios-admin"}>
                            <i className="bi bi-circle" /><span>Usuarios</span>
                        </Link>
                    </li>
                </ul>
            </li>

            <li className="nav-item">
                <Link className="nav-link collapsed" data-bs-target="#citas-nav" data-bs-toggle="collapse" to={"#"}>
                    <i className="bi bi-telephone-fill" /><span>Citas Medicas</span><i className="bi bi-chevron-down ms-auto" />
                </Link>
                <ul id="citas-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <Link to={"/agenda-citas-admin"}>
                            <i className="bi bi-circle" /><span>Agenda Citas</span>
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
    );
}

export default Menu;