import React from 'react';
import { RouterProvider } from 'react-router';
import Router from './router/router';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <RouterProvider router={Router}/>
  )
}

export default App