"use client";
import "@/app/globals.css";
import React from "react";
import axios from "axios";

import { useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import SearchStudents from "@/components/Student/SeachStudents";
import { useSession } from "next-auth/react";

import { Input, Button, AwsCard } from "@/components";

const courseInfo = {
  BTECH: ["CS", "CE", "ME", "EC", "EE", "AI/ML"],
  ITI: ["WELDER", "FITTER", "DIESEL MACHENIC", "ELECTRICIAN", "PLUMBER"],
  DIPLOMA: ["ME", "CE", "EE"],
  PHARMACY: ["BPHARMA", "DPHARMA"],
  NURSING: ["BSC", "BMLT", "DMLT"],
};

const Page = () => {
  const { status, data } = useSession();

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
      student.registeredBy = data?.user?.email || "";
      console.log("student to be registered", student);
      let res = await axios.post(`/api/students`, student);

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

  return (
    <div className="">
      <SearchStudents />
      <AwsCard title="Register New Student">
        <div className=" bg-slate-100 p-6 min-w-[512px] m-auto">
          <div className="text-black">
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3">
              <Input
                label={"Name"}
                type={"text"}
                htmlFor={"name"}
                placeholder={"Enter name"}
                value={student.name}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    name: e.target.value.toUpperCase(),
                  });
                }}
              />
              <Input
                label={"Father Name"}
                type={"text"}
                htmlFor={"fatherName"}
                placeholder={"Enter father name"}
                value={student.fatherName}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    fatherName: e.target.value.toUpperCase(),
                  });
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
                onChange={(e) => {
                  setStudent({
                    ...student,
                    mobile: e.target.value,
                  });
                }}
              />
              <Input
                label={"School Name"}
                type={"text"}
                htmlFor={"schoolName"}
                placeholder={"Enter school name"}
                value={student.schoolName}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    schoolName: e.target.value.toUpperCase(),
                  });
                }}
              />
              <Input
                label={"Class 10th Marks %"}
                type={"number"}
                htmlFor={"marks10"}
                placeholder={"Enter 10th class marks %"}
                value={student.marks10}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    marks10: e.target.value,
                  });
                }}
              />
              <Input
                label={"Class 12th Marks %"}
                type={"number"}
                htmlFor={"marks12"}
                placeholder={"Enter 12th class marks %"}
                value={student.marks12}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    marks12: e.target.value,
                  });
                }}
              />

              <Input
                label={"Villege"}
                type={"text"}
                htmlFor={"villege"}
                placeholder={"Enter villege"}
                value={student.villege}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    villege: e.target.value.toUpperCase(),
                  });
                }}
              />
              <Input
                label={"Block"}
                type={"text"}
                htmlFor={"block"}
                placeholder={"Enter block"}
                value={student.block}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    block: e.target.value.toUpperCase(),
                  });
                }}
              />
              <Input
                label={"District"}
                type={"text"}
                htmlFor={"district"}
                placeholder={"Enter district"}
                value={student.district}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    district: e.target.value.toUpperCase(),
                  });
                }}
              />
              <Input
                label={"Caste"}
                type={"text"}
                htmlFor={"caste"}
                placeholder={"Enter caste"}
                value={student.caste}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    caste: e.target.value.toUpperCase(),
                  });
                }}
              />
              <div className="flex flex-col gap-2 m-2">
                <label htmlFor="category" className="form-label text-black">
                  Select category:
                </label>
                <select
                  className="p-1 border-2 rounded-sm focus: outline-none text-black"
                  onClick={(e) => {
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
                  className="p-1 border-2 rounded-sm focus: outline-none text-black"
                  onClick={(e) => {
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
                  className="p-1 border-2 rounded-sm focus: outline-none text-black"
                  onChange={(e) => {
                    setStudent({ ...student, course: e.target.value });
                  }}
                >
                  <option value="OTHER">OTHER</option>
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
                  className="p-1 border-2 rounded-sm focus: outline-none text-black"
                  onChange={(e) => {
                    setStudent({ ...student, branch: e.target.value });
                  }}
                >
                  <option value="OTHER">OTHER</option>
                  {student.course.length != 0 &&
                    courseInfo[`${student.course}`].map((branch, idx) => {
                      return (
                        <option value={`${branch}`} key={idx}>
                          {branch}
                        </option>
                      );
                    })}
                </select>
              </div>
              <Input
                label={"Comment"}
                type={"text"}
                htmlFor={"comment"}
                placeholder={"Enter comment"}
                value={student.comment}
                onChange={(e) => {
                  setStudent({
                    ...student,
                    comment: e.target.value.toUpperCase(),
                  });
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
                onClick={(e) => {
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
