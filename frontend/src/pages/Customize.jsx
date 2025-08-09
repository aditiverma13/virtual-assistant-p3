

import React, { useContext, useRef } from 'react';
import Card from './components/Card';

import image1 from '../assets/assets-20250806T170405Z-1-001/assets/image1.png';
import image2 from '../assets/assets-20250806T170405Z-1-001/assets/image2.jpg';
import image3 from '../assets/assets-20250806T170405Z-1-001/assets/authBg.png';
import image4 from '../assets/assets-20250806T170405Z-1-001/assets/image4.png';
import image5 from '../assets/assets-20250806T170405Z-1-001/assets/image5.png';
import image6 from '../assets/assets-20250806T170405Z-1-001/assets/image6.jpeg';
import image7 from '../assets/assets-20250806T170405Z-1-001/assets/image7.jpeg';

import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";

function Customize() {
  // Context to manage images and selected image state
  const {
    userData,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  const navigate = useNavigate();

  // Ref to hidden file input for image upload
  const inputImage = useRef();

  // Handler when user selects an image file from system
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store the raw file for backend upload
    setBackendImage(file);

    // Create a temporary URL for preview on frontend
    setFrontendImage(URL.createObjectURL(file));

    // Mark 'input' as the selected image
    setSelectedImage("input");
  };

  return (
    // Main container with gradient background and vertical padding
    <div
      className="
        w-full h-screen
        bg-gradient-to-t from-black to-[#030353]
        flex flex-col items-center justify-center
        p-5
        relative
      "
    >
      {/* Back button in top-left corner */}
      <MdKeyboardBackspace
        className="absolute top-7 left-7 text-white cursor-pointer w-6 h-6 hover:text-blue-400 transition-colors"
        onClick={() => navigate("/")}
        title="Go Back"
      />

      {/* Title with neon blue highlight */}
      <h1 className="text-white mb-10 text-3xl font-semibold text-center select-none">
        Select your <span className="text-blue-400">Assistant Image</span>
      </h1>

      {/* Image selection container with wrapping and spacing */}
      <div className="w-full max-w-[900px] flex flex-wrap justify-center gap-4">
        {/* Render all predefined assistant image cards */}
        {[image1, image2, image3, image4, image5, image6, image7].map((img, i) => (
          <Card key={i} image={img} />
        ))}

        {/* Custom image upload box */}
        <div
          className={`
            w-[70px] h-[140px] lg:w-[150px] lg:h-[250px]
            bg-[#020220] bg-opacity-40
            border-2 border-[#0000ff66]
            rounded-2xl
            overflow-hidden
            flex items-center justify-center
            cursor-pointer
            hover:shadow-2xl hover:shadow-blue-900
            hover:border-4 hover:border-white
            transition-all duration-300
            ${selectedImage === "input" ? "border-4 border-white shadow-2xl shadow-blue-900" : ""}
          `}
          onClick={() => inputImage.current.click()}
          title="Upload Custom Image"
        >
          {/* Show add icon or preview uploaded image */}
          {!frontendImage ? (
            <RiImageAddLine className="text-white w-6 h-6 lg:w-12 lg:h-12" />
          ) : (
            <img
              src={frontendImage}
              alt="Selected assistant"
              className="h-full w-full object-cover select-none"
              draggable={false}
            />
          )}
        </div>

        {/* Hidden file input for image uploads */}
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      {/* Next button shown only if an image is selected */}
      {selectedImage && (
        <button
          className="
            min-w-[150px] h-14 mt-8
            bg-white text-black font-semibold
            rounded-md
            cursor-pointer
            text-lg
            transition
            hover:bg-blue-400 hover:text-white
            shadow-md hover:shadow-lg
            select-none
          "
          onClick={() => navigate("/customize2")}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Customize;


