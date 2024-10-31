import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import Tambah from './pages/Tambah.jsx';
import Home from './pages/Home.jsx';
import Anggota from './pages/Anggota.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/anggota",
        element: <Anggota />,
      },
      {
        path: '/tambah',
        element: <Tambah/>
      }
      
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);