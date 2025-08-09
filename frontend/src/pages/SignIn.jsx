
import React, { useContext, useState } from 'react';

// Import background image
import bg from '../assets/assets-20250806T170405Z-1-001/assets/authBg.png';

// Import eye icons for show/hide password
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

// Context to get server URL and user data functions
import { userDataContext } from '../context/UserContext';
import axios from "axios";

function SignIn() {
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Extract server URL, userData setter from context
  const { serverUrl, setUserData } = useContext(userDataContext);

  // React Router navigate hook
  const navigate = useNavigate();

  // Local state for form inputs and loading/error states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Function to handle form submit for sign-in
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr(""); // Clear previous errors
    setLoading(true); // Show loading state

    try {
      // Make POST request to sign-in API
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      // Update user data on success
      setUserData(result.data);
      setLoading(false);

      // Navigate to home page after successful sign-in
      navigate("/");
    } catch (error) {
      console.log(error);
      setUserData(null);
      setLoading(false);

      // Show error message from server if available
      setErr(error.response?.data?.message || "Sign in failed. Please try again.");
    }
  };

  return (
    <div
      // Full viewport container with background image, center content with flexbox
      className="w-full h-screen bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSignIn}
        // Form container with subtle glass effect:
        // - Semi-transparent black background with light blur
        // - Muted blue border with low opacity
        // - Soft rounded corners for squared but smooth shape
        // - Center content vertically with flexbox
        // - Padding and gap between elements
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
        <h1
          // Heading text white, bold, centered with subtle drop shadow
          className="text-white text-3xl font-semibold mb-8 text-center drop-shadow-sm"
        >
          Sign In to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // Input styles:
          // Full width, fixed height, padding inside
          // Rounded corners (rounded-md) for subtle squared shape
          // Glassy transparent black background with muted blue border
          // White text with blue tinted placeholder
          // Smooth focus transition for border and shadow glow
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
          // Container for password input and show/hide icons
          // Relative positioning allows icon to be positioned absolutely
          // Same subtle glass effect and border as inputs
          // Focus-within applies styles when input inside is focused
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
            // Password input inherits glass style from container
            // Transparent background to keep glass effect visible
            // White text, blue placeholders, no outline
            className="
              w-full h-full px-5 rounded-md bg-transparent
              placeholder-blue-300 text-white outline-none
            "
          />
          {!showPassword ? (
            <IoEye
              onClick={() => setShowPassword(true)}
              // Eye icon positioned top right with softer blue color
              // Cursor pointer with smooth hover color change
              className="
                absolute top-3.5 right-5 w-6 h-6
                text-blue-400 cursor-pointer
                hover:text-blue-300 transition duration-300
              "
            />
          ) : (
            <IoEyeOff
              onClick={() => setShowPassword(false)}
              // Eye-off icon styled same as Eye icon
              className="
                absolute top-3.5 right-5 w-6 h-6
                text-blue-400 cursor-pointer
                hover:text-blue-300 transition duration-300
              "
            />
          )}
        </div>

        {err && (
          // Error message styled in soft red with subtle shadow and center alignment
          <p className="text-red-500 text-lg mt-2 w-full text-center drop-shadow-sm">
            * {err}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          // Submit button with muted blue background and white text
          // Rounded corners consistent with inputs
          // Subtle shadow and smooth transitions on hover and active press
          // Disabled state with lighter background and disabled cursor
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
          {loading ? "Loading..." : "Sign In"}
        </button>

        <p
          onClick={() => navigate("/signup")}
          // Text link to navigate to Sign Up page
          // White text with blue hover effect
          // Pointer cursor to indicate clickable
          // Margin top for spacing
          className="
            text-white text-lg cursor-pointer
            hover:text-blue-400 transition duration-300 mt-4
          "
        >
          Want to create a new account? <span className="text-blue-400">Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;







