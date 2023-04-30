import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import { Login } from './Pages/Login'
import { Register } from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import { Logout } from './Pages/Logout'
import { PrivateRoute } from './Pages/PrivateRoute/PrivateRoute';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='dashboard' element={<PrivateRoute> <Dashboard /> </PrivateRoute>}
          />
          <Route path='logout' element={<Logout />} />
        </Routes>
        <ToastContainer />
      </Layout>

    </div>
  );
}


export default App;
