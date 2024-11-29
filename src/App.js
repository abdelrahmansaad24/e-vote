import React, {useEffect, useState} from "react";
import Login from "./components/Login/Login";
import "./App.css";
import Cookies from 'js-cookie';

function App() {
    const [users, setUsers] = useState(() => {
        // Initialize state from cookies
        const value = Cookies.get('todo');
        return value ? JSON.parse(value) : [];
    });

    // Update the cookie whenever the todos change
    useEffect(() => {
        Cookies.set('todo', JSON.stringify(users), { expires: 30 });
    }, [users]);

    function handleADDuser(newTodo) {
        setUsers(prevTodos => [...prevTodos, newTodo]);
    }

    return (
        <div className="App">
            <Login users={users} handleADDuser={handleADDuser} />
        </div>
    );
}

export default App;
