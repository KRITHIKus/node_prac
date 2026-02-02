import axios from "axios";
import { useState } from "react";

function fileHandle() {
  let [mess, setmess] = useState("");
  let [err, seterr] = useState("");
  let [file, setfile] = useState(null);
  let Download = async () => {
    try {
      let down = await axios.get("http://localhost:5000/api/users/down", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([down.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "n1.txt");
      document.body.appendChild(link);
      link.click();
      setmess("downloaded file ");
    } catch (error) {
      seterr("server side error ", error);
    }
  };
  let Upload = async () => {
    try {
      if (!file) {
        seterr("Please select a file first");
        return;
      }
      const formdata = new FormData();
      formdata.append("file", file);
      await axios.post("http://localhost:5000/api/users/upload", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setmess("File uploaded successfully");
    seterr("");
    setfile(null)
    } catch (error) {
seterr("Upload failed");
    }
  };

  return (
    <>
      <h1>File download</h1>

      <p>download file:</p>
      <button onClick={Download}>Download File</button>

      <input type="file" onChange={(e) => setfile(e.target.files[0])} />
      <p>upload file:</p>
      <button onClick={Upload}>Upload File</button>

      <p style={{ color: "green" }}>{mess}</p>
      <p style={{ color: "red" }}>{err}</p>
    </>
  );
}

export default fileHandle;
