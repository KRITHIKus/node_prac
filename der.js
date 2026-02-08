import fs from "fs";
import multer from "multer";
// const stream = fs.createReadStream("n1.txt", {
//   highWaterMark: 16 
// });

// stream.on("data", chunk => {
   
//   console.log(`Chunk ${count}:`, chunk.toString());
  
// });

// stream.on("end", () => {
//   console.log("Finished reading file");
// });


// const readStream=fs.createReadStream("n1.txt",{highWaterMark:8})
// const writeStream=fs.createWriteStream("n2.txt")
// readStream.pipe(writeStream)

// readStream.pipe(process.stdout)

// readStream.on("end",()=>{
// console.log("\n finished reading")
// })

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    },
})

const upload=multer({storage})

export const uploadMiddleware = upload.single('file');

