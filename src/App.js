import { useState } from 'react';
import './App.css';
import { AuthContext } from './Auth/AuthContext';
import { Index } from './Routes/Index';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  return (
    <div className="App">
      <AuthContext.Provider value={{
        user,
        setUser
      }}>
        <Index />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
