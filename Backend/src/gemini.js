// Import required stuff
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Setting up Gemini AI using the API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates a recipe based on user inputs.
 * @param {Object} options - User inputs containing:
 *   @property {Array} ingredients - Ingredients the user has
 *   @property {String} diet - Dietary preference (vegetarian, vegan, etc.)
 *   @property {Boolean} has_oven - Whether the user has an oven or not
 *   @property {String} cuisine - Preferred cuisine type (Italian, Indian, etc.)
 *   @property {Number} time - Cooking time limit in minutes
 *   @property {Number} calories - Max calorie count for the dish
 * @returns {Array} - An array of four recipe objects with names, instructions, and images
 */
const generateContent = async ({ ingredients, diet, has_oven, cuisine, time, calories }) => {
    // Constructing the prompt
    const prompt = `Suggest four different recipes based on the following details: 
    - Ingredients: ${ingredients.join(", ")}  
    - Diet: ${diet}  
    - Oven: ${has_oven ? "Available" : "Not available"}  
    - Preferred Cuisine: ${cuisine}  
    - Max Cooking Time: ${time} minutes  
    - Max Calories: ${calories}  

    Return the response in this structured JSON format:
    [
      { "name": "Recipe 1", "instructions": "Steps for Recipe 1" },
      { "name": "Recipe 2", "instructions": "Steps for Recipe 2" },
      { "name": "Recipe 3", "instructions": "Steps for Recipe 3" },
      { "name": "Recipe 4", "instructions": "Steps for Recipe 4" }
    ]`;

    // Sending the prompt to Gemini AI
    const result = await model.generateContent(prompt);
    const recipes = JSON.parse(result.response.text()); // Parse AI response into JSON

    // Generate images for each recipe
    const recipeWithImages = await Promise.all(
        recipes.map(async (recipe) => {
            const imagePrompt = `A beautifully presented, delicious-looking dish of ${recipe.name}. Focus on colors, texture, and plating.`;
            const imageResult = await model.generateContent(imagePrompt);
            return {
                name: recipe.name,
                instructions: recipe.instructions,
                image: imageResult.response.text() // Assuming it returns an image URL
            };
        })
    );

    return recipeWithImages;
};

// Exporting the function
module.exports = { generateContent };
