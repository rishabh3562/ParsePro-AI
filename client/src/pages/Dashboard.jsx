import React, { useState } from "react";
import axios from "axios";

const FileHandler = () => {
  const [file, setFile] = useState(null);
  const [fileUri, setFileUri] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file upload
  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFileUri(response.data.fileUri);
      setLoading(false);
    } catch (err) {
      setError("Error uploading file. Please try again.");
      setLoading(false);
    }
  };

  // Handle content generation
  const handleGenerateContent = async () => {
    if (!fileUri) {
      setError("Please upload a file first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        "http://localhost:3000/generate-content",
        {
          fileUri: fileUri,
        }
      );
      setContent(response.data.content);
      setLoading(false);
    } catch (err) {
      setError("Error generating content. Please try again.");
      setLoading(false);
    }
  };

  // Handle listing files
  const handleListFiles = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get("http://localhost:3000/list-files");
      setFiles(response.data.files);
      setLoading(false);
    } catch (err) {
      setError("Error retrieving files. Please try again.");
      setLoading(false);
    }
  };

  // Handle file deletion
  const handleDeleteFile = async (fileName) => {
    try {
      setLoading(true);
      setError("");
      await axios.delete("http://localhost:3000/delete-file", {
        data: { fileName },
      });
      setFiles(files.filter((file) => file.name !== fileName));
      setLoading(false);
    } catch (err) {
      setError("Error deleting file. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="file-handler">
      <h2>File Handler</h2>

      {/* File Upload Section */}
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleFileUpload} disabled={loading || !file}>
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>

      {fileUri && (
        <div>
          <p>File uploaded successfully! File URI:</p>
          <a href={fileUri} target="_blank" rel="noopener noreferrer">
            {fileUri}
          </a>
        </div>
      )}

      {/* Content Generation Section */}
      {fileUri && (
        <div>
          <button onClick={handleGenerateContent} disabled={loading}>
            {loading ? "Generating..." : "Generate Content"}
          </button>
          {content && <p>{content}</p>}
        </div>
      )}

      {/* List Files Section */}
      <div>
        <button onClick={handleListFiles} disabled={loading}>
          {loading ? "Loading Files..." : "List Files"}
        </button>
        {files.length > 0 && (
          <ul>
            {files.map((file) => (
              <li key={file.name}>
                <a href={file.uri} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
                <button
                  onClick={() => handleDeleteFile(file.name)}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete File"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Error Handling */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FileHandler;

// import React, { useState } from "react";
// import axios from "axios";

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [response, setResponse] = useState(null);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle file upload
//   const handleFileUpload = async () => {
//     if (!file) {
//       alert("Please select a file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const uploadResponse = await axios.post(
//         "http://localhost:5000/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setResponse(uploadResponse.data); // Display the generated content
//       console.log(uploadResponse.data);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload File</button>

//       {response && (
//         <div>
//           <h3>Generated Content</h3>
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

// // import React, { useState } from "react";
// // import FileUpload from "../components/FileUpload";
// // import Tabs from "../components/Tabs";
// // import { extractDataFromFile } from "../utils/geminiApi";

// // function App() {
// //   const [invoices, setInvoices] = useState([]);
// //   const [products, setProducts] = useState([]);
// //   const [customers, setCustomers] = useState([]);

// //   const handleFileUpload = async (files) => {
// //     const file = files[0];
// //     const extractedData = await extractDataFromFile(file);

// //     if (extractedData) {
// //       setInvoices(extractedData.invoices);
// //       setProducts(extractedData.products);
// //       setCustomers(extractedData.customers);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <FileUpload onFileAccepted={handleFileUpload} />
// //       <Tabs invoices={invoices} products={products} customers={customers} />
// //     </div>
// //   );
// // }

// // export default App;
