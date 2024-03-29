"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import api from "@/utils/api";
import axios from "axios";

const courseInfo = {
  BTECH: ["CS", "CE", "ME", "EC", "EE", "AI/ML"],
  ITI: ["WELDER", "FITTER", "DIESEL MACHENIC", "ELECTRICIAN", "PLUMBER"],
  DIPLOMA: ["ME", "CE", "EE"],
};

export default function Page() {
  const params = useSearchParams();
  const [student, setStudent] = useState(null);
  const [initial, setInitial] = useState(null);
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getStudent = async (studentId) => {
    try {
      let res = await axios.post(
        `${api}/user/searchById?studentId=${studentId}`,
        {
          token,
        }
      );
      if (res.statusText === "OK") {
        let data = await res.data;
        console.log(data);
        setStudent(data.student);
        setInitial(data.student);
      }
    } catch (error) {
      alert("can't get student, try again later");
      router.push("/login");
    }
  };

  const updateNow = async (e) => {
    e.preventDefault();
    console.log(student);
    let comfirm = confirm("Are you sure want to update details");

    if (comfirm) {
      try {
        let res = await axios.post(`${api}/user/update-student`, {
          student,
          token,
        });
        console.log(res);
        // let res = await axios.post(`${api}/admin/update-student`, {
        //   token,
        //   student: tmp,
        // });
        if (res.statusText === "OK") {
          alert("updated");
          // router.push("/home");
        } else {
          setLoading(false);
          alert("there is some problem can't update, try again later");
        }
        setLoading(false);
      } catch (error) {
        // console.log("error", error);
        setLoading(false);
        alert("there is some problem can't update, try again later");

        // router.push("/login");
      }
    } else {
      alert("Action revoked");
    }
  };

  useEffect(() => {
    let studentId = params.get("studentId");
    console.log(studentId);
    getStudent(studentId);
  }, []);
  return (
    <div className="mt-[70px] min-h-[100vh] mx-2 shadow-sm shadow-slate-600">
      <div className="">
        <h1 className="font-bold text-slate-600 text-xl mb-6 bg-gray-200 py-2 px-2 border border-b-slate-300">
          Update Student Details
        </h1>
        {student && (
          <>
            <div className="m-auto px-6">
              <div className="bg-slate-100 p-6 min-h-[420px] min-w-[512px] w-fit m-auto">
                <div className="text-black">
                  <div>
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
                      placeholder={"Enter mobile number"}
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
                      <label
                        htmlFor="category"
                        className="form-label text-black"
                      >
                        Select category:
                      </label>
                      <select
                        className="p-1 border-2 rounded-sm focus: outline-none text-black"
                        value={student.category}
                        onChange={(e) => {
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
                        value={student.status}
                        onChange={(e) => {
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
                        value={student.course}
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
                        value={student.branch}
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
                      value={student.comment || ""}
                      onChange={(e) => {
                        setStudent({
                          ...student,
                          comment: e.target.value.toUpperCase(),
                        });
                      }}
                    />
                    <div className="mx-2 mt-3 flex gap-2">
                      <Button
                        text={"Clear"}
                        className=" text-white rounded-sm py-1 px-2 hover:bg-red-800 bg-red-600"
                        type="button"
                        onClick={() => {
                          setStudent(initial);
                        }}
                      />
                      <Button
                        text={"Update"}
                        className=" text-white rounded-sm py-1 px-2  bg-green-600 focus:bg-green-800"
                        type="button"
                        onClick={(e) => {
                          updateNow(e);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="m-2">
                  <h2>Previous comments</h2>
                  {student.chats.map((chat, idx) => {
                    return (
                      <div key={idx} className="my-2">
                        <p className="text-center">
                          {`${new Date(
                            chat.updatedAt
                          ).toLocaleDateString()} - ${new Date(
                            chat.updatedAt
                          ).toLocaleTimeString()}`}
                        </p>
                        <p className="text-left">{chat.teacher}</p>
                        <p className="text-right">{chat.msg}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
