"use client";
import "@/app/globals.css";
import React, { useEffect } from "react";
import axios from "axios";

import { useState } from "react";
import { Loading } from "@/components";
import { useRouter } from "next/navigation";
import SearchStudents from "@/components/Student/SeachStudents";
// import { useSession } from "next-auth/react";

import { Input, Button, AwsCard } from "@/components";
import { useAuthContext } from "@/hooks";

export interface CourseInfoType {
  [key: string]: string[];
}

export const courseInfo: CourseInfoType = {
  BTECH: ["CS", "CE", "ME", "EC", "EE", "AI/ML"],
  ITI: ["WELDER", "FITTER", "DIESEL MACHENIC", "ELECTRICIAN", "PLUMBER"],
  DIPLOMA: ["ME", "CE", "EE"],
  PHARMACY: ["BPHARMA", "DPHARMA"],
  NURSING: ["BSC", "BMLT", "DMLT"],
};

const Page = () => {
  const { user, error, status } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    villege: "",
    block: "",
    district: "",
    schoolName: "",
    marks10: "",
    marks12: "",
    caste: "",
    category: "",
    status: "",
    course: "",
    branch: "",
    comment: "",
    registeredBy: "",
  });
  const [initial] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    villege: "",
    block: "",
    district: "",
    schoolName: "",
    marks10: "",
    marks12: "",
    caste: "",
    category: "",
    status: "",
    course: "",
    branch: "",
    comment: "",
    registeredBy: "",
  });

  const router = useRouter();
  const registerStudent = async () => {
    try {
      // student.registeredBy = data?.user?.email || "";
      console.log("student to be registered", student);
      setLoading(true);
      let res = await axios.post(`/api/students`, student);
      console.log("response", res);
      setLoading(false);

      if (res.statusText === "OK") {
        let data = await res.data;
        console.log(data);
        if (data?.error) {
          alert(data.error);
        } else {
          alert("successfull registered");
          router.push("/student");
        }
      } else {
        let data = await res.data;
        console.log("error", data);
        alert(data?.error);
      }
    } catch (error) {
      console.error("error", error);
      alert("something went wrong");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value.toLocaleUpperCase(),
    });
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }

    setStudent({ ...student, registeredBy: user?.email });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="">
      <SearchStudents />
      <AwsCard title="Register New Student">
        <div className=" bg-slate-100">
          <div className="text-black">
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:p-3">
              <Input
                label={"Name"}
                type={"text"}
                htmlFor={"name"}
                placeholder={"Enter name"}
                value={student.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
              <Input
                label={"Father Name"}
                type={"text"}
                htmlFor={"fatherName"}
                placeholder={"Enter father name"}
                value={student.fatherName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
              <Input
                label={"Mobile"}
                type={"text"}
                htmlFor={"mobile"}
                placeholder={
                  "Enter mobile number, if you mutliple number, enter ',(comma)' separated"
                }
                value={student.mobile}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
              <Input
                label={"School Name"}
                type={"text"}
                htmlFor={"schoolName"}
                placeholder={"Enter school name"}
                value={student.schoolName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
              <Input
                label={"Class 10th Marks %"}
                type={"number"}
                htmlFor={"marks10"}
                placeholder={"Enter 10th class marks %"}
                value={student.marks10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
              <Input
                label={"Class 12th Marks %"}
                type={"number"}
                htmlFor={"marks12"}
                placeholder={"Enter 12th class marks %"}
                value={student.marks12}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />

              <Input
                label={"Villege"}
                type={"text"}
                htmlFor={"villege"}
                placeholder={"Enter villege"}
                value={student.villege}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
              <Input
                label={"Block"}
                type={"text"}
                htmlFor={"block"}
                placeholder={"Enter block"}
                value={student.block}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
              <Input
                label={"District"}
                type={"text"}
                htmlFor={"district"}
                placeholder={"Enter district"}
                value={student.district}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
              <Input
                label={"Caste"}
                type={"text"}
                htmlFor={"caste"}
                placeholder={"Enter caste"}
                value={student.caste}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
              <div className="flex flex-col gap-2 m-2">
                <label htmlFor="category" className="form-label text-black">
                  Select category:
                </label>
                <select
                  value={student.category}
                  className="p-1 border-2 rounded-sm focus: outline-none text-black"
                  onChange={(e: any) => { 
                    setStudent({ ...student, category: e.target.value });
                  }}
                >
                  <option value="OTHER">OTHER</option>
                  <option value="GEN">GEN</option>
                  <option value="OBC">OBC</option>
                  <option value="ST">ST</option>
                  <option value="SC">SC</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 m-2">
                <label htmlFor="status" className="text-black">
                  Select Status:
                </label>
                <select
                  value={student.status}
                  className="p-1 border-2 rounded-sm focus: outline-none text-black"
                  onChange={(e: any) => {
                    setStudent({ ...student, status: e.target.value });
                  }}
                >
                  <option value="OTHER">OTHER</option>
                  <option value="PENDING">PENDING</option>
                  <option value="NOTINTERESTED">NOTINTERESTED</option>
                  <option value="INTERESTED">INTERESTED</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 m-2">
                <label htmlFor="course" className="text-black">
                  Course:
                </label>
                <select
                  value={student.course}
                  className="p-1 border-2 rounded-sm focus: outline-none text-black"
                  onChange={(e: any) => {
                    setStudent({ ...student, course: e.target.value });
                  }}
                >
                  <option value="">Select Course</option>
                  {Object.keys(courseInfo).map((course, idx) => {
                    return (
                      <option value={`${course}`} key={idx}>
                        {course}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex flex-col gap-2 m-2">
                <label htmlFor="branch" className="text-black">
                  Branch:
                </label>
                <select
                  value={student.branch}
                  className="p-1 border-2 rounded-sm focus: outline-none text-black"
                  onChange={(e: any) => {
                    setStudent({ ...student, branch: e.target.value });
                  }}
                >
                  <option value="">Select Branch</option>
                  {courseInfo[student.course]?.map(
                    (branch: string, idx: number) => {
                      return (
                        <option key={idx} value={branch}>
                          {branch}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
              <Input
                label={"Comment"}
                type={"text"}
                htmlFor={"comment"}
                placeholder={"Enter comment"}
                value={student.comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="p-3 flex gap-2">
              <Button
                text={"Clear"}
                className=" text-white rounded-sm py-1 hover:bg-red-800 bg-red-600"
                onClick={() => {
                  setStudent(initial);
                }}
              />
              <Button
                text={"Register"}
                className=" text-white rounded-sm py-1 bg-green-600 focus:bg-green-800"
                onClick={(e: any) => {
                  e.preventDefault();
                  registerStudent();
                }}
              />
            </div>
          </div>
        </div>
      </AwsCard>
    </div>
  );
};

export default Page;
