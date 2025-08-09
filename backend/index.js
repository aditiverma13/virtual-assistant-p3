// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./config/db.js";
// import authRouter from "./routes/auth.routes.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import userRouter from "./routes/user.routes.js";
// import geminiResponse from "./gemini.js";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend URL
//     credentials: true,
//   })
// );

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);

// // Optional: test route
// app.get("/", async (req, res) => {
//   try {
//     const prompt = req.query.prompt;
//     const data = await geminiResponse(prompt);
//     res.json(data);
//   } catch (error) {
//     console.error("Error in / route:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Start server
// app.listen(port, () => {
//   connectDb();
//   console.log(`Server started on port ${port}`);
// });

import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import geminiResponse from "./gemini.js"


const app=express()
app.use(cors({
    origin:"https://virtual-assistant-9zq4.onrender.com",
    credentials:true
}))
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.listen(port,()=>{
    connectDb()
    console.log("server started")
})

  


