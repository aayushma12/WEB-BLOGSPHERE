import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Login';
import {Helmet} from "react-helmet";

function Login() {
  return (
    <>
      <div className='py-8'>
        <LoginForm />
        <p className='mt-4 text-center'>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </>
  );
}

export default Login;