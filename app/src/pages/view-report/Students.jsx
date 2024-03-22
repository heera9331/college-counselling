import { usePagination, useSortBy, useTable } from "react-table";
// import students from "../../assets/sampleData/students";
import React, { useEffect, useState } from "react";

const columns = [
  {
    Header: "S.No",
    accessor: "sNo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Route",
    accessor: "route",
  },
  {
    Header: "Mobile",
    accessor: "mobile",
  },
  {
    Header: "Date",
    accessor: "createdAt",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const Students = ({ students }) => {
  // console.log(students);

  // let data = students;
  // console.log(data);

  // add sNo with every studen
  // formatting date

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    setPageSize,
    pageSize,
    state: { pageIndex },

    gotoPage,
  } = useTable({ columns, data: students }, useSortBy, usePagination);

  useEffect(() => {}, []);

  if (!students) {
    return;
  }
  students.map((student, idx) => {
    let tmp = student; 
    tmp.createdAt = new Date(student.createdAt).toDateString() + " " + new Date(student.createdAt).toLocaleTimeString();
    tmp.sNo = idx + 1;

    return tmp;
  });
  // {new Date(student.createdAt).toDateString() + " " + new Date(student.createdAt).toLocaleTimeString()}

  return (
    <div className="container my-4">
      <div className="container" style={{ marginTop: "2rem" }}>
        <div className="flex flex-col gap-2">
          <label htmlFor="pageSize">Entries</label>
          <input
            className="bg-slate-200 focus:outline-none p-2 rounded-sm"
            name="pageSize"
            type="number"
            value={pageSize}
            placeholder={
              "Enter the number of student that you want to  see at a time"
            }
            onChange={(e) => {
              let newSize = e.target.value ? Number(e.target.value) : 1;
              setPageSize(newSize);
            }}
          />
          out of {students.length}
        </div>

        <div>
          <button
            disabled={pageIndex === 0}
            className="bg-blue-800 text-white rounded-sm px-2 py-1"
            onClick={() => {
              gotoPage(0);
            }}
          >
            {`<<`}
          </button>
          <button
            disabled={!canPreviousPage}
            className="bg-blue-800 text-white rounded-sm px-2 py-1 m-2"
            onClick={() => {
              previousPage();
            }}
          >
            {`<`}
          </button>
          <span className="container">
            {pageIndex + 1} of {pageCount}
          </span>
          <button
            disabled={!canNextPage}
            className="bg-blue-800 text-white rounded-sm px-2 py-1 m-2"
            onClick={() => {
              nextPage();
            }}
          >
            {`>`}
          </button>
          <button
            disabled={pageIndex === pageCount - 1}
            className="bg-blue-800 text-white rounded-sm px-2 py-1 "
            onClick={() => {
              gotoPage(pageCount - 1);
            }}
          >
            {`>>`}
          </button>
        </div>
      </div>

      <div className="">
        <table
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed"
          {...getTableProps}
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup, idx) => (
              <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, idx) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={idx}
                    scope="col"
                    className="px-6 py-3"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps}>
            {page.map((row, idx) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={idx}
                  className={`${
                    idx % 2 != 0 ? "bg-gray-200" : "bg-gray-100"
                  } text-black`}
                >
                  {row.cells.map((cell, idx) => (
                    <td
                      {...cell.getCellProps()}
                      key={idx}
                      className="px-6 py-3"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
