// Import required stuff
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Setting up Gemini AI using the API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates a recipe based on user inputs.
 * @param {Object} options - User inputs containing:
 *   @property {Array} ingredients - List of ingredients the user has
 *   @property {String} diet - Dietary preference (e.g., vegetarian, vegan)
 *   @property {Boolean} has_oven - Indicates if the user has an oven
 *   @property {Array} cuisine - Preferred cuisine types (e.g., Italian, Indian)
 *   @property {Number} time - Maximum cooking time in minutes
 *   @property {Number} calories - Maximum calorie count for the dish
 * @returns {Promise<Array>} - A promise that resolves to an array of four recipe objects with names, instructions, and images
 */
const generateContent = async ({ ingredients, diet, has_oven, cuisine, time, calories }) => {
    // Constructing the prompt
    // Constructing the prompt
    const prompt = `Suggest four different recipes based on the following details: 
    - Ingredients: ${ingredients.join(", ")}  
    - Diet: ${diet}  
    - Oven: ${has_oven ? "Available" : "Not available"}  
    - Preferred Cuisine: ${cuisine.join(", ")}  
    - Max Cooking Time: ${time} minutes  
    - Max Calories: ${calories} 
    

    - if nothing can be found, suggest a recipe with the most common ingredients, or if the preferred cuisine is not available, suggest a similar recipe from a different cuisine.
    - if ingredients are not available, suggest substitutes.
    - if the user has a specific recipe in mind, suggest a similar recipe.
    - Assume the user has basic cooking equipment and ingredients like salt, pepper, oil, etc.
    - Style the font and color of the recipe instructions to make them more readable.
    - Increase the font size of the recipe name and Make it bold.
    - If possible, Mix different cuisines in the recipes.
    - Try to include all the ingredients provided by the user.
    - Based on the time limit, suggest recipes that can be cooked quickly. if the user has more time, suggest recipes that require more time to cook and are really good and original. 

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
