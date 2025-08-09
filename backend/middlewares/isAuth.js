

// import jwt from "jsonwebtoken";

// const isAuth = async (req, res, next) => {
//   try {
//     //  1. Extract token from cookies
//     const token = req.cookies.token;

//     // 2. Handle missing token
//     if (!token) {
//       return res.status(401).json({ message: "Access denied. Token not found." });
//     }

//     // 3. Verify token using JWT_SECRET from env
//     const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

//     // 4. Attach user ID to request object
//     req.userID = verifyToken.userID;

//     //  5. Proceed to next middleware
//     next();
//   } catch (error) {
//     console.log("Auth Middleware Error:", error.message);

//     //  6. Send 401 for invalid or expired token
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// export default isAuth;

import jwt from "jsonwebtoken"
const isAuth=async (req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"token not found"})
        }
        const verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
        req.userId=verifyToken.userId

        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"is Auth error"})
    }
}

export default isAuth
