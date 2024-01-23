/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import csvDownload from "json-to-csv-export";
import useAuthContext from "../../hooks/useAuthContext";
// component
import { Link } from "react-router-dom";
import Students from "./Students";
// ExcelToJsonConverter.js
import * as XLSX from "xlsx";
import Spreadsheet from "react-spreadsheet";
import Loading from "../../components/Loading";

const jsonTo2dArray = (users) => {
  try {
    const headings = Object.keys(users[0]);
    const twoDArrayWithHeadings = [
      headings,
      ...users.map((user) => Object.values(user)),
    ];

    return twoDArrayWithHeadings;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const convertToSpreadSheet = (jsonData) => {
  const data = [
    [{ value: "Vanilla" }, { value: "Chocolate", readOnly: true }],
    [{ value: "Strawberry" }, { value: "Cookies", readOnly: true }],
  ];
  // let data = [
  //   { name: "heera", age: 21 },
  //   { name: "rahul", age: 22 },
  // ];

  // let tmp = data.map((item) => {
  //   return [item];
  // });
  // console.log(tmp)
  return data;
};

const ExcelToJsonConverter = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming there is only one sheet in the workbook
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        setJsonData(jsonData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="container">
      <input type="file" onChange={handleFileChange} />
      {jsonData && (
        <div>
          <h2>Converted JSON Data:</h2>
        </div>
      )}

      <br />
      <div className="container my-4">
        <button className="btn btn-success">Export Data</button>
      </div>
      <div className="cotainer my-4">
        <Spreadsheet data={jsonTo2dArray(jsonData)} columnLabels={["Id"]} />
      </div>
    </div>
  );
};

const ViewReport = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  /**
   * this state is used to store number of student fetch from database
   * initially it is a empty array of
   * - It is a array of objects ==> student is a object
   */
  const [students, setStudents] = React.useState([]);

  /**
   * track the recors of student, route wise
   * - track student belongs to which area
   */

  const [routesData, setRoutesData] = React.useState({
    DAMOH: 0,
    GARHAKOTA: 0,
    BANDA: 0,
    RAHLI: 0,
    SAGAR: 0,
    CHATTARPUR: 0,
  });

  /**
   * - this state track number students by using their category
   * cate -> category
   */
  const [cate, setCate] = React.useState([["Category", "Total"]]);
  /**
   * fetching students
   */
  const getStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api}/admin/view-reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      setStudents(data.result);
      // console.log(students);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  /**
   *
   * @param {*} users: JSON
   * @returns 2d array
   * @description take json object and make a 2d array
   * with headers
   * @example json = [{name: "Heera", age: 21}, {name:"Rahul", age: 22}]
   * - to be returned -> [["name", "age"],["Heera", 21],["Rahul", 21]]
   */

  useEffect(() => {
    if (token === "null") {
      navigate("/login");
    }
  }, [token, navigate]);

  // formate date and add a field sNO

  React.useEffect(() => {
    setLoading(true);
    getStudents();
    setLoading(false);
  }, [token]);

  React.useEffect(() => {
    setLoading(true);
    let genCnt = students.filter(
      (student) => student.category === "GEN"
    ).length;
    let obcCnt = students.filter(
      (student) => student.category === "OBC"
    ).length;
    let scCnt = students.filter((student) => student.category === "SC").length;
    let stCnt = students.filter((student) => student.category === "ST").length;

    // console.log(cate);
    setCate([
      ...cate,
      ["GEN", genCnt],
      ["OBC", obcCnt],
      ["SC", scCnt],
      ["ST", stCnt],
    ]);
    // console.log(cate);
    setLoading(false);
  }, []);
  // const options = {};

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="m-4">
        <div className="container" style={{ top: "60px" }}>
          <Students students={students} />
        </div>

        <div className="container">
          <button
            className="bg-blue-800 px-2 py-1 text-white rounded-sm"
            onClick={() => {
              csvDownload({
                data: students,
                filename: "report2023",
                delimiter: ",",
              });
            }}
          >
            Export Report
          </button>
        </div>

        {/* <div className="container my-3 border mt-4">
          <ExcelToJsonConverter />
        </div> */}
      </div>
    </>
  );
};

export default ViewReport;
