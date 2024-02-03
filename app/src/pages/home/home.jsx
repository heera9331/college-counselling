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
      <div className="grid" style={{ gridTemplateColumns: "2fr 9fr" }}>
        <LeftSidebar />
        <div>{token && <RecentRegisteredStudent />}</div>;
      </div>
    </>
  );
};

export default Home;
