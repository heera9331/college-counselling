"use client";
import { useState } from "react";
import { Chart } from "react-google-charts";

export default function Page() {
  const [status, setStatus] = useState({
    total: 50,
    pending: 25,
    notinterested: 5,
    interested: 5,
    admitted: 15,
  });

  const [category, setCategory] = useState({
    total: 50,
    gen: 2,
    obc: 22,
    st: 18,
    sc: 8,
  });

  const [district, setDistrict] = useState([
    [
      "Element",
      "Total",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ["admin@gmail.com", 35, "#b87333", null],
    ["user1@gmail.com", 13, "#z17303", null],
    ["user1@gmail.com", 2, "Green", null],
  ]);

  const [cournsellor, setCournsellor] = useState([
    [
      "Element",
      "Total",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ["Sagar", 30, "#b87333", null],
    ["Chattarpur", 10, "#z17303", null],
    ["Damoh", 3, "Green", null],
    ["Tikamgarh", 2, "red", null],
    ["Lalitpur", 5, "pink", null],
  ]);

  return (
    <div className="min-h-[100vh] mt-[65px] mx-2 shadow-sm shadow-slate-600">
      <div className="">
        <h1 className="font-bold text-slate-600 text-xl mb-6 bg-gray-200 py-2 px-2 border border-b-slate-300">
          Dashboard - 2024
        </h1>
      </div>

      <div className="mx-2">
        <div className="cards gap-4 flex py-2">
          <div className="card  shadow-md ">
            <h3 className="px-2 py-1 card-heading font-semibold text-xl border bg-slate-100">
              Status wise
            </h3>
            <div className="p-4">
              <p>Total Registered Students - {status.total}</p>
              <p>Total pending student - {status.pending}</p>
              <p>Total interested student - {status.interested}</p>
              <p>Total notinterested student - {status.notinterested}</p>
              <p>Total admitted student - {status.admitted}</p>
            </div>
          </div>
          <div className="card shadow-md">
            <h2 className="border px-2 py-1 card-heading font-semibold text-xl bg-slate-100">
              Category wise
            </h2>
            <div className="shadow-sm p-4">
              <p>Total Students OBC - {status.total}</p>
              <p>Total Students GEN - {status.pending}</p>
              <p>Total Students ST - {status.interested}</p>
              <p>Total Students SC - {status.notinterested}</p>
              <p>Total Students OTHER - {status.admitted}</p>
            </div>
          </div>
          <div className="card shadow-md">
            <h2 className="border px-2 py-1 card-heading font-semibold text-xl bg-slate-100">
              District wise
            </h2>
            <div className="shadow-sm p-4">
              <p>Total Students SAGAR - {status.total}</p>
              <p>Total Students DAMOH - {status.pending}</p>
              <p>Total Students CHATTARPUR - {status.interested}</p>
              <p>Total Students TIKAMGARH - {status.notinterested}</p>
              <p>Total Students OTHER - {status.admitted}</p>
            </div>
          </div>
        </div>
        <div className="cards gap-3 flex py-2 overflow-auto">
          <div className="card shadow-md">
            <h3 className="px-2 py-1 card-heading font-semibold text-xl border bg-slate-100">
              Cournsellor wise
            </h3>
            <div className="p-4">
              <Chart
                className="z-[-10]"
                chartType="BarChart"
                width="100%"
                height="400px"
                data={district}
                options={{
                  title: "",
                  width: 720,
                  height: 400,
                  bar: { groupWidth: "95%" },
                  legend: { position: "none" },
                }}
              />
            </div>
          </div>
        </div>
        <div className="cards gap-3 flex py-2 overflow-auto">
          <div className="card shadow-md">
            <h3 className="px-2 py-1 card-heading font-semibold text-xl border bg-slate-100">
              District wise
            </h3>
            <div className="p-4">
              <Chart
                chartType="ColumnChart"
                width="800px"
                height="400px"
                data={cournsellor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
