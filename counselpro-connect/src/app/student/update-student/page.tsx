/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Loading } from "@/components";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useStudentContext } from "@/hooks";
import axios from "axios";
import { useSession } from "next-auth/react";

// constants
const courseInfo = {
  BTECH: ["CS", "CE", "ME", "EC", "EE", "AI/ML"],
  ITI: ["WELDER", "FITTER", "DIESEL MACHENIC", "ELECTRICIAN", "PLUMBER"],
  DIPLOMA: ["ME", "CE", "EE"],
};

interface student {
  comment: string;
  _id: string;
  name: string;
  fatherName: string;
  mobile: string;
  villege: string;
  block: string;
  district: string;
  marks10: string;
  marks12: string;
  caste: string;
  registeredBy: string;
  schoolName: string;
  status: string;
  course: string;
  branch: string;
  category: string;
  chats: string;
  __v: string;
  createdAt: string;
  updatedAt: string;
}

export default function Page({ params, searchParams }: any) {
  const [student, setStudent] = useState<student | null>(null);
  const [initial, setInitial] = useState(null);
  const { getStudent, status }: any = useStudentContext();
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);
  // const session = useSession();

  let id = searchParams.studentId;

  const updateNow = async (e: any) => {
    e.preventDefault();
    console.log(student);
    let comfirm = confirm("Are you sure want to update details");

    if (comfirm) {
      try {
        if (student) student.comment = chat;

        setLoading(true);
        let res = await axios.put(`/api/students/${id}`, {
          student,
          // updatedBy: session?.data?.user?.email,
        });
        console.log("update res", res);

        if (res.statusText === "OK") {
          setLoading(false);
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
        console.log("error ", error);
        alert("there is some problem can't update, try again later");

        // router.push("/login");
      }
    } else {
      alert("Action revoked");
    }
  };

  const getChat = async () => {
    let res = await axios.get(`/api/students/${id}?field=chats`);
    let student = await res.data.student;
    console.log("student chat", student.chats);
    setChats(student.chats);
  };

  useEffect(() => {
    let student = getStudent(id);
    console.log("student", student);
    setStudent(student);
    setInitial(student);

    (async () => {
      await getChat();
    })();
  }, []);

  return (
    <div className="">
      <div className="">
        <h1 className="font-bold text-gray-600 bg-gray-300 text-xl mb-6  py-2 px-2 border border-b-slate-300">
          Update Student Details
        </h1>
        {student && (
          <>
            <div className="m-auto px-6">
              <div className="bg-slate-100 p-6 min-w-[420px] w-fit m-auto">
                <div className="text-black">
                  <div className="md:grid md:grid-cols-4 md:gap-3">
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
                        value={student?.course}
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
                        <option value="OTHER">SELECT OTHER</option>
                        {Object.keys(courseInfo).map((course) => (
                          <option key={course} value={course}>
                            {course}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label={"Comment"}
                      type={"text"}
                      htmlFor={"comment"}
                      placeholder={"Enter comment"}
                      value={chat}
                      onChange={(e) => {
                        setChat(e.target.value);
                      }}
                    />
                  </div>

                  {/* button controls */}
                  <div className="px-2 flex gap-2">
                    <Button
                      text={"Reset"}
                      className=" text-white rounded-sm py-1 px-2 hover:bg-red-800 bg-red-600"
                      onClick={() => {
                        setStudent(initial);
                      }}
                    />
                    <Button
                      text={"Update"}
                      className=" text-white rounded-sm py-1 px-2  bg-green-600 focus:bg-green-800"
                      onClick={(e) => {
                        updateNow(e);
                      }}
                    />
                  </div>
                </div>

                <div className="m-2 border p-2 rounded-sm">
                  <h2>Previous comments</h2>
                  {chats &&
                    chats.map((chat: {msg: string, updatedAt: string, createdAt: string, teacher: string}, idx) => {
                      return (
                        <div key={idx} className="my-2">
                          <p className="text-center">
                            {`${new Date(chat.updatedAt).toLocaleDateString()} - ${new Date(chat.updatedAt).toLocaleTimeString()}`}
                          </p>
                          <p className="text-white">
                            <span className="bg-gray-800 px-2 text-white rounded-tr-lg rounded-br-lg rounded-bl-lg">
                              {chat.teacher}
                            </span>
                          </p>
                          <p className="text-right text-white">
                            <span className="bg-gray-800 px-2 text-white rounded-tl-lg rounded-br-lg rounded-bl-lg">
                              {chat.msg}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </>
        )}

        {status === "loading" && <Loading />}
      </div>
    </div>
  );
}
