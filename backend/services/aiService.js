const axios = require("axios");
const { GoogleAuth} = require("google-auth-library");

const getTaskSuggesstion = async(inputText)=> {
    try{
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            {
                contents: [
                    {parts: [
                        {text: `Suggest task names for : ${inputText}`}
                    ]}
                ]
            },{
                headers: {"Content-Type": "application/json"},
                params:{key:process.env.GOOGLE_PALM_API_KEY}
            }
        )
        return response.data?.candidates?.[0].content?.parts?.[0]?.text || "No Suggessions"
    }catch(error){
        console.error("Error in API:",error?.response?.data || error.message);
        return "Error Fetching in Suggessions";
    }
}

module.exports = {getTaskSuggesstion};