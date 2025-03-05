const axios = require("axios");

const getTaskSuggestion = async (inputText) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: `Suggest task names for: ${inputText}` }] }]
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: process.env.GOOGLE_PALM_API_KEY }
      }
    );

    console.log("Raw API Response:", response.data);

    const suggestionText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Ensure suggestions are in array format
    const suggestionsArray = suggestionText.split("\n").map(s => s.trim()).filter(s => s);

    return { suggestions: suggestionsArray };

  } catch (error) {
    console.error("Error in API:", error?.response?.data || error.message);
    return { suggestions: [] };
  }
};

module.exports = { getTaskSuggestion };
