import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home.jsx";
import Login from "./components/Login/Login";
import { useContext } from "react";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { AuthContext } from "./contexts/AuthContext";

import Test from "./components/Test/Test";

import AddStudent from "./components/Student/AddStudent.jsx";
import RemoveStudent from "./components/Student/RemoveStudent.jsx";
import ContactStudent from "./components/Student/ContactStudent.jsx";

import RegisterNewCounsellor from "./components/Counsellor/RegisterNewCounsellor.jsx";
import RemoveCounsellor from "./components/Counsellor/RemoveCounsellor.jsx";
import UpdateCounsellor from "./components/Counsellor/UpdateCounsellor.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import ViewReport from "./pages/ViewReport.jsx";
import StudentReportCard from "./components/Student/StudentReportCard.jsx";
import Profile from "./components/Counsellor/Profile.jsx";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          {token !== null && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/register-student" element={<AddStudent />} />
              <Route path="/home/remove-student" element={<RemoveStudent />} />
              {/* <Route path="/home/update-student/:userId" element={<UpdateStudent />} /> */}

              <Route
                path="/home/contact-student/:id"
                element={<ContactStudent />}
              />

              <Route
                path="/home/register-counsellor"
                element={<RegisterNewCounsellor />}
              />
              <Route
                path="/home/remove-counsellor"
                element={<RemoveCounsellor />}
              />
              <Route
                path="/home/update-counsellor"
                element={<UpdateCounsellor />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/view-reports" element={<ViewReport />} />
              <Route
                path="/view-report/student/:id"
                element={<StudentReportCard />}
              />
              {/* <Route
                path="/view-report/counsellor/:id"
                element={<CounsellorReportCard />}
              /> */}
              <Route path="/profile/:userId" element={<Profile />} />
            </>
          )}

          <Route path="/test" element={<Test />} />
          <Route path="*" element={<Login />} />
        </Routes>

        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
