import React from "react"
import { Redirect } from "react-router-dom"
import AdvertisementForm from '../components/AdvertisementForm/AdvertisementForm';

// Dashboard
import Dashboard from "../components/pages/Dashboard"
import Login from "../components/pages/Login";
import SignUp from "../components/pages/SingUp";

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/advertisement-from/:actionType/:id",  component: AdvertisementForm },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/sign-up", component: SignUp },
]

export { userRoutes, publicRoutes }
