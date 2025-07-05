import React, { Children } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Dashboard from "./components/loggedInPages/Dashboard";
import SignUp from "./components/loggedOutPages/SignUp";
import Login from "./components/loggedOutPages/Login";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const AuthLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
