import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';

import '../Login/Login.css';
import { RegisterForm } from './RegisterForm';

export const Register = () => {
    const { setUser } = useContext(AuthContext);
    const [message, setMessage] = useState(true);
    const navigate = useNavigate();

    const [{ email, password }, handleInputChange, reset] = RegisterForm({
        email: '',
        password: '',
    });

    const RegisterAuth = async (e) => {
        e.preventDefault();
        let user = {
            email,
            password
        };
        let data = await axios.post('http://localhost:3001/adduser', user);
        if (data.data.message === 'duplicate key value violates unique constraint "User_pkey"') {
            setMessage(false);
            reset();
        }
        else if (data.statusText === 'OK') {
            setUser(user);
            user.logged = true;
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/home', {
                replace: true,
            });
        }
    };

    return (
        <>
            <form style={{ padding: "70px" }}>
                <div className="row divs">
                    <div className="col-md-3 divs">
                        <h4 className="mb-3">Registro</h4>
                        {
                            message
                                ?
                                null
                                :
                                (
                                    <span className="mb-5 textSpan">
                                        Ya existe un usuario con este correo electrónico
                                    </span>
                                )
                        }
                    </div>
                </div>
                <div className="row divs">
                    <div className="col-md-3 divs">
                        <label className="mb-3">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control mb-3"
                            autoComplete="off"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row divs">
                    <label className="mb-3">Contraseña</label>
                    <div className="col-md-3 divs">
                        <input
                            type="password"
                            name="password"
                            className="form-control mb-1"
                            autoComplete="off"
                            value={password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row divs">
                    <div className="col-md-3 divs">
                        <small>Si ya tienes cuenta, <Link to='/login'>inicia sesión</Link></small>
                    </div>
                </div>
                <div className="row divs">
                    <div className="col-md-3 divs">
                        <button
                            onClick={RegisterAuth}
                            type="submit"
                            className="btn btn-primary mt-3 btn-block"
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
