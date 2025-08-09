
import React, { useContext, useState } from 'react';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Customize2() {
  // Destructure required context values
  const { userData, backendImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext);

  // Local state for assistant name input and loading state for async call
  const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Function to handle assistant update with backend API call
  const handleUpdateAssistant = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("assistantName", assistantName);

      // Append image file if selected, else use selected image URL string
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      // POST request to update user assistant details
      const result = await axios.post(`${serverUrl}/api/user/update`, formData, { withCredentials: true });

      setLoading(false);

      // Update userData context with updated assistant info
      setUserData(result.data);

      // Navigate to home page after successful update
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Error updating assistant:", error);
    }
  };

  return (
    <div
      className="
        w-full h-screen
        bg-gradient-to-t from-black to-[#030353]
        flex flex-col items-center justify-center
        p-5
        relative
      "
    >
      {/* Back button to return to Customize page */}
      <MdKeyboardBackspace
        className="absolute top-7 left-7 text-white cursor-pointer w-6 h-6
         hover:text-blue-400 transition-colors"
        onClick={() => navigate("/customize")}
        title="Go Back"
      />

      {/* Heading with neon blue highlight */}
      <h1 className="text-white mb-10 text-3xl font-semibold text-center select-none">
        Enter Your <span className="text-blue-400">Assistant Name</span>
      </h1>

      {/* Assistant name input box with glassy effect and neon border */}
      <input
        type="text"
        placeholder="eg. Aditi"
        className="
          w-full max-w-[600px] h-14
          bg-[#00000066] backdrop-blur-md
          border-2 border-[#3b82f6aa] focus:border-blue-400
          rounded-md
          px-5 py-3
          text-white placeholder-gray-400
          outline-none
          transition-colors duration-300
          select-text
        "
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />

      {/* Show Next button only if assistantName is not empty */}
      {assistantName && (
        <button
          disabled={loading}
          onClick={handleUpdateAssistant}
          className="
            min-w-[300px] h-14
            mt-8
            bg-white text-black font-semibold
            rounded-md
            cursor-pointer
            text-lg
            transition
            hover:bg-blue-400 hover:text-white
            shadow-md hover:shadow-lg
            select-none
            disabled:opacity-60 disabled:cursor-not-allowed
          "
          title="Create Assistant"
        >
          {loading ? "Loading..." : "Finally Create Your Assistant"}
        </button>
      )}
    </div>
  );
}

export default Customize2;
