import { usePagination, useSortBy, useTable } from "react-table";
// import students from "../../assets/sampleData/students";
import React from "react";
 
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
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Date",
    accessor: "createdAt",
  },
];

const Students = ({ students }) => {
  // let data = students;
  // console.log(data);

  // add sNo with every studen
  students.map((student, idx) => {
    return (student.sNo = idx + 1);
  });

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
    filters,
    data,
    setFilter,
    state: { pageIndex },

    gotoPage,
  } = useTable({ columns, data: students }, useSortBy, usePagination);

  return (
    <div className="container my-4">
      <h2>Student Components</h2>
      <div className="container" style={{ marginTop: "2rem" }}>
        <div className="form-controls m-2">
          <label htmlFor="pageSize">Entries</label>
          <input
            className="mx-2"
            name="pageSize"
            type="number"
            value={pageSize}
            placeholder={pageSize}
            onChange={(e) => {
              let newSize = e.target.value ? Number(e.target.value) : 1;
              setPageSize(newSize);
            }}
          />
          out of <span>{students.length}</span>
        </div>

        <button
          disabled={pageIndex === 0}
          className="btn btn-primary m-2"
          onClick={() => {
            gotoPage(0);
          }}
        >
          {`<<`}
        </button>
        <button
          disabled={!canPreviousPage}
          className="btn btn-primary m-2"
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
          className="btn btn-primary m-2"
          onClick={() => {
            nextPage();
          }}
        >
          {`>`}
        </button>
        <button
          disabled={pageIndex === pageCount - 1}
          className="btn btn-primary m-2"
          onClick={() => {
            gotoPage(pageCount - 1);
          }}
        >
          {`>>`}
        </button>
      </div>

      <div className="container">
        <table className="table table-striped" {...getTableProps}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
