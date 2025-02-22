import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './services/mysql_auth_service';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-lightBlue'>
      <div className='w-full block'>
        <Header />
        <main className='min-h-screen'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (null);
}

export default App;
