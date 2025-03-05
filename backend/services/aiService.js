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

const getTaskPrediction = async (inputText) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: `Give answer in one line only. How much time it will take me to complete this task in hours: ${inputText}` }] }]
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


const getTaskDescription = async (taskName) => {
  try {
    const prompt = `Generate a detailed breakdown for the task: "${taskName}".
    Please provide a list of specific steps or requirements that need to be completed.
    Format your response as a bulleted list, with each point starting with a dash (-).
    Include:
    - Required steps to complete the task
    - Key technical considerations
    - Any dependencies or prerequisites
    - Testing requirements if applicable`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: process.env.GOOGLE_PALM_API_KEY }
      }
    );

    const descriptionText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Convert the response into an array of description points
    const descriptionList = descriptionText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line.startsWith('-'))
      .map(line => line.substring(1).trim());

    if (descriptionList.length === 0) {
      throw new Error("Failed to generate description list");
    }

    return { descriptionList };

  } catch (error) {
    console.error("Error in API:", error?.response?.data || error.message);
    return { descriptionList: ["Unable to generate description. Please try again."] };
  }
};

module.exports = { 
  getTaskSuggestion,
  getTaskDescription, 
  getTaskPrediction
};
