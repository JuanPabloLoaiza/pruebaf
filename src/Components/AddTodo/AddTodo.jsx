import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Auth/AuthContext';
import { AddTodoForm } from './AddTodoForm';

export const AddTodo = () => {

    const { user } = useContext(AuthContext);
    let [{ title, description, done }, handleInputChange, reset] = AddTodoForm({
        title: '',
        description: '',
        done: 'No realizado'
    });

    const AddnewTodo = async (e) => {
        e.preventDefault();
        const realized = done === 'Realizado' ? true : false;
        const todo = {
            title: title,
            description: description,
            done: realized,
            email: user?.email
            
        };
        await axios.post('http://localhost:3001/addtodo', todo);
        reset();
    };

    return (
        <>
            <form style={{ padding: "70px" }}>
                <div className="row divs">
                    <div className="col-md-5 divs">
                        <h4 className="mb-5">Agregar una nueva tarea</h4>
                    </div>
                </div>
                <div className="row divs">
                    <div className="col-md-3 divs">
                        <label className="mb-3">Título</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control mb-3"
                            autoComplete="off"
                            value={title}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row divs">
                    <div className="col-md-3 divs">
                        <label className="mb-3">Descripción</label>
                        <input
                            type="text"
                            name="description"
                            className="form-control mb-3"
                            autoComplete="off"
                            value={description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row divs">
                    <div className="col-md-2 divs">
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name='done'
                                value='Realizado'
                                onChange={handleInputChange}
                                checked={done === 'Realizado'} />
                            <label className="form-check-label">
                                Realizado
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name='done'
                                checked={done === 'No realizado'}
                                value='No realizado'
                                onChange={handleInputChange} />
                            <label className="form-check-label">
                                No realizado
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row divs">
                    <div className="col-md-3 mt-3 divs">
                        <button
                            onClick={AddnewTodo}
                            type="submit"
                            className="btn btn-primary mt-1 btn-block"
                            disabled={title === '' || description === ''}
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        >
                            Agregar
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Creación de tarea</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                La tarea se agregó correctamente
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
