import React from "react";

interface JsonToCsvExporterProps {
  jsonData: any[]; // Define the prop type for jsonData
  filename?: string; // Optional prop for filename
}

class JsonToCsvExporter extends React.Component<JsonToCsvExporterProps> {
  constructor(props: JsonToCsvExporterProps) {
    super(props);
    console.log("export", props);
    this.state = {
      json: this.props.jsonData || [],
      isIE: false, // Initialize isIE state
      navRef: null
    };
  }

  componentDidMount() {
    // Check if browser is Internet Explorer
    const isIE = !!navigator.msSaveBlob;
    this.setState({ isIE });
  }

  // Convert JSON to CSV format
  convertJsonToCsv = () => {
    const items = this.props.jsonData; // Use this.props.jsonData
    const replacer = (key: string, value: string) =>
      value === null ? "" : value; // Handle null values
    const header = Object.keys(items[0]);
    let csv = items.map((row) =>
      header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(",")
    );
    csv.unshift(header.join(","));
    let tmp = csv.join("\r\n");
    return tmp;
  };

  // Download CSV file
  downloadCsv = () => {
    const csv = this.convertJsonToCsv();
    const filename = this.props.filename || "export.csv";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    if (this.state.isIE) {
      // For IE
      navigator.msSaveBlob(blob, filename);
    } else {
      // For other browsers
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.isIE && (
          <button
            onClick={this.downloadCsv}
            className="bg-gray-800 text-white font-semibold rounded-sm py-1 px-2"
          >
            Export
          </button>
        )}
      </React.Fragment>
    );
  }
}

export default JsonToCsvExporter;
