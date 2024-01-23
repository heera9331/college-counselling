/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Dialog from "../Dialog";
import { useState } from "react";
import RegisterStudent from "../students/RegisterStudent";
import ContactStudent from "../students/ContactStudent";
import UpdateStudent from "../students/UpdateStudent";
import RemoveStudent from "../students/RemoveStudent";

import RegisterNewCounsellor from "../counsellor/RegisterNewCounsellor";
import RemoveCounsellor from "../counsellor/RemoveCounsellor";
import UpdateCounsellor from "../counsellor/UpdateCounsellor";

import useAuthContext from "../../hooks/useAuthContext";

const LeftSidebar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { token, isAdmin } = useAuthContext();
  // nothing
  //   1: "registerStudent",
  //   2: "updateStudent",
  //   3: "removeStudent",
  // 4: Register New Counsellor

  const mapping = [
    { title: "default", element: <h1>default</h1> },
    {
      title: "Register Student",
      element: <RegisterStudent />,
    },
    {
      title: "Remove Student",
      element: <RemoveStudent />,
    },
    {
      title: "Update Student",
      element: <UpdateStudent />,
    },
    {
      title: "Contact Student",
      element: <ContactStudent />,
    },
    {
      title: "Appoint New Counsellor",
      element: <RegisterNewCounsellor />,
    },
    {
      title: "Remove Counsellor",
      element: <RemoveCounsellor />,
    },
    {
      title: "Update Counsellor",
      element: <UpdateCounsellor />,
    },
  ];

  useEffect(() => {}, [token, isAdmin]);

  return (
    <aside
      className="bg-primary flex text-white pl-6 pt-6 pr-2"
      style={{ minHeight: "100vh", minWidth: "150px" }}
    >
      {isDialogOpen && (
        <Dialog title={mapping[value].title} setDialogOpen={setIsDialogOpen}>
          {mapping[value].element}
        </Dialog>
      )}
      {token && (
        <div className="">
          <p className="text-2xl font-semibold">Student</p>
          <div className="options flex flex-col gap-2 my-2">
            <p
              className="bg-secondary rounded-sm p-1 hover:border border-sm"
              role="button"
              onClick={() => {
                setValue(1);
                setIsDialogOpen(!isDialogOpen);
                console.log(value);
              }}
            >
              Register
            </p>
            {isAdmin && (
              <>
                <p
                  className="bg-secondary rounded-sm p-1 hover:border border-sm"
                  role="button"
                  onClick={() => {
                    setValue(2);
                    setIsDialogOpen(!isDialogOpen);
                    console.log(value);
                  }}
                >
                  Remove
                </p>
                <p
                  className="bg-secondary rounded-sm p-1 hover:border border-sm"
                  role="button"
                  onClick={() => {
                    setValue(3);
                    setIsDialogOpen(!isDialogOpen);
                    console.log(value);
                  }}
                >
                  Update
                </p>
              </>
            )}
          </div>
          {isAdmin && (
            <>
              <p className="text-2xl font-semibold">Counsellor</p>
              <div className="options flex flex-col gap-2 my-2">
                <p
                  className="bg-secondary rounded-sm p-1 hover:border border-sm"
                  role="button"
                  onClick={() => {
                    setValue(5);
                    setIsDialogOpen(!isDialogOpen);
                    console.log(value);
                  }}
                >
                  Register
                </p>
                <p
                  className="bg-secondary rounded-sm p-1 hover:border border-sm"
                  role="button"
                  onClick={() => {
                    setValue(6);
                    setIsDialogOpen(!isDialogOpen);
                    console.log(value);
                  }}
                >
                  Remove
                </p>
                <p
                  className="bg-secondary rounded-sm p-1 hover:border border-sm"
                  role="button"
                  onClick={() => {
                    setValue(7);
                    setIsDialogOpen(!isDialogOpen);
                    console.log(value);
                  }}
                >
                  Update
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;
