import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './Login/Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Signup from './Signup/Signup.jsx'

const route=createBrowserRouter([
  {
    path:'/',
    element:<Login/>
   
  },
  {
     path:'/App',
    element:<App/>,
  },
  {
    path:'/Signup',
    element:<Signup/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route}/>
   
  </React.StrictMode>,
)
