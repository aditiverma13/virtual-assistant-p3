import React, { useContext, useEffect, useRef, useState } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

import userGif from "../assets/assets-20250806T170405Z-1-001/assets/user.gif";
import aiGif from "../assets/assets-20250806T170405Z-1-001/assets/ai.gif";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();

  // State to track if speech recognition is listening
  const [listening, setListening] = useState(false);
  // State to show user recognized text
  const [userText, setUserText] = useState("");
  // State to show assistant's spoken text
  const [aiText, setAiText] = useState("");
  // Hamburger menu toggle state for mobile
  const [ham, setHam] = useState(false);

  // Refs to track if currently speaking or recognizing to avoid overlaps
  const isSpeakingRef = useRef(false);
  const isRecognizingRef = useRef(false);
  // Ref for the speech recognition instance
  const recognitionRef = useRef(null);
  // Speech synthesis instance
  const synth = window.speechSynthesis;

  // Ref to ensure welcome greeting is only spoken once on mount
  const greetedRef = useRef(false);

  // Logout handler clears user data and navigates to sign in page
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  // Function to start speech recognition if not currently speaking or recognizing
  const startRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start();
        console.log("Recognition requested to start");
      } catch (error) {
        if (error.name !== "InvalidStateError") {
          console.error("Start error:", error);
        }
      }
    }
  };

  // Speak given text using SpeechSynthesis with Hindi voice if available
  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (hindiVoice) utterance.voice = hindiVoice;

    isSpeakingRef.current = true;
    utterance.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;
      setTimeout(() => {
        startRecognition();
      }, 800);
    };

    synth.cancel();
    synth.speak(utterance);
  };

  /**
   * Handles the command based on the intent 'type' from Gemini response
   * Includes support for all known intents including new ones:
   * "set-reminder", "play-music", "open-calendar"
   */
  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if (type === 'google-search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
    else if (type === 'calculator-open') {
      window.open(`https://www.google.com/search?q=calculator`, '_blank');
    }
    else if (type === "instagram-open") {
      window.open(`https://www.instagram.com/`, '_blank');
    }
    else if (type === "facebook-open") {
      window.open(`https://www.facebook.com/`, '_blank');
    }
    else if (type === "weather-show") {
      window.open(`https://www.google.com/search?q=weather`, '_blank');
    }
    else if (type === 'youtube-search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }
    else if (type === 'youtube-play') {
      // Fix for YouTube play: open direct video URL if given, otherwise fallback to search
      if (userInput.startsWith("http")) {
        window.open(userInput, '_blank');
      } else {
        const query = encodeURIComponent(userInput);
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
      }
    }
    // NEW INTENT: Set Reminder (simple alert for demo)
    else if (type === "set-reminder") {
      alert(`Reminder set: ${userInput}`);
    }
    // NEW INTENT: Play Music (open YouTube Music search)
    else if (type === "play-music") {
      const query = encodeURIComponent(userInput);
      window.open(`https://music.youtube.com/search?q=${query}`, '_blank');
    }
    // NEW INTENT: Open Calendar (open Google Calendar)
    else if (type === "open-calendar") {
      window.open("https://calendar.google.com/", '_blank');
    }
  };

  useEffect(() => {
    // Setup SpeechRecognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("SpeechRecognition API not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    let isMounted = true;

    const startRecognition = () => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          console.log("Recognition requested to start");
        } catch (e) {
          if (e.name !== "InvalidStateError") {
            console.error("Recognition start error:", e);
          }
        }
      }
    };

    // Delay starting recognition by 1 second on mount
    const startTimeout = setTimeout(() => {
      if (isMounted) startRecognition();
    }, 1000);

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
      console.log("Recognition started");
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);
      console.log("Recognition ended");

      if (isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) startRecognition();
        }, 1000);
      }
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);

      isRecognizingRef.current = false;
      setListening(false);

      if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) startRecognition();
        }, 1000);
      } else {
        console.log("Recognition aborted, no restart triggered");
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("Recognition result:", transcript);

      setAiText("");
      setUserText(transcript);

      setTimeout(() => {
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);
        console.log("Recognition stopped after result");
      }, 200);

      // Call Gemini API to get structured response based on user input
      const data = await getGeminiResponse(transcript);
      handleCommand(data);
      setAiText(data.response);
      setUserText("");
    };

    // Speak welcome greeting only once on mount
    if (!greetedRef.current) {
      const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`);
      greeting.lang = 'hi-IN';
      window.speechSynthesis.speak(greeting);
      greetedRef.current = true;
    }

    // Cleanup function on unmount
    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
      console.log("Cleanup: recognition stopped");
    };
  }, []);

  return (
    <div
      className="
        w-full h-screen
        bg-gradient-to-t from-black to-[#02023d]
        flex flex-col items-center justify-center gap-4
        overflow-hidden
        px-4
        relative
      "
    >
      {/* Hamburger menu icon for mobile */}
      <CgMenuRight
        className="lg:hidden text-white absolute top-5 right-5 w-6 h-6 cursor-pointer"
        onClick={() => setHam(true)}
      />

      {/* Slide-in menu for mobile */}
      <div
        className={`
          absolute lg:hidden top-0 left-0 w-full h-full
          bg-[#00000080] backdrop-blur-md p-5 flex flex-col gap-5 items-start
          rounded-lg
          transition-transform duration-300
          ${ham ? "translate-x-0" : "translate-x-full"}
          z-50
        `}
      >
        <RxCross1
          className="text-white absolute top-5 right-5 w-6 h-6 cursor-pointer"
          onClick={() => setHam(false)}
        />
        <button
          className="min-w-[150px] h-14 text-black font-semibold bg-white rounded-md cursor-pointer text-lg"
          onClick={handleLogOut}
        >
          Log Out
        </button>
        <button
          className="min-w-[150px] h-14 text-black font-semibold bg-white rounded-md cursor-pointer text-lg px-5"
          onClick={() => navigate("/customize")}
        >
          Customize your Assistant
        </button>

        <hr className="w-full border-gray-400" />

        <h2 className="text-white font-semibold text-lg">History</h2>
        <div className="w-full max-h-[400px] overflow-y-auto flex flex-col gap-3">
          {userData.history?.length > 0 ? (
            userData.history.map((his, i) => (
              <div
                key={i}
                className="text-gray-300 text-base truncate select-text"
                title={his}
              >
                {his}
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No history available</p>
          )}
        </div>
      </div>

      {/* Desktop log out and customize buttons */}
      <button
        className="min-w-[150px] h-14 text-black font-semibold
         bg-white rounded-md cursor-pointer text-lg absolute top-5 right-5 hidden lg:block transition-shadow hover:shadow-lg"
        onClick={handleLogOut}
      >
        Log Out
      </button>
      <button
        className="min-w-[180px] h-14 text-black font-semibold
         bg-white rounded-md cursor-pointer text-lg px-5 absolute top-20 right-5 hidden lg:block transition-shadow hover:shadow-lg"
        onClick={() => navigate("/customize")}
      >
        Customize your Assistant
      </button>

      {/* Assistant image container */}
      <div className="w-[300px] h-[400px] rounded-3xl shadow-lg overflow-hidden flex justify-center items-center
       bg-black/30 backdrop-blur-sm">
        <img
          src={userData?.assistantImage}
          alt={`${userData?.assistantName} avatar`}
          className="object-cover h-full w-full select-none"
          draggable={false}
        />
      </div>

      {/* Assistant name */}
      <h1 className="text-white text-lg font-semibold drop-shadow-md">
        I'm <span className="text-blue-400">{userData?.assistantName}</span>
      </h1>

      {/* User or AI speaking gif */}
      {!aiText ? (
        <img src={userGif} alt="User speaking" className="w-48 select-none" draggable={false} />
      ) : (
        <img src={aiGif} alt="Assistant speaking" className="w-48 select-none" draggable={false} />
      )}

      {/* Display recognized or spoken text */}
      <h2
        className="
          text-white text-base font-semibold
          text-center max-w-md
          min-h-[48px]
          px-4
          drop-shadow-md
          select-text
          break-words
        "
      >
        {userText || aiText || null}
      </h2>
    </div>
  );
}

export default Home;







