import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UpdateTodoForm } from './UpdateTodoForm';
import { AuthContext } from '../../Auth/AuthContext';

export const UpdateTodo = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [todo, setTodo] = useState();

    let [{ id }, handleInputChange, reset] = UpdateTodoForm({
        id: '',
    });

    const handleInputChangeTodo = ({ target }) => {
        setTodo({
            ...todo,
            [target.name]: target.value
        });
    };

    const resetTodo = () => {
        setTodo();
    };

    const getData = async () => {
        const { data } = await axios.get(`http://localhost:3001/gettodos/${user?.email}`);
        setData(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const updateATodo = async (e) => {
        e.preventDefault();
        const updateTodo = {
            id: parseInt(id),
            title: todo.title,
            description: todo.description,
            done: todo.done === 'Realizado' ? true : false,
            email: user?.email
        };
        await axios.put('http://localhost:3001/puttodo', updateTodo);
        resetTodo();
        reset();
    };

    const findTodo = (e) => {
        e.preventDefault();
        const todoId = parseInt(id);
        const newTodo = data.filter((todo) => todoId === todo.id);
        if (newTodo.length > 0) {
            newTodo[0].done = newTodo[0].done === true ? 'Realizado' : 'No realizado';
            setTodo(newTodo.length > 0 ? newTodo[0] : undefined);
        }
    };

    return (
        <>
            <form style={{ padding: "70px" }}>
                <div className="row divs">
                    <div className="col-md-5 divs">
                        <h4 className="mb-5">Actualizar una tarea</h4>
                    </div>
                </div>
                <div className="row divs">
                    <div className="col-md-2">
                        <label>Tarea a buscar:</label>
                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            name="id"
                            className="form-control"
                            value={id}
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-2 mb-5">
                        <button onClick={findTodo} className='btn btn-outline-primary'>Buscar</button>
                    </div>
                </div>
                {
                    todo !== undefined && todo !== {} ?
                        (
                            <div>
                                <div className="row divs">
                                    <div className="col-md-3 divs">
                                        <label className="mb-3">Título</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control mb-3"
                                            autoComplete="off"
                                            value={todo?.title}
                                            onChange={handleInputChangeTodo}
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
                                            value={todo?.description}
                                            onChange={handleInputChangeTodo}
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
                                                onChange={handleInputChangeTodo}
                                                checked={todo?.done === 'Realizado'} />
                                            <label className="form-check-label">
                                                Realizado
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input"
                                                type="radio"
                                                name='done'
                                                checked={todo?.done === 'No realizado'}
                                                value='No realizado'
                                                onChange={handleInputChangeTodo} />
                                            <label className="form-check-label">
                                                No realizado
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row divs">
                                    <div className="col-md-3 mt-3 divs">
                                        <button
                                            onClick={updateATodo}
                                            type="submit"
                                            className="btn btn-warning mt-1 btn-block"
                                            disabled={todo?.title === '' || todo?.description === ''}
                                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                        >
                                            Actualizar
                                        </button>
                                    </div>
                                </div>
                            </ div>
                        ) :
                        (
                            null
                        )
                }

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Actualización de tarea</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                La tarea se actualizó correctamente
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
