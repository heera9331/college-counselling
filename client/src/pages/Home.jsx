import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext, useAuthContext } from "../contexts/AuthContext";

import RecentRegisteredStudent from "../components/Student/RecentRegisteredStudent";
import UpdateStudent from "../components/Student/UpdateStudent";
import RemoveStudent from "../components/Student/RemoveStudent";
import AddStudent from "../components/Student/AddStudent";

import RegisterNewCounsellor from "../components/Counsellor/RegisterNewCounsellor";
import RemoveCounsellor from "../components/Counsellor/RemoveCounsellor";
import UpdateCounsellor from "../components/Counsellor/UpdateCounsellor";

const Home = () => {
  const navigate = useNavigate();
  const { token, isAdmin, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (token === "null") navigate("/login");
  }, [token, navigate]);

  /**
   * this state is store information of other componenet is opened of not?
   * by default we render only one component that is default component.
   *
   */
  const [isAnother, setIsAnother] = useState("default");
  return (
    <>
      <div className="">
        <div className="row position-relative" style={{ top: "60px" }}>
          <div className="col-sm-2 border">
            <div className="container d-flex flex-column">
              <h3 className="my-2">Student</h3>
              <Link
                // to={"register-student"}
                onClick={() => {
                  setIsAnother(
                    isAnother === "default" ? "register-student" : "default"
                  );
                }}
                className="link btn btn-success my-2"
              >
                Register
              </Link>

              {isAdmin === "true" || isAdmin === true ? (
                <>
                  <Link
                    // to={"remove-student"}
                    className="link btn btn-danger my-2"
                    onClick={() => {
                      setIsAnother(
                        isAnother === "default" ? "remove-student" : "default"
                      );
                    }}
                  >
                    Remove
                  </Link>
                  <Link
                    // to={"update-student"}
                    className="link btn btn-warning my-2"
                    onClick={() => {
                      setIsAnother(
                        isAnother === "default" ? "update-student" : "default"
                      );
                    }}
                  >
                    Update
                  </Link>
                </>
              ) : (
                ""
              )}
            </div>

            {isAdmin === "true" || isAdmin === true ? (
              <div className="container my-2 d-flex flex-column">
                <h3 className="my-2">Counsellor</h3>
                <Link
                  // to={"register-counsellor"}
                  className="link btn btn-success my-2"
                  onClick={() => {
                    setIsAnother(
                      isAnother === "default"
                        ? "register-counsellor"
                        : "default"
                    );
                  }}
                >
                  Register
                </Link>
                <Link
                  // to={"remove-counsellor"}
                  className="link btn btn-danger my-2"
                  onClick={() => {
                    setIsAnother(
                      isAnother === "default" ? "remove-counsellor" : "default"
                    );
                  }}
                >
                  Remove
                </Link>
                <Link
                  // to={"update-counsellor"}
                  className="link btn btn-warning my-2"
                  onClick={() => {
                    setIsAnother(
                      isAnother === "default" ? "update-counsellor" : "default"
                    );
                  }}
                >
                  Update
                </Link>
              </div>
            ) : null}
          </div>

          <div className="col-sm-10 border">
            {isAnother === "default" ? (
              <>
                {/* <SearchStudent /> */}
                <RecentRegisteredStudent />
              </>
            ) : (
              ""
            )}
            {isAnother === "register-student" ? <AddStudent /> : ""}
            {isAnother === "remove-student" ? <RemoveStudent /> : ""}
            {isAnother === "update-student" ? <UpdateStudent /> : ""}
            {isAnother === "register-counsellor" ? (
              <RegisterNewCounsellor />
            ) : (
              ""
            )}
            {isAnother === "remove-counsellor" ? <RemoveCounsellor /> : ""}
            {isAnother === "update-counsellor" ? <UpdateCounsellor /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
