import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Anggota from './pages/Home.jsx';
import Tambah from './pages/Tambah.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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