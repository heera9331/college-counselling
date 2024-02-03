import { useLocation } from "react-router-dom";
import homeImage from "./assets/media/images/homepage.jpg";
import dashboardImg from "./assets/media/images/dashboard.jpg";
import reportsImg from "./assets/media/images/reports.jpg";
const HomePage = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div className={"scroll-smooth"}>
      <div className="grid grid-cols-2 items-center justify-center gap-4 h-[80vh] px-4 sm:grid-cols">
        <div className="px-10">
          <div className="w-[290px] py-4">
            <h1 className="text-3xl font-bold text-blue-900">CounselPro Connect</h1>
            <p className="text-right text-italic">Now counseling is easy</p>
          </div>
          <p>
            A software that help you to handle your counseling in your
            organization, it provide many features of counseling like tracking
            status, interested, courses and enrolled students
          </p>
        </div>
        <div className="">
          <img className="w-[512px]" src={`${homeImage}`} alt="home" />
        </div>
      </div>
      {/*  features*/}
      <div className={"flex flex-col "}>
        <h2 className={"text-3xl font-bold py-2"}>Features</h2>
        <div>
          <h2 className={"text-2xl font-semibold py-2"}>Interactive Dashboard</h2>
          <img className="w-100" src={`${dashboardImg}`} alt="dashboard"/>
        </div>
        <div>
          <h2 className={"text-2xl font-semibold py-2"}>Custom Reports</h2>
          <img className="w-100" src={`${reportsImg}`} alt="reports"/>
        </div>
      </div>
      {/* Contact */}
      <div id={"/#contact"} className={"m-auto"}>
      <h2 className={"text-3xl font-bold py-2"}>Contact</h2>
        <embed src={"https://heera-singh.netlify.app/"} className={"w-[100%] h-[100vh]"}/>
      </div>


    </div>
  );
};
export default HomePage;
