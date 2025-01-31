// Bringing in express router
const { Router } = require('express');
const { generateContent } = require('../gemini');

const airouter = Router();

/**
 * API endpoint that takes user input and returns four recipes with images.
 * Frontend should send a POST request with:
 * {
 *   "ingredients": ["tomato", "cheese", "bread"],
 *   "diet": "vegetarian",
 *   "has_oven": true,
 *   "cuisine": "Italian",
 *   "time": 25,
 *   "calories": 500
 * }
 */
airouter.post('/', async (req, res) => {
    const { ingredients, diet, has_oven, cuisine, time, calories } = req.body;

    // Checking if the user sent everything we need
    if (!ingredients || !diet || !cuisine || !time || !calories) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Get four recipes with images from Gemini AI
        const recipes = await generateContent({ ingredients, diet, has_oven, cuisine, time, calories });

        // Logging response just in case we need to debug
        console.log(recipes);

        // Send the AI-generated recipes and images back to frontend
        res.json({ recipes });
    } catch (error) {
        console.error("Error generating recipes:", error);
        res.status(500).json({ error: "Failed to generate recipes" });
    }
});

// Exporting this router so the server can use it
module.exports = airouter;
