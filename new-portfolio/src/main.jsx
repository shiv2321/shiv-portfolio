import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';


import Layout from './Layout.jsx'
import Home from './pages/Home.jsx';
import Experience from './pages/Experience.jsx';
import Skills from './pages/Skills.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';


const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,

    children: [
      { path: '/', element: <Home/> },

      { path: '/experience', element: <Experience/>},

      { path: '/skills', element: <Skills/>},

      { path: '/projects', element: <Projects/>},

      { path: '/contact', element: <Contact/> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
);