import React from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LinkPage from './components/LinkPage';
import Unauthorized from './components/Unauthorized';
import Missing from './components/Missing';
import Home from './components/HomePage';
import Admin from './components/Admin';
import Editor from './components/Editor';
import Lounge from './components/Lounge';
import RequireAuth from './components/RequireAuth';

const ROLES = { 'admin': 'ADMIN', 'user': 'USER', 'editor': 'EDITER' }

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes... */}
        < Route path='/linkpage' element={<LinkPage />} />
        < Route path='/login' element={<Login />} />
        < Route path='/register' element={<Register />} />
        < Route path='/unauthorized' element={<Unauthorized />} />
        {/* Private roures... */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}> */}
        < Route path='/' element={<Home />} />
        {/* </Route> */}

        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          < Route path='/admin' element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.editor]} />}>
          < Route path='/editor' element={<Editor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.admin, Route.editor]} />}>
          < Route path='/lounge' element={<Lounge />} />
        </Route>

        {/* catch All */}
        < Route path='*' element={<Missing />} />


      </Route>
    </Routes>

  )
}

