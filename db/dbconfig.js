import mongoose from "mongoose";

let connectdb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
     useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectdb