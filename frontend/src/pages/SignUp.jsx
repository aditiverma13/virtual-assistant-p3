


// import React, { useContext, useState } from 'react';
// import bg from '../assets/assets-20250806T170405Z-1-001/assets/authBg.png';
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import { userDataContext } from '../context/UserContext';
// import axios from "axios";

// function SignUp() {
//   const [showPassword, setShowPassword] = useState(false);
//   const { serverUrl, userData, setUserData } = useContext(userDataContext);
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setErr("");
//     setLoading(true);

//     try {
//       let result = await axios.post(
//         `${serverUrl}/api/auth/signup`,
//         { name, email, password },
//         { withCredentials: true }
//       );

//       setUserData(result.data);
//       setLoading(false);
//       navigate("/customize");
//     } catch (error) {
//       console.error("Sign up error:", error);
//       setUserData(null);
//       setLoading(false);

//       // Prevent crash when error.response is undefined
//       if (error.response?.data?.message) {
//         setErr(error.response.data.message);
//       } else if (error.code === "ERR_NETWORK") {
//         setErr("Network error: Unable to connect to the server");
//       } else {
//         setErr("Sign up failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <div
//       className="w-full h-[100vh] bg-cover flex justify-center items-center"
//       style={{ backgroundImage: `url(${bg})` }}
//     >
//       <form
//         className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]"
//         onSubmit={handleSignUp}
//       >
//         <h1 className="text-white text-[30px] font-semibold mb-[30px]">
//           Register to <span className="text-blue-400">Virtual Assistant</span>
//         </h1>

//         <input
//           type="text"
//           placeholder="Enter your Name"
//           className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
//           required
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
//           required
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//         />

//         <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//           {!showPassword && (
//             <IoEye
//               className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
//               onClick={() => setShowPassword(true)}
//             />
//           )}
//           {showPassword && (
//             <IoEyeOff
//               className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
//               onClick={() => setShowPassword(false)}
//             />
//           )}
//         </div>

//         {err.length > 0 && (
//           <p className="text-red-500 text-[17px]">* {err}</p>
//         )}

//         <button
//           className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]"
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Sign Up"}
//         </button>

//         <p
//           className="text-white text-[18px] cursor-pointer"
//           onClick={() => navigate("/signin")}
//         >
//           Already have an account? <span className="text-blue-400">Sign In</span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default SignUp;





import React, { useContext, useState } from 'react';
import bg from '../assets/assets-20250806T170405Z-1-001/assets/authBg.png';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      setLoading(false);
      navigate("/customize");
    } catch (error) {
      console.error("Sign up error:", error);
      setUserData(null);
      setLoading(false);
      if (error.response?.data?.message) setErr(error.response.data.message);
      else if (error.code === "ERR_NETWORK") setErr("Network error: Unable to connect to the server");
      else setErr("Sign up failed. Please try again.");
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSignUp}
        className="
          w-[90%] max-w-md h-[600px]
          bg-black/25 backdrop-blur-sm
          border border-blue-500/40
          rounded-lg
          flex flex-col items-center justify-center gap-6
          px-8 py-6
          shadow-md
        "
      >
        <h1 className="text-white text-3xl font-semibold mb-8 text-center drop-shadow-sm">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full h-14 px-5 rounded-md
            bg-black/20 border border-blue-500/40
            text-white placeholder-blue-300 text-lg
            outline-none
            transition duration-300
            focus:bg-black/30 focus:border-blue-400 focus:shadow-[0_0_8px_rgb(96,165,250,0.6)]
          "
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full h-14 px-5 rounded-md
            bg-black/20 border border-blue-500/40
            text-white placeholder-blue-300 text-lg
            outline-none
            transition duration-300
            focus:bg-black/30 focus:border-blue-400 focus:shadow-[0_0_8px_rgb(96,165,250,0.6)]
          "
        />

        <div
          className="
            relative w-full h-14 rounded-md
            bg-black/20 border border-blue-500/40
            shadow-sm
            transition duration-300
            focus-within:bg-black/30 focus-within:border-blue-400 focus-within:shadow-[0_0_8px_rgb(96,165,250,0.6)]
          "
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full h-full px-5 rounded-md bg-transparent
              placeholder-blue-300 text-white outline-none
            "
          />
          {!showPassword ? (
            <IoEye
              onClick={() => setShowPassword(true)}
              className="
                absolute top-3.5 right-5 w-6 h-6
                text-blue-400 cursor-pointer
                hover:text-blue-300 transition duration-300
              "
            />
          ) : (
            <IoEyeOff
              onClick={() => setShowPassword(false)}
              className="
                absolute top-3.5 right-5 w-6 h-6
                text-blue-400 cursor-pointer
                hover:text-blue-300 transition duration-300
              "
            />
          )}
        </div>

        {err && (
          <p className="text-red-500 text-lg mt-2 w-full text-center drop-shadow-sm">
            * {err}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            min-w-[150px] h-14 mt-8
            bg-blue-600 rounded-md
            text-white font-semibold text-lg
            shadow-md
            transition duration-300
            hover:bg-blue-700 hover:shadow-lg
            active:scale-[0.98]
            disabled:bg-blue-400 disabled:cursor-not-allowed
          "
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <p
          onClick={() => navigate("/signin")}
          className="
            text-white text-lg cursor-pointer
            hover:text-blue-400 transition duration-300 mt-4
          "
        >
          Already have an account? <span className="text-blue-400">Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;












