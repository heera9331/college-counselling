import React from "react";
import DataTable from "react-data-table-component";

const Row = ({ row, idx }) => {
  return (
    <tr>
      <td>{idx}</td>
      <td>{row.name}</td>
      <td>{row.mobile}</td>
      <td>{row.registeredBy}</td>
      <td>{row.status}</td>
      <td>
        <button className="btn btn-primary">View</button>
      </td>
    </tr>
  );
};

const PartialInterested = ({ students }) => {
  return (
    <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <td>S. No.</td>
            <td>Student Name</td>
            <td>Mobile</td>
            <td>Registered By</td>
            <td>Status</td>
            <td>View Report</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-success">Interested</tr>

          <tr className="text-danger">Pending</tr>
          {students.length !== 0
            ? students.map((student, idx) => {
                return <Row row={student} idx={idx + 1} key={idx} />;
              })
            : ""}

          <tr>Partial Interested</tr>
          <tr>Not Interested</tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

const Interested = ({ students }) => {
  // console.log(students);
  return (
    <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <td>S. No.</td>
            <td>Student Name</td>
            <td>Mobile</td>
            <td>Registered By</td>
            <td>Status</td>
            <td>View Report</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-success">Interested</tr>

          <tr className="text-danger">Pending</tr>
          {students.length !== 0
            ? students.map((student, idx) => {
                return <Row row={student} idx={idx + 1} key={idx} />;
              })
            : ""}

          <tr>Partial Interested</tr>
          <tr>Not Interested</tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

const NotInterested = ({ students }) => {
  // console.log(students);
  return (
    <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <td>S. No.</td>
            <td>Student Name</td>
            <td>Mobile</td>
            <td>Registered By</td>
            <td>Status</td>
            <td>View Report</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-success">Interested</tr>

          <tr className="text-danger">Pending</tr>
          {students.length !== 0
            ? students.map((student, idx) => {
                return <Row row={student} idx={idx + 1} key={idx} />;
              })
            : ""}

          <tr>Partial Interested</tr>
          <tr>Not Interested</tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

const Pending = ({ students }) => {
  // console.log(students);
  return (
    <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <td>S. No.</td>
            <td>Student Name</td>
            <td>Mobile</td>
            <td>Registered By</td>
            <td>Status</td>
            <td>View Report</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-success">Interested</tr>

          <tr className="text-danger">Pending</tr>
          {students.length !== 0
            ? students.map((student, idx) => {
                return <Row row={student} idx={idx + 1} key={idx} />;
              })
            : ""}

          <tr>Partial Interested</tr>
          <tr>Not Interested</tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export {Pending, PartialInterested, Interested, NotInterested};
