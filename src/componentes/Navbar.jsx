import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mensajeConfirmacion from '../helpers/mensajes.js';
import Logo from '../assets/img/logo.png';
import Profile from '../assets/img/profile-img.jpg';

const Navbar = () => {

    const navigate = useNavigate();

    const cerrarSesion = () => {
        //eliminar el localstore
        localStorage.removeItem("token");
        localStorage.removeItem("iduser");
        localStorage.removeItem("username");

        mensajeConfirmacion('success', 'Sesión finalizada correctamente.');

        //redireccion al login
        navigate("/");
    }

    const ocultarMenu = () => {
        document.body.classList.toggle("toggle-sidebar");
    }

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <Link to={"#"} className="logo d-flex align-items-center">
                    <img src={Logo} alt="Logo" />
                    <span className="d-none d-lg-block">App Medicina</span>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn" onClick={ocultarMenu} />
            </div>{/* End Logo */}

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    <li className="nav-item dropdown pe-3">
                        <Link className="nav-link nav-profile d-flex align-items-center pe-0" to={"#"} data-bs-toggle="dropdown">
                            <img src={Profile} alt="Profile" className="rounded-circle" />
                            <span className="d-none d-md-block dropdown-toggle ps-2">{localStorage.getItem("username")}</span>
                        </Link>{/* End Profile Iamge Icon */}
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{localStorage.getItem("username")}</h6>
                                <span>Conectado</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Link className="dropdown-item d-flex align-items-center" to={"#"}>
                                    <i className="bi bi-person" />
                                    <span>Mi Perfil</span>
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <div className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-box-arrow-right" />
                                    <span style={{ cursor: 'pointer' }} onClick={cerrarSesion}>Salir</span>
                                </div>
                            </li>
                        </ul>{/* End Profile Dropdown Items */}
                    </li>{/* End Profile Nav */}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;