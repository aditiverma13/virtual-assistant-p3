

// import axios from "axios";

// const geminiResponse = async (command, assistantName, userName) => {
//   try {
//     const apiUrl = process.env.GEMINI_API_URL;
//     if (!apiUrl) {
//       throw new Error("GEMINI_API_URL is not defined in environment variables");
//     }

//     const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
// You are not Google. You will now behave like a voice-enabled assistant.

// Your task is to understand the user's natural language input and respond with a JSON object like this:

// {
//   "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month"|"calculator-open" | "instagram-open" |"facebook-open" |"weather-show",
//   "userInput": "<original user input>" {only remove your name from userinput if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only bo search baala text jaye,
//   "response": "<a short spoken response to read out loud to the user>"
// }

// Instructions:
// - "type": determine the intent of the user.
// - "userinput": original sentence the user spoke.
// - "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

// Type meanings:
// - "general": if it's a factual or informational question. aur agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general ki category me rakho bas short answer dena
// - "google-search": if user wants to search something on Google.
// - "youtube-search": if user wants to search something on YouTube.
// - "youtube-play": if user wants to directly play a video or song.
// - "calculator-open": if user wants to open a calculator.
// - "instagram-open": if user wants to open instagram.
// - "facebook-open": if user wants to open facebook.
// - "weather-show": if user wants to know weather.
// - "get-time": if user asks for current time.
// - "get-date": if user asks for today's date.
// - "get-day": if user asks what day it is.
// - "get-month": if user asks for the current month.

// Important:
// - Use ${userName} agar koi puche tume kisne banaya.
// - Only respond with the JSON object, nothing else.

// now your userInput- ${command}
// `;

//     const result = await axios.post(apiUrl, {
//       contents: [
//         {
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     return (
//       result?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       '{"type":"general","userInput":"","response":"Sorry, I could not understand."}'
//     );
//   } catch (error) {
//     console.error("Gemini API error:", error.message);
//     return '{"type":"general","userInput":"","response":"Sorry, something went wrong."}';
//   }
// };

// export default geminiResponse;






import axios from "axios";

/**
 * Function to get a response from the Gemini API based on user command.
 * 
 * @param {string} command - The user's spoken command or input.
 * @param {string} assistantName - The name of the virtual assistant.
 * @param {string} userName - The name of the assistant's creator (user).
 * @returns {Promise<string>} - A JSON string with intent, userInput, and response fields.
 */
const geminiResponse = async (command, assistantName, userName) => {
  try {
    // Get the Gemini API URL from environment variables
    const apiUrl = process.env.GEMINI_API_URL;

    // Check if the API URL is set
    if (!apiUrl) {
      throw new Error("GEMINI_API_URL is not defined in environment variables");
    }

    // Construct the prompt for the language model
    // This prompt instructs the model on how to interpret user commands and format the response.
    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show" | "set-reminder" | "play-music" | "open-calendar",
  "userInput": "<original user input>" {only remove your name from userInput if exists} and if the user asks to search on Google or YouTube, only include the search terms in userInput,
  "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": determine the intent of the user.
- "userInput": original sentence the user spoke.
- "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

Type meanings:
- "general": if it's a factual or informational question or short answer questions.
- "google-search": if user wants to search something on Google.
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play a video or song on YouTube.
- "calculator-open": if user wants to open a calculator.
- "instagram-open": if user wants to open Instagram.
- "facebook-open": if user wants to open Facebook.
- "weather-show": if user wants to know weather.
- "get-time": if user asks for current time.
- "get-date": if user asks for today's date.
- "get-day": if user asks what day it is.
- "get-month": if user asks for the current month.

  /* Additional intent types added here */
- "set-reminder": if user wants to set a reminder or alarm.
- "play-music": if user wants to play music (not necessarily from YouTube).
- "open-calendar": if user wants to open or check their calendar.

Important:
- Use ${userName} if asked who created you.
- Only respond with the JSON object, nothing else.

now your userInput- ${command}
`;

    // Send the prompt to the Gemini API using axios
    const result = await axios.post(apiUrl, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    // Extract the text response from the API result
    // If no valid response, return a default error JSON string
    return (
      result?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      '{"type":"general","userInput":"","response":"Sorry, I could not understand."}'
    );
  } catch (error) {
    // Log any error encountered during the API call
    console.error("Gemini API error:", error.message);

    // Return a default error JSON string
    return '{"type":"general","userInput":"","response":"Sorry, something went wrong."}';
  }
};

export default geminiResponse;

