"use client"
import React from "react";
import Button from "./Button";

class JsonToCsvExporter extends React.Component {
  constructor(props) {
    super(props);
    console.log("export", props);
    this.state = {
      json: this.props.jsonData || [],
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.jsonData != nextProps.jsonData) {
      return true;
    }
    return false;
  }

  // Convert JSON to CSV format
  convertJsonToCsv = () => {
    const items = this.state.json;
    const replacer = (key, value) => (value === null ? "" : value); // Handle null values
    const header = Object.keys(items[0]);
    let csv = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    csv = csv.join("\r\n");
    return csv;
  };

  // Download CSV file
  downloadCsv = () => {
    const csv = this.convertJsonToCsv();
    const filename = this.props.filename || "export.csv";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // For IE
      navigator.msSaveBlob(blob, filename);
    } else {
      // For other browsers
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  render() {
    return <button
      onClick={this.downloadCsv}
    >
      Export
    </button>;
  }
}

export default JsonToCsvExporter;
