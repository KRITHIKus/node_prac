import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
let dataPath = path.join(__dirname, "../n1.txt");

export const readFile = async (req, res, next) => {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    req.mess=data
  req.filepath = dataPath;
    next();
   
    }

  
   catch (error) {
    if (error.code === "ENOENT") {
      return res.status(404).json({ msg: "File not found" });
    }

    console.error("Error reading file:", error);

    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message }); 
  }
};

export const writefile = async (req, res, next) => {
  try {
    const userData = req.body;
    if (typeof userData === "object" && userData !== null) {
      await fs.writeFile(dataPath, JSON.stringify(userData, null, 2), "utf-8");
    } else if (typeof userData === "string") {
      await fs.writeFile(dataPath, userData, "utf-8");
    } else {
      return res.status(400).json({ msg: "Invalid data type" });
    }
    res.status(200).json({ msg: "File written successfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};
