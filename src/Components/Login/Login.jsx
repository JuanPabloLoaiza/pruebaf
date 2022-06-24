import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { LoginForm } from "./LoginForm";
import { AuthContext } from "../../Auth/AuthContext";

import "./Login.css";

export const Login = () => {
  const [render, setRender] = useState(true);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [{ email, password }, handleInputChange, reset] = LoginForm({
    email: "",
    password: "",
  });

  const LoginAuth = async (e) => {
    e.preventDefault();
    let { data } = await LoginPage();
    let user = data.filter(
      (users) => users.email === email && users.password === password
    );
    setRender(user.length > 0);
    if (user.length > 0) {
      setUser(user[0], user.logged = true);
      user = user[0];
      user.logged = true;
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home', {
        replace: true,
      });
    }
    reset();
  };

  return (
    <>
      <form style={{ padding: "70px" }}>
        <div className="row divs">
          <div className="col-md-3 divs">
            <h4 className="mb-3">Inicio de sesión</h4>
            {
              render
                ?
                null
                :
                (
                  <span className="mb-5 textSpan">
                    Usuario o contraseña incorrectos
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
            <small>Si no tienes cuenta, <Link to='/register'>regístrate</Link></small>
          </div>
        </div>
        <div className="row divs">
          <div className="col-md-3 divs">
            <button
              onClick={LoginAuth}
              type="submit"
              className="btn btn-primary mt-3 btn-block"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
