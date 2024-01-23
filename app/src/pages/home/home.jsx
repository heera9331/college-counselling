import { useEffect } from "react";
import RecentRegisteredStudent from "../../components/students/RecentRegisteredStudent";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const Home = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <div>{token && <RecentRegisteredStudent />}</div>;
};

export default Home;
