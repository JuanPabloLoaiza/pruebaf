import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from './Modal';
import { AuthContext } from '../../Auth/AuthContext';

export const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const init = () => {
    if (user !== undefined && user !== null) {
      localStorage.setItem('user', JSON.stringify(user, user.logged = true));
    }
  }
  const [info, setInfo] = useState([]);
  const [modal, setModal] = useState(false);

  const getData = async () => {
    init();
    let email = (user !== undefined && user !== null) ? user?.email : null;
    const { data } = await axios.get(`http://localhost:3001/gettodos/${email}`);
    setInfo(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteTodo = async (id) => {
    const { statusText } = await axios.delete(`http://localhost:3001/deletetodo/${id}`);
    if (statusText === 'OK') {
      setModal(true);
      getData();
    }
  };

  return (
    <>
      <h3 className='mt-5'>Lista de tareas</h3>
      <table className='table'>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Título</th>
            <th scope="col">Descripción</th>
            <th scope="col">Realizado</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          {
            info && info.length > 0
              ?
              info.map((info) => (
                <tr key={info.id}>
                  <th scope='row'>{info.id}</th>
                  <td>{info.title}</td>
                  <td>{info.description}</td>
                  <td>{info.done === true ? 'Realizado' : 'No realizado'}</td>
                  <td><button onClick={() => {
                    deleteTodo(info.id)
                  }} className='btn btn-danger'
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop">Borrar</button></td>
                </tr>
              ))
              :
              null
          }
        </tbody>
      </table>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Eliminación de tarea</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              La tarea se eliminó correctamente
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
