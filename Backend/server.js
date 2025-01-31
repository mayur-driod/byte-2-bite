// SERVER.JS

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const airouter = require("./src/router/airouter");
require("./src/gemini")

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {    
    res.send("Hello from the backend!");
}); 

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;  // Use the key from your .env file

// Endpoint to generate recipe
// app.post("/generate_recipe", async (req, res) => {
//     const { ingredients, diet, has_oven, cuisine, time, calories } = req.body;

//     const prompt = `Heyy!!!, I have these ingredients: ${ingredients.join(", ")}. I follow a ${diet} diet. I ${has_oven ? "have" : "don't have"} an oven. I prefer ${cuisine} cuisine, if no dish can be prepared give me something similar. I need to prepare it in ${time < 30 ? time + " minutes focus on taste and Productivity" : time + " minutes focus on taste, originality and presentation"}. and I need the calorie count to be less than ${calories}. Suggest a very goood and suitable recipe.`;

//     try {
//         const response = await axios.post(
//             "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText",
//             { prompt },
//             { params: { key: GEMINI_API_KEY } }
//         );

//         const recipe = response.data.candidates[0].output;
//         res.json({ recipe });
//     } catch (error) {
//         console.error("Error generating recipe:", error);
//         res.status(500).json({ error: "Failed to generate recipe" });
//     }
// });

// Endpoint to generate recipe image
// app.post("/generate_image", async (req, res) => {
//     const { recipeName } = req.body;

//     const imagePrompt = `A realistic image of a delicious, beautifully presented dish named ${recipeName}`;

//     try {
//         const response = await axios.post(
//             "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateImage",
//             { prompt: imagePrompt },
//             { params: { key: GEMINI_API_KEY } }
//         );

//         const imageUrl = response.data.candidates[0].output;
//         res.json({ imageUrl });
//     } catch (error) {
//         console.error("Error generating image:", error);
//         res.status(500).json({ error: "Failed to generate image" });
//     }
// });

// Start the server
app.use('/aiask',airouter)
app.listen(5000, () => {
    console.log("Backend running on port 5000");
});