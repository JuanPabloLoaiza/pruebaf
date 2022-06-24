import { Routes, Route } from 'react-router-dom';
import { AddTodo } from '../Components/AddTodo/AddTodo.jsx';
import { Home } from '../Components/Home/Home.jsx';
import { Navbar } from '../Components/Navbar/Navbar.jsx';
import { UpdateTodo } from '../Components/UpdateTodo/UpdateTodo.jsx';


export const AppRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/home" element={<Home />} />
                </Routes>
                <Routes>
                    <Route path="/addtodo" element={<AddTodo />} />
                </Routes>
                <Routes>
                    <Route path="/updatetodo" element={<UpdateTodo />} />
                </Routes>
            </div>
        </>
    )
}