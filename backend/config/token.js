// import jwt from "jsonwebtoken"

// const genToken=async (userId)=> {
//     try {
//         const token = await jwt.sign({userId},process.env.JWT_SECRET, {expiresIN: "30d"} )
//         return token

//     } catch (error) {
//         console.log(error)

//     }
// }

// export default genToken

// C:\Users\ADITI\Downloads\virtual assistant p3\backend\config\token.js
import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "30d" } // ✅ Correct property name
    );
  } catch (error) {
    console.error("JWT generation failed:", error.message);
    throw new Error("Token generation failed");
  }
};

export default genToken;
