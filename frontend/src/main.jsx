import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PostDetails from './pages/PostDetails';
import NewPost from './pages/AddPost';
import EditProfile from './pages/EditProfile';
import AllPosts from './pages/AllPosts';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="post/:slug" element={<PostDetails />} />
          <Route path="add-post" element={<NewPost />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="all-posts" element={<AllPosts />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
