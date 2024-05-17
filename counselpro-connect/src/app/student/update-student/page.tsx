/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Loading, AwsCard } from "@/components";
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
import { useAuthContext, useStudentContext } from "@/hooks";
import axios from "axios";

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

interface student {
  comment: string;
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
  // chats: string;
}

export default function Page({ params, searchParams }: any) {
  const [student, setStudent] = useState<student>({
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
  const [initial, setInitial] = useState({
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
  const { getStudent }: any = useStudentContext();
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);
  // const session = useSession();
  const { status, user, error } = useAuthContext();

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
          updatedBy: user?.email,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value.toLocaleUpperCase(),
    });
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
        <AwsCard
          title="Update Student Details"
          titleProps="font-bold text-gray-600 text-xl"
        >
          {student && (
            <>
              <div className=" ">
                <div className="bg-slate-100 w-[100%] m-auto">
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
                        <label
                          htmlFor="category"
                          className="form-label text-black"
                        >
                          Select category:
                        </label>
                        <select
                          value={student.category}
                          className="p-1 border-2 rounded-sm focus: outline-none text-black"
                          onChange={(e: any) => {
                            setStudent({
                              ...student,
                              category: e.target.value,
                            });
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
                        value={chat}
                        onChange={(e: any) => {
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
                      chats.map(
                        (
                          chat: {
                            msg: string;
                            updatedAt: string;
                            createdAt: string;
                            teacher: string;
                          },
                          idx
                        ) => {
                          return (
                            <div key={idx} className="my-2">
                              <p className="text-center">
                                {`${new Date(
                                  chat.updatedAt
                                ).toLocaleDateString()} - ${new Date(
                                  chat.updatedAt
                                ).toLocaleTimeString()}`}
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
                        }
                      )}
                  </div>
                </div>
              </div>
            </>
          )}
        </AwsCard>
      </div>
    </div>
  );
}
