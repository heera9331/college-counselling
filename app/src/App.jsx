/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useEffect } from "react";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./components/counsellor/Profile";
import ViewReport from "./pages/view-report/ViewReport";
import Logout from "./pages/Logout";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import useAuthContext from "./hooks/useAuthContext";
import LeftSidebar from "./components/Sidebar/LeftSidebar";
import HomePage from "./Home";

function App() {
  const { token } = useAuthContext();

  useEffect(() => {}, [token]);

  try {
    return (
      <BrowserRouter>
        <div className="m-auto" style={{ maxWidth: "1440px" }}>
          <Header />

          <div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Home />} />
              {token && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route path="/view-report" element={<ViewReport />} />
                </>
              )}
              {/* <Route path="/*" element={<Login />} /> */}
              <Route path="/*" element={<Login />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    );
  } catch (error) {
    alert("something went wrong, sorry for inconvenience");
  }
}

export default App;
