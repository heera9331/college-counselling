import { useEffect } from "react";
import RecentRegisteredStudent from "../../components/students/RecentRegisteredStudent";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import verifyToken from "../../utils/VerifyToken";
import LeftSidebar from "../../components/Sidebar/LeftSidebar";

const Home = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    // token varification
    verifyToken(token);
  }, [token, navigate]);
  return (
    <>
      <LeftSidebar />
      <div className="ml-[200px] shadow-sm shadow-slate-600">
        {token && <RecentRegisteredStudent />}
      </div>
      ;
    </>
  );
};

export default Home;
