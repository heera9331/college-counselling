"use client";
import Spreadsheet from "react-spreadsheet";

export default function Page() {
  const columnLabels = ["Flavour", "Food"];
  const rowLabels = ["Item 1", "Item 2"];
  const data = [
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];
  return (
    <div className="min-h-[100vh] mt-[65px] mx-2 shadow-sm shadow-slate-600">
      <h1 className="font-bold text-slate-600 text-xl mb-2 bg-gray-200 py-2 px-2 border border-b-slate-300">
        Advanced Reports
      </h1>
      <div className="mx-2">
        <Spreadsheet
          data={data}
          columnLabels={columnLabels}
          rowLabels={rowLabels}
        />
      </div>
    </div>
  );
}
