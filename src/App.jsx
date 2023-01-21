import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Login from './components/Login';
import DataTable from './components/DataTable';
import NotFound from './components/NotFound';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './redux/slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Auth />} />
          <Route path="table" element={<DataTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
