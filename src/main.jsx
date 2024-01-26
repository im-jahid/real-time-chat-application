import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import firebaseConfig from './Authentication/firebaseConfig.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home';
import store from './store';
import { Provider } from 'react-redux';
import Login from './Pages/Login/Login'; 
import Registration from './Pages/Registration/Registration';
import ForgotPassword from './Pages/ForgotPaasword/ForgotPassword';
import EmailVerification from './Pages/EmailVerification/EmailVerification';
import UploadProfile from './Pages/UploadProfile/UploadProfile';
import Welcome from './Pages/Welcome/Welcome.jsx';
import Pop from './Pages/Pop/Pop.jsx';
import Massage from './Pages/Massage/Massage.jsx';
import Settings from './Pages/Settings/Settings.jsx';
import Notification from './Pages/Notification/Notification.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration/>,
  },
  {
    path: "/registration",
    element: <Registration/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/massage",
    element: <Massage/>,
  },
  {
    path: "/notification",
    element: <Notification/>,
  },
  {
    path: "/settings",
    element: <Settings/>,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword/>,
  },
  {
    path: "/emailverification",
    element: <EmailVerification/>,
  },
  {
    path: "/UploadProfile",
    element: <UploadProfile/>,
  },
  {
    path: "/Welcome",
    element: <Welcome/>,
  },
  {
    path: "/pop",
    element: <Pop/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
   <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
